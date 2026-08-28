"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface AnnouncementRow {
  id?: string;
  message: string;
  badge: string;
  action_url: string;
  action_text: string;
  is_active: boolean;
}

interface ProjectRow {
  id?: string;
  title: string;
  category: string;
  description: string;
  status: "Active" | "Completed";
  goal_amount: number;
  raised_amount: number;
  completed_date?: string;
  impact_note?: string;
}

export default function AdminPortalPage() {
  // Announcement state
  const [announcement, setAnnouncement] = useState<AnnouncementRow>({
    message: "Welcome to MCC WNY – Muslim Community Center of Western New York",
    badge: "Announcement",
    action_url: "#prayer-times",
    action_text: "View Prayer Times",
    is_active: true,
  });
  const [announcementMsg, setAnnouncementMsg] = useState("");
  const [loadingAnnouncement, setLoadingAnnouncement] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectRow>({
    title: "",
    category: "Community",
    description: "",
    status: "Active",
    goal_amount: 10000,
    raised_amount: 0,
    completed_date: "",
    impact_note: "",
  });
  const [projectMsg, setProjectMsg] = useState("");
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Fetch Announcement & Projects
  const fetchAllData = async () => {
    try {
      const { data: annData } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (annData && annData.length > 0) {
        setAnnouncement(annData[0]);
      }

      const { data: projData } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projData) {
        setProjects(projData);
      }
    } catch (err: unknown) {
      console.warn("Could not fetch data from Supabase:", err);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    async function loadInitialData() {
      try {
        const { data: annData } = await supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1);

        if (isSubscribed && annData && annData.length > 0) {
          setAnnouncement(annData[0]);
        }

        const { data: projData } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (isSubscribed && projData) {
          setProjects(projData);
        }
      } catch (err: unknown) {
        console.warn("Could not fetch data from Supabase:", err);
      }
    }

    loadInitialData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Handle Save / Update Announcement
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAnnouncement(true);
    setAnnouncementMsg("");

    try {
      if (announcement.id) {
        const { error } = await supabase
          .from("announcements")
          .update({
            message: announcement.message,
            badge: announcement.badge,
            action_url: announcement.action_url,
            action_text: announcement.action_text,
            is_active: announcement.is_active,
          })
          .eq("id", announcement.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("announcements")
          .insert([announcement])
          .select();

        if (error) throw error;
        if (data && data.length > 0) {
          setAnnouncement(data[0]);
        }
      }
      setAnnouncementMsg("✓ Announcement saved successfully!");
    } catch (err: unknown) {
      const errorObj = err as Error;
      setAnnouncementMsg(`Error: ${errorObj.message || "Failed to save announcement"}`);
    } finally {
      setLoadingAnnouncement(false);
    }
  };

  // Handle Save / Update Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProjects(true);
    setProjectMsg("");

    try {
      if (editingProject && editingProject.id) {
        const { error } = await supabase
          .from("projects")
          .update({
            title: projectForm.title,
            category: projectForm.category,
            description: projectForm.description,
            status: projectForm.status,
            goal_amount: Number(projectForm.goal_amount),
            raised_amount: Number(projectForm.raised_amount),
            completed_date: projectForm.completed_date || null,
            impact_note: projectForm.impact_note || null,
          })
          .eq("id", editingProject.id);

        if (error) throw error;
        setProjectMsg("✓ Project updated successfully!");
      } else {
        const { error } = await supabase.from("projects").insert([
          {
            title: projectForm.title,
            category: projectForm.category,
            description: projectForm.description,
            status: projectForm.status,
            goal_amount: Number(projectForm.goal_amount),
            raised_amount: Number(projectForm.raised_amount),
            completed_date: projectForm.completed_date || null,
            impact_note: projectForm.impact_note || null,
          },
        ]);

        if (error) throw error;
        setProjectMsg("✓ New project created successfully!");
      }

      // Reset form
      setEditingProject(null);
      setProjectForm({
        title: "",
        category: "Community",
        description: "",
        status: "Active",
        goal_amount: 10000,
        raised_amount: 0,
        completed_date: "",
        impact_note: "",
      });

      fetchAllData();
    } catch (err: unknown) {
      const errorObj = err as Error;
      setProjectMsg(`Error: ${errorObj.message || "Failed to save project"}`);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Handle Edit Project
  const handleEditClick = (proj: ProjectRow) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      category: proj.category || "Community",
      description: proj.description,
      status: proj.status,
      goal_amount: proj.goal_amount,
      raised_amount: proj.raised_amount,
      completed_date: proj.completed_date || "",
      impact_note: proj.impact_note || "",
    });
    setProjectMsg("");
  };

  // Handle Delete Project
  const handleDeleteClick = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      setProjectMsg("✓ Project deleted successfully.");
      fetchAllData();
    } catch (err: unknown) {
      const errorObj = err as Error;
      setProjectMsg(`Error: ${errorObj.message || "Failed to delete project"}`);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#047857] via-emerald-800 to-emerald-950 text-white py-10 px-4 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider mb-2">
              Management Portal
            </span>
            <h1 className="text-3xl font-extrabold text-white">
              MCC WNY <span className="text-amber-300">Admin Dashboard</span>
            </h1>
            <p className="text-xs text-emerald-100/90 mt-1">
              Manage live website announcements, active fundraising campaigns, and completed projects.
            </p>
          </div>
          <div className="bg-emerald-900/80 border border-amber-400/30 px-4 py-2 rounded-xl text-xs text-amber-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Connected to Supabase Database</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* FORM 1: Top Banner Announcement Form */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-emerald-950 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>📢</span> Top Banner Announcement Manager
            </h2>
            <span className="text-xs text-emerald-200/80">Live Supabase Table: announcements</span>
          </div>

          <form onSubmit={handleSaveAnnouncement} className="p-6 space-y-5">
            {announcementMsg && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold ${
                  announcementMsg.startsWith("✓")
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : "bg-red-100 text-red-900 border border-red-300"
                }`}
              >
                {announcementMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Announcement Message
              </label>
              <input
                type="text"
                required
                value={announcement.message}
                onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                placeholder="e.g. Welcome to MCC WNY – Muslim Community Center of Western New York"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={announcement.badge}
                  onChange={(e) => setAnnouncement({ ...announcement, badge: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  placeholder="Announcement"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Action Link Text
                </label>
                <input
                  type="text"
                  value={announcement.action_text}
                  onChange={(e) => setAnnouncement({ ...announcement, action_text: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  placeholder="View Prayer Times"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Action Link URL
                </label>
                <input
                  type="text"
                  value={announcement.action_url}
                  onChange={(e) => setAnnouncement({ ...announcement, action_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  placeholder="#prayer-times or /donate"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcement.is_active}
                  onChange={(e) => setAnnouncement({ ...announcement, is_active: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#047857]"></div>
                <span className="ml-3 text-xs font-bold text-slate-700">Display Banner on Website</span>
              </label>

              <button
                type="submit"
                disabled={loadingAnnouncement}
                className="ml-auto px-6 py-2.5 rounded-xl text-xs font-extrabold bg-[#047857] text-white hover:bg-emerald-800 transition-all shadow-md disabled:opacity-50"
              >
                {loadingAnnouncement ? "Saving..." : "Save Announcement"}
              </button>
            </div>
          </form>
        </section>

        {/* FORM 2: Project Manager (Add / Edit / Delete Projects) */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-emerald-950 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>🏗️</span> Project Manager
            </h2>
            <span className="text-xs text-emerald-200/80">Live Supabase Table: projects</span>
          </div>

          <div className="p-6 space-y-8">
            {/* Project Add/Edit Form */}
            <form onSubmit={handleSaveProject} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  {editingProject ? `Editing Project: "${editingProject.title}"` : "Create New Community Project"}
                </h3>
                {editingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({
                        title: "",
                        category: "Community",
                        description: "",
                        status: "Active",
                        goal_amount: 10000,
                        raised_amount: 0,
                        completed_date: "",
                        impact_note: "",
                      });
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              {projectMsg && (
                <div
                  className={`p-3 rounded-lg text-xs font-semibold ${
                    projectMsg.startsWith("✓")
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-red-100 text-red-900 border border-red-300"
                  }`}
                >
                  {projectMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                    placeholder="e.g. Youth Center & Gymnasium Upgrade"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Category
                  </label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                    placeholder="Expansion, Youth, Renovation..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Project Description
                </label>
                <textarea
                  required
                  rows={2}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  placeholder="Describe the initiative and its impact on the community..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, status: e.target.value as "Active" | "Completed" })
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  >
                    <option value="Active">Active Campaign</option>
                    <option value="Completed">Completed Project</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Goal Amount ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={projectForm.goal_amount}
                    onChange={(e) => setProjectForm({ ...projectForm, goal_amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Raised Amount ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={projectForm.raised_amount}
                    onChange={(e) => setProjectForm({ ...projectForm, raised_amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>

                {projectForm.status === "Completed" && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Completed Date
                    </label>
                    <input
                      type="text"
                      value={projectForm.completed_date || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, completed_date: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                      placeholder="e.g. Spring 2026"
                    />
                  </div>
                )}
              </div>

              {projectForm.status === "Completed" && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Impact Note (Gratitude Gallery)
                  </label>
                  <input
                    type="text"
                    value={projectForm.impact_note || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, impact_note: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                    placeholder="e.g. Serves 500+ daily worshippers with crystal clear sermon sound quality."
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loadingProjects}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-[#047857] text-white hover:bg-emerald-800 transition-all shadow-md disabled:opacity-50"
                >
                  {loadingProjects ? "Processing..." : editingProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>

            {/* Existing Projects Table / List */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Existing Community Projects ({projects.length})</span>
                <button
                  type="button"
                  onClick={fetchAllData}
                  className="text-xs font-normal text-[#047857] hover:underline"
                >
                  Refresh List
                </button>
              </h3>

              {projects.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-lg text-center">
                  No projects found in database yet. Add one above or execute supabase_schema.sql.
                </p>
              ) : (
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {projects.map((p) => {
                    const percent =
                      p.goal_amount > 0 ? Math.min(100, Math.round((p.raised_amount / p.goal_amount) * 100)) : 0;

                    return (
                      <div key={p.id} className="p-4 bg-white hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.status === "Active"
                                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                  : "bg-amber-100 text-amber-900 border border-amber-300"
                              }`}
                            >
                              {p.status}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{p.title}</span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{p.description}</p>
                          <div className="text-[11px] text-slate-600 space-x-3">
                            <span>
                              Raised: <strong>${p.raised_amount.toLocaleString()}</strong> / ${p.goal_amount.toLocaleString()}
                            </span>
                            <span>•</span>
                            <span>{percent}% Funded</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditClick(p)}
                            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(p.id)}
                            className="px-3 py-1.5 text-xs font-semibold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
