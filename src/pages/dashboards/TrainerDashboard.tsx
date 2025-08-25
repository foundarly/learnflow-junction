import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  FileText, 
  UserCheck, 
  Plus,
  Calendar,
  Clock,
  Play,
  Upload,
  MessageCircle
} from 'lucide-react';
import { mockCourses, mockAssignments, mockCalendarEvents } from '@/data/mockData';
import { Link } from 'react-router-dom';

export function TrainerDashboard() {
  const trainerStats = {
    activeCourses: 3,
    totalStudents: 67,
    pendingGrades: 12,
    completionRate: 78
  };

  const stats = [
    {
      title: 'Active Courses',
      value: trainerStats.activeCourses,
      icon: BookOpen,
      change: '+1 this semester',
      changeType: 'positive' as const
    },
    {
      title: 'Total Students',
      value: trainerStats.totalStudents,
      icon: Users,
      change: '+8 enrolled',
      changeType: 'positive' as const
    },
    {
      title: 'Pending Grades',
      value: trainerStats.pendingGrades,
      icon: FileText,
      change: '2 due today',
      changeType: 'warning' as const
    },
    {
      title: 'Avg Completion',
      value: `${trainerStats.completionRate}%`,
      icon: UserCheck,
      change: '+5% this month',
      changeType: 'positive' as const
    }
  ];

  const myCourses = mockCourses.slice(0, 2);
  const upcomingClasses = mockCalendarEvents.filter(event => event.type === 'class').slice(0, 3);
  const recentAssignments = mockAssignments.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trainer Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your courses, track student progress, and deliver quality education
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/content/upload">
            <Button variant="outline" size="lg" className="gap-2">
              <Upload className="h-5 w-5" />
              Upload Content
            </Button>
          </Link>
          <Link to="/assignments/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              New Assignment
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
                  <span className={`text-xs ${
                    stat.changeType === 'positive' ? 'text-success' : 
                    stat.changeType === 'warning' ? 'text-warning' : 'text-muted-foreground'
                  }`}>
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
        {/* My Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Courses you're currently teaching</CardDescription>
              </div>
              <Link to="/courses">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {myCourses.map((course) => (
              <div key={course.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.enrolled_students} students enrolled
                    </p>
                  </div>
                  <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-medium">Week 6 of {course.duration_weeks}</span>
                  </div>
                  <Progress value={(6 / course.duration_weeks) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration_weeks} weeks
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.enrolled_students}/{course.max_students}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/courses/${course.id}/content`}>
                      <Button size="sm" variant="outline">
                        Content
                      </Button>
                    </Link>
                    <Link to={`/courses/${course.id}/manage`}>
                      <Button size="sm" className="gap-2">
                        <Play className="h-4 w-4" />
                        Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {event.course_name}
                  </div>
                </div>
              </div>
            ))}
            <Link to="/schedule">
              <Button variant="outline" size="sm" className="w-full">
                View Schedule
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Assignments and Student Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Assignment Management</CardTitle>
                <CardDescription>Track and grade student submissions</CardDescription>
              </div>
              <Link to="/assignments">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-warning" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{assignment.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Due: {new Date(assignment.due_date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {assignment.submissions_count} submissions
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {assignment.points} points
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Grade
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Student Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
            <CardDescription>Monitor class participation and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-success/10">
                <UserCheck className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">89%</div>
                <div className="text-sm text-muted-foreground">Attendance Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Messages</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Assignment Submissions</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-gradient-primary rounded-full w-[78%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Course Completion</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-gradient-success rounded-full w-[65%]"></div>
                </div>
              </div>
            </div>

            <Link to="/analytics/students">
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}