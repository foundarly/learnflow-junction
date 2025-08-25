import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Plus,
  Eye,
  MoreHorizontal,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { mockAnalytics, mockColleges } from '@/data/mockData';
import { Link } from 'react-router-dom';

export function SuperAdminDashboard() {
  const stats = [
    {
      title: 'Total Colleges',
      value: mockAnalytics.totalColleges,
      icon: Building,
      change: '+2 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Total Users',
      value: mockAnalytics.totalUsers,
      icon: Users,
      change: '+12% from last month',
      changeType: 'positive' as const
    },
    {
      title: 'Active Courses',
      value: mockAnalytics.totalCourses,
      icon: BookOpen,
      change: '+8 new courses',
      changeType: 'positive' as const
    },
    {
      title: 'Platform Growth',
      value: mockAnalytics.activeUsers,
      icon: TrendingUp,
      change: '+15% engagement',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Overview</h1>
          <p className="text-muted-foreground mt-1">
            Manage colleges, monitor platform performance, and oversee global operations
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Add College
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-success">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Colleges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Colleges</CardTitle>
                <CardDescription>Latest college registrations and activity</CardDescription>
              </div>
              <Link to="/dashboard/colleges">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockColleges.slice(0, 3).map((college) => (
              <div key={college.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{college.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {college.students_count} students • {college.courses_count} courses
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={college.status === 'active' ? 'default' : 'secondary'}>
                    {college.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-success/10">
                <UserCheck className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">{mockAnalytics.activeUsers}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{mockAnalytics.coursesCompleted}</div>
                <div className="text-sm text-muted-foreground">Completed Courses</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">User Engagement</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-gradient-primary rounded-full w-[89%]"></div>
              </div>
            </div>

            <Link to="/dashboard/analytics">
              <Button variant="outline" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard/colleges/new">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <Building className="h-6 w-6" />
                Add New College
              </Button>
            </Link>
            <Link to="/dashboard/users">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <Users className="h-6 w-6" />
                Manage Users
              </Button>
            </Link>
            <Link to="/dashboard/analytics">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                View Reports
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}