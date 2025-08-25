import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Clock, 
  Play,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import { mockCourses, mockAssignments, mockCalendarEvents } from '@/data/mockData';
import { Link } from 'react-router-dom';

export function StudentDashboard() {
  const enrolledCourses = mockCourses.slice(0, 2);
  const upcomingAssignments = mockAssignments.slice(0, 3);
  const upcomingEvents = mockCalendarEvents.slice(0, 3);

  const stats = [
    {
      title: 'Enrolled Courses',
      value: '4',
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      title: 'Assignments Due',
      value: '3',
      icon: FileText,
      color: 'text-warning'
    },
    {
      title: 'Completed',
      value: '12',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Overall Progress',
      value: '73%',
      icon: TrendingUp,
      color: 'text-primary'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Alice!</h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey. You have 3 assignments due this week.
          </p>
        </div>
        <Link to="/dashboard/calendar">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            <Calendar className="h-5 w-5" />
            View Schedule
          </Button>
        </Link>
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
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Courses</CardTitle>
                <CardDescription>Your active learning paths</CardDescription>
              </div>
              <Link to="/dashboard/my-courses">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">by {course.trainer_name}</p>
                  </div>
                  <Badge variant="outline">Week 4</Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration_weeks} weeks
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.enrolled_students} students
                    </span>
                  </div>
                  <Link to={`/dashboard/courses/${course.id}`}>
                    <Button size="sm" className="gap-2">
                      <Play className="h-4 w-4" />
                      Continue
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <Badge 
                    variant={event.type === 'class' ? 'default' : 'secondary'} 
                    className="mt-1 text-xs"
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>
            ))}
            <Link to="/dashboard/calendar">
              <Button variant="outline" size="sm" className="w-full">
                View Full Calendar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Assignments and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Assignments</CardTitle>
                <CardDescription>Assignments requiring your attention</CardDescription>
              </div>
              <Link to="/dashboard/assignments">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssignments.map((assignment) => (
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
                    <Badge variant={assignment.type === 'group' ? 'secondary' : 'outline'} className="text-xs">
                      {assignment.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {assignment.points} points
                    </span>
                  </div>
                </div>
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your learning milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Award className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="font-medium text-sm text-success">Course Milestone</div>
                <div className="text-xs text-muted-foreground">
                  Completed Week 4 of Web Development
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm text-primary">Assignment Completed</div>
                <div className="text-xs text-muted-foreground">
                  Scored 95% on React Portfolio Project
                </div>
              </div>
            </div>

            <Link to="/dashboard/progress">
              <Button variant="outline" size="sm" className="w-full">
                View All Achievements
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}