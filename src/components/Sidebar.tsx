import React, { useState, useEffect } from 'react';
import {
  FileText,
  UserCheck,
  Users,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, onLogout }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { id: 'applications', label: 'Doctor Applications', icon: FileText },
    { id: 'doctors', label: 'Doctor Management', icon: UserCheck },
    { id: 'clinics', label: 'Clinic Management', icon: Users },
    { id: 'users', label: 'User Management', icon: User },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
  ];

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.getElementById('hamburger-button');
      if (
        isMobileOpen &&
        sidebar &&
        hamburger &&
        !sidebar.contains(event.target as Node) &&
        !hamburger.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleMenuItemClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (isMobile) setIsMobileOpen(false);
  };

  // Mobile Hamburger Button
  const MobileHamburger = () => (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <button
        id="hamburger-button"
        onClick={toggleMobileSidebar}
        className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg border border-sky-100 text-sky-600 hover:text-sky-700 hover:bg-white transition-all duration-200 active:scale-95"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );

  // Collapse Toggle Button for Desktop
  const CollapseButton = () => (
    <div className="hidden md:flex absolute -right-3 top-6 z-20">
      <button
        onClick={toggleCollapse}
        className="p-1.5 bg-white rounded-full border border-sky-200 shadow-lg text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-all duration-200 active:scale-95"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>
  );

  // Sidebar Content
  const SidebarContent = () => (
    <div 
      className={`
        bg-white shadow-xl border-r border-sky-100 h-full flex flex-col
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="p-6 border-b border-sky-100 relative">
        <CollapseButton />
        <div className={`flex items-center space-x-3 pl-9 transition-all duration-300 ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <img
            src="https://files.catbox.moe/cctahm.png"
            alt="Logo"
            className="h-10 w-10 object-contain transition-all duration-300"
          />
          <div className={`transition-all duration-300 overflow-hidden ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            <h2 className="text-lg font-semibold text-gray-900 whitespace-nowrap">DentalAdmin</h2>
            <p className="text-sm text-sky-500 whitespace-nowrap">Dental Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className={`
                w-full flex items-center rounded-xl py-3 text-left transition-all duration-200 group relative
                ${activeSection === item.id
                  ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-200'
                  : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                }
                ${isCollapsed ? 'px-3 justify-center' : 'px-4'}
              `}
            >
              <Icon className={`h-5 w-5 transition-all duration-200 ${
                activeSection === item.id ? 'text-white' : 'text-current'
              } ${isCollapsed ? '' : 'mr-3'}`} />
              
              <span className={`
                font-medium transition-all duration-300 overflow-hidden whitespace-nowrap
                ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-0'}
                ${activeSection === item.id ? 'text-white' : 'text-current'}
              `}>
                {item.label}
              </span>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className={`
        p-4 border-t border-sky-100 bg-sky-25 transition-all duration-300
        ${isCollapsed ? 'px-3' : ''}
      `}>
        <div className={`flex items-center space-x-3 transition-all duration-300 ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-sky-500 truncate">Dental Administrator</p>
          </div>
        </div>

        {/* Logout CTA placed at bottom for prominence */}
        <div className={`mt-3 transition-all duration-300 ${isCollapsed ? 'text-center' : ''}`}>
          <button
            onClick={() => onLogout && onLogout()}
            className={`w-full flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium
              text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-150
              ${isCollapsed ? 'px-0' : 'px-2'}`}
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <MobileHamburger />

      {/* Spacer for mobile header */}
      <div className="md:hidden h-16" />

      {/* Desktop Sidebar */}
      <div className="hidden md:block relative">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && (
        <>
          {/* Backdrop */}
          {isMobileOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden" />
          )}
          
          {/* Mobile Sidebar */}
          <div
            id="sidebar"
            className={`
              fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out md:hidden
              ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;