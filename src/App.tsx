import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import CollegesManagement from "./pages/Colleges/CollegesManagement";
import UsersManagement from "./pages/Users/UsersManagement";
import CoursesManagement from "./pages/Courses/CoursesManagement";
import MyCourses from "./pages/Students/MyCourses";
import AssignmentsManagement from "./pages/Assignments/AssignmentsManagement";
import GroupsManagement from "./pages/Groups/GroupsManagement";
import CalendarView from "./pages/Calendar/CalendarView";
import UserProfile from "./pages/Profile/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              
              {/* Super Admin Routes */}
              <Route path="colleges">
                <Route 
                  index
                  element={
                    <ProtectedRoute allowedRoles={['super_admin']}>
                      <CollegesManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="new"
                  element={
                    <ProtectedRoute allowedRoles={['super_admin']}>
                      <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Add New College</h1>
                        <p className="text-muted-foreground">College creation form - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Admin & Super Admin Routes */}
              <Route path="users">
                <Route 
                  index
                  element={
                    <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
                      <UsersManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="invite"
                  element={
                    <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
                      <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Invite Users</h1>
                        <p className="text-muted-foreground">User invitation form - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Course Routes */}
              <Route path="courses">
                <Route 
                  index
                  element={
                    <ProtectedRoute allowedRoles={['super_admin', 'admin', 'trainer', 'student']}>
                      <CoursesManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="new"
                  element={
                    <ProtectedRoute allowedRoles={['super_admin', 'admin', 'trainer']}>
                      <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
                        <p className="text-muted-foreground">Course creation form - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path=":id"
                  element={
                    <ProtectedRoute allowedRoles={['super_admin', 'admin', 'trainer', 'student']}>
                      <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Course Details</h1>
                        <p className="text-muted-foreground">Course details view - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path=":id/manage"
                  element={
                    <ProtectedRoute allowedRoles={['super_admin', 'admin', 'trainer']}>
                      <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Manage Course</h1>
                        <p className="text-muted-foreground">Course management interface - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              <Route 
                path="my-courses" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <MyCourses />
                  </ProtectedRoute>
                } 
              />
              
              {/* Assignment Routes */}
              <Route path="assignments">
                <Route 
                  index
                  element={
                    <ProtectedRoute allowedRoles={['trainer', 'student']}>
                      <AssignmentsManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="new"
                  element={
                    <ProtectedRoute allowedRoles={['trainer']}>
                      <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Create New Assignment</h1>
                        <p className="text-muted-foreground">Assignment creation form - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Group Routes */}
              <Route path="groups">
                <Route 
                  index
                  element={
                    <ProtectedRoute allowedRoles={['staff', 'student']}>
                      <GroupsManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="new"
                  element={
                    <ProtectedRoute allowedRoles={['staff']}>
                      <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Create New Group</h1>
                        <p className="text-muted-foreground">Group creation form - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Common Routes */}
              <Route path="calendar" element={<CalendarView />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="schedule" element={<div className="p-8">Schedule - Coming Soon</div>} />
              <Route path="progress" element={<div className="p-8">Progress - Coming Soon</div>} />
              <Route path="attendance" element={<div className="p-8">Attendance - Coming Soon</div>} />
              <Route path="analytics" element={<div className="p-8">Analytics - Coming Soon</div>} />
              <Route path="settings" element={<div className="p-8">Settings - Coming Soon</div>} />
            </Route>

            {/* Unauthorized Route */}
            <Route 
              path="/unauthorized" 
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
                    <p className="text-muted-foreground">You don't have permission to access this page.</p>
                  </div>
                </div>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
