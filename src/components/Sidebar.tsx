import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FileText,
  Code2,
  BookOpen,
  Brain,
  Briefcase,
  Terminal,
  MessageCircle,
  Building2,
  User,
  Folder,
  CheckSquare,
  Star,
  Archive,
  Lightbulb,
  Sparkles,
  Book,
  Users,
  Library,
  GraduationCap,
  BookMarked,
  Plus,
  Download,
  LayoutGrid as Layout,
  StickyNote,
  Bell,
  ChevronDown,
  ChevronRight,
  X,
  FolderOpen,
  Files,
  GitFork,
  ScrollText,
  UserCircle,
  BookText,
  FolderKanban,
  Video,
  Home,
  Package,
  Wrench,
  CloudCog,
  Building,
  Bookmark,
  Clock,
  ListChecks,
} from "lucide-react";
import { navigationData } from "../data/navigationData";
import Logo from "../assets/images/Logo.svg";
import { SidebarProps } from "../types/pages/Sidebar";
import { NavigationItem } from "../types/pages/Sidebar/sidebar";


const iconMap = {
  CheckSquare,
  FileText,
  Code2,
  BookOpen,
  Brain,
  Briefcase,
  Terminal,
  MessageCircle,
  Building2,
  User,
  Folder,
  Star,
  Archive,
  Lightbulb,
  Sparkles,
  Book,
  Users,
  Library,
  GraduationCap,
  BookMarked,
  Plus,
  Download,
  Layout,
  StickyNote,
  Bell,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Files,
  GitFork,
  ScrollText,
  UserCircle,
  BookText,
  FolderKanban,
  Video,
  Home,
  Package,
  Wrench,
  CloudCog,
  Building,
  Bookmark,
  Clock,
  ListChecks,
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
    } else if (item.route) {
      navigate(item.route);
      onClose(); // 모바일에서 닫기
    }
  };

  const handleChildClick = (route: string) => {
    navigate(route);
    onClose();
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = currentRoute === item.route;
    const hasActiveChild =
      hasChildren &&
      item.children!.some((child) => currentRoute === child.route);

    return (
      <div key={item.id} className="mb-1">
        {/* Main Item */}
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
            isActive && !hasActiveChild
              ? "bg-[#587CF0] text-white shadow-md"
              : "text-gray-700 hover:bg-purple-50 hover:text-[#587CF0]"
          }`}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center gap-3">
            <IconComponent className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </div>
          {hasChildren && (
            <div
              className={`transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Submenu with Animation */}
        {hasChildren && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pl-4 mt-2 ml-4 space-y-1 border-l-2 border-purple-100">
              {item.children!.map((child) => {
                const ChildIconComponent =
                  iconMap[child.icon as keyof typeof iconMap];
                const isChildActive = currentRoute === child.route;

                return (
                  <div
                    key={child.id}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      isChildActive
                        ? "bg-[#587CF0] text-white shadow-sm"
                        : "text-gray-600 hover:bg-purple-50 hover:text-[#587CF0]"
                    }`}
                    onClick={() => handleChildClick(child.route)}
                  >
                    <ChildIconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{child.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white shadow-xl z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 lg:translate-x-0 lg:static lg:shadow-none lg:z-0 border-r border-purple-100`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#587CF0] to-purple-400 rounded-lg flex items-center justify-center">
              <img src={Logo} alt="Logo" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Codstro</h1>
              {/* <p className="text-xs text-gray-500">Coding Journey</p> */}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2">
            {navigationData.map((item) => renderNavigationItem(item))}
          </nav>
        </div>

        {/* Footer */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="w-full p-4 text-left border-t border-purple-100"
        >
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="w-8 h-8 bg-[#587CF0] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Student User</p>
              <p className="text-xs text-gray-500">Level 1 • 120 points</p>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
