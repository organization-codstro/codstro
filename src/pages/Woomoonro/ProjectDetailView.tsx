import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  Clock,
  ExternalLink,
  Github,
  Play,
  Bookmark,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  CreditCard as Edit3,
  Trash2,
  Link,
  FileText,
  Users,
  Target,
} from "lucide-react";
import {
  Project,
  UserProject,
  ProjectTodo,
  ProjectGroup,
  difficultyColors,
  statusColors,
} from "../../data/woomoonro/woomoonroData";

interface ProjectDetailViewProps {
  project: Project;
  userProject?: UserProject;
  onBack: () => void;
  onUpdateStatus: (projectId: string, status: UserProject["status"]) => void;
  onToggleBookmark: (projectId: string) => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  userProject,
  onBack,
  onUpdateStatus,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "todos" | "groups" | "notes"
  >("overview");
  const [newTodo, setNewTodo] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [notes, setNotes] = useState(userProject?.progress_notes || "");

  // Mock data for demonstration - in real app, this would come from props or API
  const projectTodos: ProjectTodo[] = [
    {
      id: "pt1",
      user_id: "user1",
      project_id: project.id,
      title: "Setup project structure",
      description: "Initialize React app and install dependencies",
      is_completed: true,
      due_date: "2024-01-22T00:00:00Z",
      created_at: "2024-01-20T09:00:00Z",
    },
    {
      id: "pt2",
      user_id: "user1",
      project_id: project.id,
      title: "Implement basic UI components",
      description: "Create header, sidebar, and main content components",
      is_completed: false,
      due_date: "2024-01-24T00:00:00Z",
      created_at: "2024-01-20T10:00:00Z",
    },
    {
      id: "pt3",
      user_id: "user1",
      project_id: project.id,
      title: "Add state management",
      description: "Implement state management for todo operations",
      is_completed: false,
      due_date: "2024-01-25T00:00:00Z",
      created_at: "2024-01-20T11:00:00Z",
    },
  ];

  const projectGroups: ProjectGroup[] = [
    {
      id: "pg1",
      user_id: "user1",
      project_id: project.id,
      name: "React Resources",
      links: [
        {
          title: "React Official Docs",
          url: "https://react.dev",
          type: "documentation",
        },
        {
          title: "React Hooks Guide",
          url: "https://react.dev/reference/react",
          type: "tutorial",
        },
      ],
      created_at: "2024-01-20T13:00:00Z",
    },
  ];

  const addTodo = () => {
    if (newTodo.trim()) {
      // In real app, this would make an API call
      console.log("Adding todo:", newTodo);
      setNewTodo("");
    }
  };

  const toggleTodo = (todoId: string) => {
    // In real app, this would make an API call
    console.log("Toggle todo:", todoId);
  };

  const addGroup = () => {
    if (newGroupName.trim()) {
      // In real app, this would make an API call
      console.log("Adding group:", newGroupName);
      setNewGroupName("");
      setShowAddGroup(false);
    }
  };

  const saveNotes = () => {
    // In real app, this would make an API call
    console.log("Saving notes:", notes);
  };

