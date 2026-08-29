"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient, Announcement, Project, Program } from "@/lib/supabase";

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export type LoginResult = ActionResult;

// ==========================================
// AUTHENTICATION SERVER ACTIONS
// ==========================================
export async function loginAdmin(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === "mccwnyadmin" && password === "94Meridian@") {
    const cookieStore = await cookies();
    cookieStore.set("mcc_admin_session", "authenticated_mcc_admin_secret_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return { success: true, message: "Logged in successfully." };
  }

  return { success: false, error: "Invalid username or password. Please try again." };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("mcc_admin_session");
  redirect("/admin/login");
}

// ==========================================
// SERVICE ROLE SERVER ACTIONS (RLS Bypassing)
// ==========================================

export async function getAdminData() {
  const supabaseAdmin = createAdminClient();

  const [annRes, projRes, progRes] = await Promise.all([
    supabaseAdmin.from("announcements").select("*").order("created_at", { ascending: false }).limit(1),
    supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("programs").select("*").order("created_at", { ascending: false }),
  ]);

  return {
    announcement: annRes.data && annRes.data.length > 0 ? (annRes.data[0] as Announcement) : null,
    projects: (projRes.data || []) as Project[],
    programs: (progRes.data || []) as Program[],
  };
}

// 1. Announcements Server Action
export async function saveAnnouncementAction(data: {
  id?: string;
  message: string;
  badge?: string;
  action_url?: string;
  action_text?: string;
  is_active: boolean;
}): Promise<ActionResult> {
  try {
    const supabaseAdmin = createAdminClient();

    if (data.id) {
      const { error } = await supabaseAdmin
        .from("announcements")
        .update({
          message: data.message,
          badge: data.badge || "Announcement",
          action_url: data.action_url || "#prayer-times",
          action_text: data.action_text || "View Prayer Times",
          is_active: data.is_active,
        })
        .eq("id", data.id);

      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin.from("announcements").insert([{
        message: data.message,
        badge: data.badge || "Announcement",
        action_url: data.action_url || "#prayer-times",
        action_text: data.action_text || "View Prayer Times",
        is_active: data.is_active,
      }]);
      if (error) throw error;
    }

    return { success: true, message: "✓ Top Banner Announcement updated successfully!" };
  } catch (err: unknown) {
    const errorObj = err as Error;
    return { success: false, error: errorObj.message || "Failed to update announcement." };
  }
}

// 2. Projects Server Actions
export async function saveProjectAction(data: {
  id?: string;
  title: string;
  category?: string;
  description: string;
  status: string;
  goal_amount: number;
  raised_amount: number;
  completed_date?: string;
  impact_note?: string;
}): Promise<ActionResult> {
  try {
    const supabaseAdmin = createAdminClient();

    if (data.id) {
      const { error } = await supabaseAdmin
        .from("projects")
        .update({
          title: data.title,
          category: data.category || "Community",
          description: data.description,
          status: data.status,
          goal_amount: Number(data.goal_amount),
          raised_amount: Number(data.raised_amount),
          completed_date: data.completed_date || null,
          impact_note: data.impact_note || null,
        })
        .eq("id", data.id);

      if (error) throw error;
      return { success: true, message: "✓ Project updated successfully!" };
    } else {
      const { error } = await supabaseAdmin.from("projects").insert([{
        title: data.title,
        category: data.category || "Community",
        description: data.description,
        status: data.status,
        goal_amount: Number(data.goal_amount),
        raised_amount: Number(data.raised_amount),
        completed_date: data.completed_date || null,
        impact_note: data.impact_note || null,
      }]);

      if (error) throw error;
      return { success: true, message: "✓ New community project created successfully!" };
    }
  } catch (err: unknown) {
    const errorObj = err as Error;
    return { success: false, error: errorObj.message || "Failed to save project." };
  }
}

export async function deleteProjectAction(id: string): Promise<ActionResult> {
  try {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
    if (error) throw error;
    return { success: true, message: "✓ Project deleted successfully." };
  } catch (err: unknown) {
    const errorObj = err as Error;
    return { success: false, error: errorObj.message || "Failed to delete project." };
  }
}

// 3. Programs & Drives Server Actions
export async function saveProgramAction(data: {
  id?: string;
  title: string;
  category?: string;
  description: string;
  schedule?: string;
  is_active: boolean;
}): Promise<ActionResult> {
  try {
    const supabaseAdmin = createAdminClient();

    if (data.id) {
      const { error } = await supabaseAdmin
        .from("programs")
        .update({
          title: data.title,
          category: data.category || "General",
          description: data.description,
          schedule: data.schedule || null,
          is_active: data.is_active,
        })
        .eq("id", data.id);

      if (error) throw error;
      return { success: true, message: "✓ Community program updated successfully!" };
    } else {
      const { error } = await supabaseAdmin.from("programs").insert([{
        title: data.title,
        category: data.category || "General",
        description: data.description,
        schedule: data.schedule || null,
        is_active: data.is_active,
      }]);

      if (error) throw error;
      return { success: true, message: "✓ New community program added successfully!" };
    }
  } catch (err: unknown) {
    const errorObj = err as Error;
    return { success: false, error: errorObj.message || "Failed to save program." };
  }
}

export async function toggleProgramActiveAction(id: string, currentActive: boolean): Promise<ActionResult> {
  try {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
      .from("programs")
      .update({ is_active: !currentActive })
      .eq("id", id);

    if (error) throw error;
    return { success: true, message: `✓ Program status updated to ${!currentActive ? "Active" : "Inactive"}.` };
  } catch (err: unknown) {
    const errorObj = err as Error;
    return { success: false, error: errorObj.message || "Failed to toggle program status." };
  }
}

export async function deleteProgramAction(id: string): Promise<ActionResult> {
  try {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from("programs").delete().eq("id", id);
    if (error) throw error;
    return { success: true, message: "✓ Community program deleted successfully." };
  } catch (err: unknown) {
    const errorObj = err as Error;
    return { success: false, error: errorObj.message || "Failed to delete program." };
  }
}
