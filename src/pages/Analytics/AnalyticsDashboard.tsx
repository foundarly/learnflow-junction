import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Award,
  Clock,
  Target,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  Filter
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AnalyticsData {
  metric: string;
  value: number;
  change: number;
  period: string;
  trend: 'up' | 'down' | 'stable';
}

const mockAnalyticsData: AnalyticsData[] = [
  {
    metric: 'Student Engagement',
    value: 89,
    change: 12,
    period: 'vs last month',
    trend: 'up'
  },
  {
    metric: 'Course Completion Rate',
    value: 76,
    change: -3,
    period: 'vs last month',
    trend: 'down'
  },
  {
    metric: 'Assignment Submission',
    value: 91,
    change: 8,
    period: 'vs last month',
    trend: 'up'
  },
  {
    metric: 'Attendance Rate',
    value: 85,
    change: 5,
    period: 'vs last month',
    trend: 'up'
  }
];

interface CoursePerformance {
  course_name: string;
  students_enrolled: number;
  completion_rate: number;
  average_grade: string;
  satisfaction_score: number;
}

const mockCoursePerformance: CoursePerformance[] = [
  {
    course_name: 'Web Development Fundamentals',
    students_enrolled: 45,
    completion_rate: 89,
    average_grade: 'B+',
    satisfaction_score: 4.3
  },
  {
    course_name: 'Data Science Basics',
    students_enrolled: 32,
    completion_rate: 76,
    average_grade: 'B',
    satisfaction_score: 4.1
  },
  {
    course_name: 'Mobile App Development',
    students_enrolled: 28,
    completion_rate: 92,
    average_grade: 'A-',
    satisfaction_score: 4.5
  },
  {
    course_name: 'UI/UX Design Principles',
    students_enrolled: 35,
    completion_rate: 82,
    average_grade: 'B+',
    satisfaction_score: 4.2
  }
];

export default function AnalyticsDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into learning performance and engagement
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="gap-2">
            <Filter className="h-5 w-5" />
            Filter
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <RefreshCw className="h-5 w-5" />
            Refresh
          </Button>
          <Button size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockAnalyticsData.map((data, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {data.metric}
              </CardTitle>
              {getTrendIcon(data.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{data.value}%</div>
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-xs font-medium ${getTrendColor(data.trend)}`}>
                  {data.change > 0 ? '+' : ''}{data.change}% {data.period}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Student progress across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed Modules</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Assignments Submitted</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quizzes Completed</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Student activity and participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">127h</div>
                    <div className="text-sm text-muted-foreground">Study Time</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-success/10">
                    <Users className="h-8 w-8 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold text-success">89%</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-warning/10">
                    <BookOpen className="h-8 w-8 text-warning mx-auto mb-2" />
                    <div className="text-2xl font-bold text-warning">456</div>
                    <div className="text-sm text-muted-foreground">Resources Accessed</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-info/10">
                    <Award className="h-8 w-8 text-info mx-auto mb-2" />
                    <div className="text-2xl font-bold text-info">23</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest learning activities and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Course Completion Milestone</div>
                    <div className="text-xs text-muted-foreground">
                      15 students completed Web Development Fundamentals
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Engagement Spike</div>
                    <div className="text-xs text-muted-foreground">
                      40% increase in forum discussions this week
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">5 hours ago</div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Assignment Deadline Alert</div>
                    <div className="text-xs text-muted-foreground">
                      React Portfolio project due in 2 days
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Analysis</CardTitle>
              <CardDescription>Detailed performance metrics for each course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCoursePerformance.map((course, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{course.course_name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students_enrolled} enrolled
                          </span>
                          <span>Grade: {course.average_grade}</span>
                          <span>Rating: {course.satisfaction_score}/5.0</span>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {course.completion_rate}% completion
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span className="font-medium">{course.completion_rate}%</span>
                      </div>
                      <Progress value={course.completion_rate} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Analytics</CardTitle>
              <CardDescription>Individual student performance and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Student Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed student performance charts and insights coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create custom reports for different time periods and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Performance Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Engagement Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <BookOpen className="h-6 w-6" />
                  Course Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Award className="h-6 w-6" />
                  Achievement Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Clock className="h-6 w-6" />
                  Time Analysis
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Target className="h-6 w-6" />
                  Goals Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}