  const completedTodos = projectTodos.filter(
    (todo) => todo.is_completed
  ).length;
  const totalTodos = projectTodos.length;
  const progressPercentage =
    totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
        <button
          onClick={() => onToggleBookmark(project.id)}
          className="p-2 text-gray-400 transition-colors hover:text-yellow-500"
        >
          {userProject?.is_bookmarked ? (
            <BookmarkCheck className="w-6 h-6 text-yellow-500" />
          ) : (
            <Bookmark className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Project Info Card */}
      <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
        {project.thumbnail_url && (
          <div className="h-64 overflow-hidden bg-gray-200">
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Project Details */}
            <div className="space-y-4 md:col-span-2">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full border ${
                    difficultyColors[project.difficulty]
                  }`}
                >
                  {project.difficulty}
                </span>
                {userProject && (
                  <span
                    className={`px-3 py-1 text-sm rounded-full border ${
                      statusColors[userProject.status]
                    }`}
                  >
                    {userProject.status.replace("_", " ")}
                  </span>
                )}
                <span className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <Clock className="w-4 h-4" />
                  {project.estimated_hours} hours
                </span>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="mb-2 font-medium text-gray-800">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm text-blue-700 border border-blue-200 rounded-lg bg-blue-50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="mb-2 font-medium text-gray-800">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Status & Progress */}
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-gray-800">
                  Project Status
                </h3>
                <select
                  value={userProject?.status || "not_started"}
                  onChange={(e) =>
                    onUpdateStatus(
                      project.id,
                      e.target.value as UserProject["status"]
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {totalTodos > 0 && (
                <div>
                  <h3 className="mb-2 font-medium text-gray-800">Progress</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tasks completed</span>
                      <span className="font-medium">
                        {completedTodos}/{totalTodos}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="bg-[#587CF0] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {Math.round(progressPercentage)}% complete
                    </span>
                  </div>
                </div>
              )}

              {userProject?.started_at && (
                <div>
                  <h3 className="mb-1 font-medium text-gray-800">Started</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(userProject.started_at).toLocaleDateString()}
                  </p>
                </div>
              )}

              {userProject?.completed_at && (
                <div>
                  <h3 className="mb-1 font-medium text-gray-800">Completed</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(userProject.completed_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-purple-100 shadow-sm rounded-xl">
        <div className="border-b border-gray-200">
          <nav className="flex px-6 space-x-8">
            {[
              { id: "overview", label: "Overview", icon: FileText },
              { id: "todos", label: "Tasks", icon: CheckCircle2 },
              { id: "groups", label: "Resource Groups", icon: Users },
              { id: "notes", label: "Notes", icon: Edit3 },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-[#587CF0] text-[#587CF0]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                  {tab.id === "todos" && totalTodos > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {completedTodos}/{totalTodos}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Project Description
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Learning Objectives
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-[#587CF0] mt-0.5" />
                    Master the fundamentals of {project.tech_stack[0]}
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-[#587CF0] mt-0.5" />
                    Understand component-based architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-[#587CF0] mt-0.5" />
                    Practice modern development workflows
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Prerequisites
                </h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Basic understanding of HTML, CSS, and JavaScript</li>
                  <li>• Familiarity with modern web development concepts</li>
                  <li>• Node.js and npm installed on your system</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "todos" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Project Tasks
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
                    onKeyPress={(e) => e.key === "Enter" && addTodo()}
                  />
                  <button
                    onClick={addTodo}
                    className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {projectTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gray-50"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="mt-0.5"
                    >
                      {todo.is_completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h4
                        className={`font-medium ${
                          todo.is_completed
                            ? "text-gray-500 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.title}
                      </h4>
                      {todo.description && (
                        <p
                          className={`text-sm mt-1 ${
                            todo.is_completed
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {todo.description}
                        </p>
                      )}
                      {todo.due_date && (
                        <div className="flex items-center gap-1 mt-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Due: {new Date(todo.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resource Groups Tab */}
          {activeTab === "groups" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Resource Groups
                </h3>
                <button
                  onClick={() => setShowAddGroup(true)}
                  className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Group
                </button>
              </div>

              {showAddGroup && (
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Group name..."
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
                      onKeyPress={(e) => e.key === "Enter" && addGroup()}
                    />
                    <button
                      onClick={addGroup}
                      className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddGroup(false)}
                      className="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {projectGroups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <h4 className="mb-3 font-medium text-gray-800">
                      {group.name}
                    </h4>
                    <div className="space-y-2">
                      {group.links.map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <Link className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-800">
                              {link.title}
                            </span>
                            <span className="px-2 py-1 text-xs text-gray-600 bg-gray-200 rounded">
                              {link.type}
                            </span>
                          </div>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-gray-400 hover:text-[#587CF0] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Project Notes
                </h3>
                <button
                  onClick={saveNotes}
                  className="px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
                >
                  Save Notes
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your project notes, learnings, and thoughts here..."
                className="w-full h-64 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent resize-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;
