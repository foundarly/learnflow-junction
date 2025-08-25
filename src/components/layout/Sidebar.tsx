import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Home,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  Building,
  UserCheck,
  FileText,
  MessageSquare,
  GraduationCap,
  Award,
  Clock
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['super_admin', 'admin', 'trainer', 'staff', 'student']
  },
  {
    title: 'Colleges',
    href: '/dashboard/colleges',
    icon: Building,
    roles: ['super_admin']
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Users,
    roles: ['super_admin', 'admin']
  },
  {
    title: 'Courses',
    href: '/dashboard/courses',
    icon: BookOpen,
    roles: ['super_admin', 'admin', 'trainer', 'student']
  },
  {
    title: 'My Courses',
    href: '/dashboard/my-courses',
    icon: GraduationCap,
    roles: ['student']
  },
  {
    title: 'Assignments',
    href: '/dashboard/assignments',
    icon: FileText,
    roles: ['trainer', 'student']
  },
  {
    title: 'Groups',
    href: '/dashboard/groups',
    icon: MessageSquare,
    roles: ['staff', 'student']
  },
  {
    title: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
    roles: ['super_admin', 'admin', 'trainer', 'staff', 'student']
  },
  {
    title: 'Attendance',
    href: '/dashboard/attendance',
    icon: UserCheck,
    roles: ['trainer', 'staff']
  },
  {
    title: 'Progress',
    href: '/dashboard/progress',
    icon: Award,
    roles: ['trainer', 'student']
  },
  {
    title: 'Schedule',
    href: '/dashboard/schedule',
    icon: Clock,
    roles: ['trainer', 'staff', 'student']
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    roles: ['super_admin', 'admin', 'trainer']
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['super_admin', 'admin', 'trainer', 'staff', 'student']
  }
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const userNavItems = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] transform border-r border-sidebar-border bg-sidebar backdrop-blur-sm transition-all duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0 w-80 lg:w-80" : "-translate-x-full lg:translate-x-0 lg:w-16"
      )}>
        <div className="flex h-full flex-col p-3 sm:p-4 lg:overflow-hidden overflow-y-auto">
          <nav className="flex-1 space-y-1 lg:space-y-2">
            {userNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || 
                             (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent group",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg" 
                      : "text-sidebar-foreground hover:text-sidebar-accent-foreground",
                    !isOpen ? "lg:justify-center lg:px-2 lg:gap-0" : "gap-3 lg:gap-4"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 shrink-0 transition-colors", 
                    isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                  )} />
                  <span className={cn(
                    "transition-all duration-200", 
                    !isOpen && "lg:opacity-0 lg:w-0 lg:overflow-hidden lg:absolute"
                  )}>
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User info at bottom */}
          <div className={cn(
            "border-t border-sidebar-border pt-3 lg:pt-4 mt-3 lg:mt-4 transition-all duration-200",
            !isOpen && "lg:opacity-0 lg:pointer-events-none"
          )}>
            <div className="px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl bg-sidebar-accent/50">
              <div className="text-sm font-semibold text-sidebar-foreground">{user.name}</div>
              <div className="text-xs text-sidebar-foreground/70 capitalize mt-1">
                {user.role.replace('_', ' ')}
              </div>
              {user.college_name && (
                <div className="text-xs text-sidebar-foreground/60 mt-1 line-clamp-1">
                  {user.college_name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}