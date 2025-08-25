import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Plus,
  Eye,
  Settings,
  UserPlus,
  BookPlus
} from 'lucide-react';
import { mockCourses, mockUsers } from '@/data/mockData';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const collegeStats = {
    totalStudents: 156,
    totalCourses: 8,
    activeTrainers: 12,
    completionRate: 87
  };

  const stats = [
    {
      title: 'Total Students',
      value: collegeStats.totalStudents,
      icon: Users,
      change: '+12 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Active Courses',
      value: collegeStats.totalCourses,
      icon: BookOpen,
      change: '+2 new courses',
      changeType: 'positive' as const
    },
    {
      title: 'Trainers',
      value: collegeStats.activeTrainers,
      icon: GraduationCap,
      change: '100% active',
      changeType: 'neutral' as const
    },
    {
      title: 'Completion Rate',
      value: `${collegeStats.completionRate}%`,
      icon: TrendingUp,
      change: '+5% from last month',
      changeType: 'positive' as const
    }
  ];

  const recentCourses = mockCourses.slice(0, 3);
  const collegeUsers = mockUsers.filter(user => user.college_id === 'college-1').slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">College Administration</h1>
          <p className="text-muted-foreground mt-1">
            Manage your college's courses, users, and academic programs
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/courses/new">
            <Button variant="outline" size="lg" className="gap-2">
              <BookPlus className="h-5 w-5" />
              Add Course
            </Button>
          </Link>
          <Link to="/dashboard/users/invite">
            <Button size="lg" className="gap-2">
              <UserPlus className="h-5 w-5" />
              Invite User
            </Button>
          </Link>
        </div>
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
                  <span className={`text-xs ${stat.changeType === 'positive' ? 'text-success' : 'text-muted-foreground'}`}>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Management */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Oversee active courses and their performance</CardDescription>
              </div>
              <Link to="/dashboard/courses">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">by {course.trainer_name}</p>
                  </div>
                  <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{course.enrolled_students}/{course.max_students} students</span>
                  <span>{course.duration_weeks} weeks</span>
                  <span>Ends {new Date(course.end_date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    {course.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <Link to={`/dashboard/courses/${course.id}/manage`}>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Manage
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {collegeUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {user.role.replace('_', ' ')} • {user.department}
                  </div>
                </div>
                <Badge 
                  variant={user.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {user.status}
                </Badge>
              </div>
            ))}
            <Link to="/dashboard/users">
              <Button variant="outline" size="sm" className="w-full">
                View All Users
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/dashboard/courses/new">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <BookPlus className="h-6 w-6" />
                Create Course
              </Button>
            </Link>
            <Link to="/dashboard/users/invite">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <UserPlus className="h-6 w-6" />
                Invite Users
              </Button>
            </Link>
            <Link to="/dashboard/analytics">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <Eye className="h-6 w-6" />
                View Analytics
              </Button>
            </Link>
            <Link to="/dashboard/settings">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <Settings className="h-6 w-6" />
                College Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}