"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Announcement, Project, Program } from "@/lib/supabase";
import {
  logoutAdmin,
  getAdminData,
  saveAnnouncementAction,
  saveProjectAction,
  deleteProjectAction,
  saveProgramAction,
  toggleProgramActiveAction,
  deleteProgramAction,
} from "./actions";

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<"announcement" | "projects" | "programs">("announcement");
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Announcement State
  const [announcement, setAnnouncement] = useState<Announcement>({
    message: "Welcome to MCC WNY – Muslim Community Center of Western New York",
    badge: "Announcement",
    action_url: "#prayer-times",
    action_text: "View Prayer Times",
    is_active: true,
  });
  const [loadingAnnouncement, setLoadingAnnouncement] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Project>({
    title: "",
    category: "Community",
    description: "",
    status: "Active",
    goal_amount: 10000,
    raised_amount: 0,
    completed_date: "",
    impact_note: "",
  });
  const [loadingProject, setLoadingProject] = useState(false);

  // Programs State
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programForm, setProgramForm] = useState<Program>({
    title: "",
    category: "General",
    description: "",
    schedule: "",
    is_active: true,
  });
  const [loadingProgram, setLoadingProgram] = useState(false);

  // Show Toast Helper
  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load Data via Server Actions
  const refreshData = useCallback(async () => {
    try {
      const data = await getAdminData();
      if (data.announcement) {
        setAnnouncement(data.announcement);
      }
      setProjects(data.projects);
      setPrograms(data.programs);
    } catch (err) {
      console.warn("Could not fetch admin data via Server Action:", err);
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    async function init() {
      try {
        const data = await getAdminData();
        if (isSubscribed) {
          if (data.announcement) setAnnouncement(data.announcement);
          setProjects(data.projects);
          setPrograms(data.programs);
        }
      } catch (err) {
        console.warn("Could not fetch initial admin data:", err);
      }
    }

    init();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // 1. Save Announcement
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAnnouncement(true);

    const res = await saveAnnouncementAction(announcement);
    setLoadingAnnouncement(false);

    if (res.success) {
      showToast("success", res.message || "Announcement updated successfully!");
      refreshData();
    } else {
      showToast("error", res.error || "Failed to update announcement.");
    }
  };

  // 2. Save Project (Add / Edit)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProject(true);

    const res = await saveProjectAction({
      id: editingProject?.id,
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      status: projectForm.status,
      goal_amount: Number(projectForm.goal_amount),
      raised_amount: Number(projectForm.raised_amount),
      completed_date: projectForm.completed_date,
      impact_note: projectForm.impact_note,
    });

    setLoadingProject(false);

    if (res.success) {
      showToast("success", res.message || "Project saved successfully!");
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
      refreshData();
    } else {
      showToast("error", res.error || "Failed to save project.");
    }
  };

  // Edit Project Click
  const handleEditProjectClick = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      id: proj.id,
      title: proj.title,
      category: proj.category || "Community",
      description: proj.description,
      status: proj.status,
      goal_amount: proj.goal_amount,
      raised_amount: proj.raised_amount,
      completed_date: proj.completed_date || "",
      impact_note: proj.impact_note || "",
    });
  };

  // Delete Project
  const handleDeleteProject = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this project?")) return;

    const res = await deleteProjectAction(id);
    if (res.success) {
      showToast("success", res.message || "Project deleted.");
      refreshData();
    } else {
      showToast("error", res.error || "Failed to delete project.");
    }
  };

  // 3. Save Program (Add / Edit)
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProgram(true);

    const res = await saveProgramAction({
      id: editingProgram?.id,
      title: programForm.title,
      category: programForm.category,
      description: programForm.description,
      schedule: programForm.schedule,
      is_active: programForm.is_active,
    });

    setLoadingProgram(false);

    if (res.success) {
      showToast("success", res.message || "Program saved successfully!");
      setEditingProgram(null);
      setProgramForm({
        title: "",
        category: "General",
        description: "",
        schedule: "",
        is_active: true,
      });
      refreshData();
    } else {
      showToast("error", res.error || "Failed to save program.");
    }
  };

  // Edit Program Click
  const handleEditProgramClick = (prog: Program) => {
    setEditingProgram(prog);
    setProgramForm({
      id: prog.id,
      title: prog.title,
      category: prog.category || "General",
      description: prog.description,
      schedule: prog.schedule || "",
      is_active: prog.is_active,
    });
  };

  // Toggle Program Active Status
  const handleToggleProgramActive = async (prog: Program) => {
    if (!prog.id) return;
    const res = await toggleProgramActiveAction(prog.id, prog.is_active);
    if (res.success) {
      showToast("success", res.message || "Status updated.");
      refreshData();
    } else {
      showToast("error", res.error || "Failed to toggle program status.");
    }
  };

  // Delete Program
  const handleDeleteProgram = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this community program?")) return;

    const res = await deleteProgramAction(id);
    if (res.success) {
      showToast("success", res.message || "Program deleted.");
      refreshData();
    } else {
      showToast("error", res.error || "Failed to delete program.");
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-bold flex items-center gap-3 ${
              toastMessage.type === "success"
                ? "bg-emerald-900 text-amber-200 border-amber-400"
                : "bg-red-900 text-white border-red-400"
            }`}
          >
            <span>{toastMessage.type === "success" ? "✨" : "⚠️"}</span>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Admin Dashboard Banner Header */}
      <section className="bg-gradient-to-b from-[#047857] via-emerald-800 to-emerald-950 text-white py-10 px-4 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider mb-2">
              Service Role Client Active
            </span>
            <h1 className="text-3xl font-extrabold text-white">
              MCC WNY <span className="text-amber-300">Admin Management Portal</span>
            </h1>
            <p className="text-xs text-emerald-100/90 mt-1">
              Manage website announcements, fundraising campaigns, and community programs with RLS bypass privileges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-900/80 border border-amber-400/30 px-4 py-2 rounded-xl text-xs text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Supabase Service Role</span>
            </div>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-amber-400 text-emerald-950 rounded-xl hover:bg-amber-300 transition-colors shadow-md border border-amber-300"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Tab Navigation Menu */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab("announcement")}
            className={`px-5 py-3 text-sm font-bold rounded-t-xl transition-all ${
              activeTab === "announcement"
                ? "bg-[#047857] text-white border-t-2 border-amber-400 shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            📢 1. Top Banner Announcement
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-3 text-sm font-bold rounded-t-xl transition-all ${
              activeTab === "projects"
                ? "bg-[#047857] text-white border-t-2 border-amber-400 shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            🏗️ 2. Community Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("programs")}
            className={`px-5 py-3 text-sm font-bold rounded-t-xl transition-all ${
              activeTab === "programs"
                ? "bg-[#047857] text-white border-t-2 border-amber-400 shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            🤝 3. Community Programs & Drives ({programs.length})
          </button>
        </div>

        {/* TAB 1: TOP BANNER ANNOUNCEMENT SECTION */}
        {activeTab === "announcement" && (
          <div className="pt-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
              <div className="bg-emerald-950 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between">
                <h2 className="text-base font-bold text-amber-300">
                  Top Banner Announcement Manager
                </h2>
                <span className="text-xs text-emerald-200/80">Table: announcements</span>
              </div>

              {/* Status Display Card */}
              <div className="px-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      Current Live Banner Message
                    </div>
                    <div className="text-sm font-bold text-slate-900">&quot;{announcement.message}&quot;</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        announcement.is_active
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-red-100 text-red-900 border border-red-300"
                      }`}
                    >
                      {announcement.is_active ? "● ACTIVE & DISPLAYED" : "○ INACTIVE / HIDDEN"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSaveAnnouncement} className="p-6 pt-0 space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Banner Message
                  </label>
                  <input
                    type="text"
                    required
                    value={announcement.message}
                    onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                    placeholder="Enter announcement text..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={announcement.badge || ""}
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
                      value={announcement.action_text || ""}
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
                      value={announcement.action_url || ""}
                      onChange={(e) => setAnnouncement({ ...announcement, action_url: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                      placeholder="#prayer-times or /donate"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={announcement.is_active}
                      onChange={(e) => setAnnouncement({ ...announcement, is_active: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#047857]"></div>
                    <span className="ml-3 text-xs font-bold text-slate-700">Display Top Banner on Site</span>
                  </label>

                  <button
                    type="submit"
                    disabled={loadingAnnouncement}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-[#047857] text-white hover:bg-emerald-800 transition-all shadow-md border border-amber-400/30 disabled:opacity-50"
                  >
                    {loadingAnnouncement ? "Saving..." : "Save Announcement"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: COMMUNITY PROJECTS MANAGER */}
        {activeTab === "projects" && (
          <div className="pt-6 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
              {/* Form header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">
                  {editingProject ? `Editing Project: "${editingProject.title}"` : "Add New Community Project"}
                </h2>
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
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              {/* Project Add/Edit Form */}
              <form onSubmit={handleSaveProject} className="space-y-4">
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                      placeholder="e.g. Masjid Expansion & Sister's Lounge"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Category
                    </label>
                    <input
                      type="text"
                      value={projectForm.category || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                      placeholder="Expansion, Youth, Renovation..."
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                    placeholder="Project details..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Status
                    </label>
                    <select
                      value={projectForm.status}
                      onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
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
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                        placeholder="Spring 2026"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                      placeholder="Impact details..."
                    />
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loadingProject}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-[#047857] text-white hover:bg-emerald-800 transition-all shadow-md border border-amber-400/30 disabled:opacity-50"
                  >
                    {loadingProject ? "Processing..." : editingProject ? "Update Project" : "Add New Project"}
                  </button>
                </div>
              </form>

              {/* Projects List */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Current Projects List ({projects.length})</span>
                  <button type="button" onClick={refreshData} className="text-xs font-semibold text-[#047857] hover:underline">
                    Refresh List
                  </button>
                </h3>

                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {projects.map((p) => {
                    const percent = p.goal_amount > 0 ? Math.min(100, Math.round((p.raised_amount / p.goal_amount) * 100)) : 0;

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
                            <span className="text-sm font-bold text-slate-900">{p.title}</span>
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
                            onClick={() => handleEditProjectClick(p)}
                            className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors border border-slate-300"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(p.id)}
                            className="px-3.5 py-1.5 text-xs font-bold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors border border-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMUNITY PROGRAMS & DRIVES MANAGER */}
        {activeTab === "programs" && (
          <div className="pt-6 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
              {/* Program Form Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">
                  {editingProgram ? `Editing Program: "${editingProgram.title}"` : "Add New Community Program / Drive"}
                </h2>
                {editingProgram && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProgram(null);
                      setProgramForm({
                        title: "",
                        category: "General",
                        description: "",
                        schedule: "",
                        is_active: true,
                      });
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              {/* Program Add/Edit Form */}
              <form onSubmit={handleSaveProgram} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Program / Initiative Title
                    </label>
                    <input
                      type="text"
                      required
                      value={programForm.title}
                      onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                      placeholder="e.g. HEARTs Clothing Donation Box or Blood Drive"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Category
                    </label>
                    <input
                      type="text"
                      value={programForm.category || ""}
                      onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                      placeholder="Social Welfare, Youth, Interfaith..."
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Program Description
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={programForm.description}
                    onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                    placeholder="Describe program goals, rules, or instructions..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Schedule / Timing Info
                    </label>
                    <input
                      type="text"
                      value={programForm.schedule || ""}
                      onChange={(e) => setProgramForm({ ...programForm, schedule: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                      placeholder="e.g. Available 24/7 or Sundays 10:00 AM"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={programForm.is_active}
                        onChange={(e) => setProgramForm({ ...programForm, is_active: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#047857]"></div>
                      <span className="ml-3 text-xs font-bold text-slate-700">Active Program</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loadingProgram}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-[#047857] text-white hover:bg-emerald-800 transition-all shadow-md border border-amber-400/30 disabled:opacity-50"
                  >
                    {loadingProgram ? "Processing..." : editingProgram ? "Update Program" : "Add Program"}
                  </button>
                </div>
              </form>

              {/* Programs List */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Community Programs ({programs.length})</span>
                  <button type="button" onClick={refreshData} className="text-xs font-semibold text-[#047857] hover:underline">
                    Refresh List
                  </button>
                </h3>

                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {programs.map((prog) => (
                    <div key={prog.id} className="p-4 bg-white hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prog.is_active
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : "bg-slate-100 text-slate-600 border border-slate-300"
                            }`}
                          >
                            {prog.is_active ? "Active" : "Inactive"}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{prog.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{prog.description}</p>
                        {prog.schedule && (
                          <div className="text-[11px] text-slate-600 font-medium">
                            🕒 {prog.schedule}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleProgramActive(prog)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors border ${
                            prog.is_active
                              ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                              : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                          }`}
                        >
                          {prog.is_active ? "Disable" : "Enable"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditProgramClick(prog)}
                          className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors border border-slate-300"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProgram(prog.id)}
                          className="px-3 py-1.5 text-xs font-bold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors border border-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
