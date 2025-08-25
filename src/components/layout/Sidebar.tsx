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
    href: '/colleges',
    icon: Building,
    roles: ['super_admin']
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
    roles: ['super_admin', 'admin']
  },
  {
    title: 'Courses',
    href: '/courses',
    icon: BookOpen,
    roles: ['super_admin', 'admin', 'trainer', 'student']
  },
  {
    title: 'My Courses',
    href: '/my-courses',
    icon: GraduationCap,
    roles: ['student']
  },
  {
    title: 'Assignments',
    href: '/assignments',
    icon: FileText,
    roles: ['trainer', 'student']
  },
  {
    title: 'Groups',
    href: '/groups',
    icon: MessageSquare,
    roles: ['staff', 'student']
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: Calendar,
    roles: ['super_admin', 'admin', 'trainer', 'staff', 'student']
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: UserCheck,
    roles: ['trainer', 'staff']
  },
  {
    title: 'Progress',
    href: '/progress',
    icon: Award,
    roles: ['trainer', 'student']
  },
  {
    title: 'Schedule',
    href: '/schedule',
    icon: Clock,
    roles: ['trainer', 'staff', 'student']
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['super_admin', 'admin', 'trainer']
  },
  {
    title: 'Settings',
    href: '/settings',
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
        "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r border-border bg-card transition-transform duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:w-16"
      )}>
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <nav className="flex-1 space-y-2">
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
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent/50",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground",
                    !isOpen && "lg:justify-center lg:px-2"
                  )}
                >
                  <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary-foreground")} />
                  <span className={cn("transition-opacity", !isOpen && "lg:opacity-0 lg:w-0")}>
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User info at bottom */}
          {isOpen && (
            <div className="border-t border-border pt-4 mt-4">
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-foreground">{user.name}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {user.role.replace('_', ' ')}
                </div>
                {user.college_name && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {user.college_name}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}