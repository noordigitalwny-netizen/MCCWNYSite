"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function loginAdmin(
  prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
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
    return { success: true };
  }

  return { success: false, error: "Invalid username or password. Please try again." };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("mcc_admin_session");
  redirect("/admin/login");
}
