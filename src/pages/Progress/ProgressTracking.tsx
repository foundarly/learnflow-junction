import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award,
  Target,
  TrendingUp,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ProgressData {
  course_id: string;
  course_name: string;
  progress_percentage: number;
  completed_modules: number;
  total_modules: number;
  current_week: number;
  total_weeks: number;
  grade: string;
  assignments_completed: number;
  assignments_total: number;
  last_activity: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date_earned: string;
  category: 'course' | 'assignment' | 'participation' | 'milestone';
  points: number;
}

const mockProgressData: ProgressData[] = [
  {
    course_id: '1',
    course_name: 'Web Development Fundamentals',
    progress_percentage: 78,
    completed_modules: 7,
    total_modules: 9,
    current_week: 6,
    total_weeks: 12,
    grade: 'A-',
    assignments_completed: 8,
    assignments_total: 10,
    last_activity: '2024-01-15'
  },
  {
    course_id: '2',
    course_name: 'Data Science Basics',
    progress_percentage: 45,
    completed_modules: 4,
    total_modules: 8,
    current_week: 4,
    total_weeks: 10,
    grade: 'B+',
    assignments_completed: 3,
    assignments_total: 6,
    last_activity: '2024-01-14'
  },
  {
    course_id: '3',
    course_name: 'Mobile App Development',
    progress_percentage: 92,
    completed_modules: 11,
    total_modules: 12,
    current_week: 8,
    total_weeks: 8,
    grade: 'A',
    assignments_completed: 7,
    assignments_total: 7,
    last_activity: '2024-01-15'
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Assignment Completed',
    description: 'Successfully submitted your first assignment',
    date_earned: '2024-01-10',
    category: 'assignment',
    points: 50
  },
  {
    id: '2',
    title: 'Course Milestone',
    description: 'Completed 75% of Web Development Fundamentals',
    date_earned: '2024-01-12',
    category: 'course',
    points: 100
  },
  {
    id: '3',
    title: 'Perfect Attendance',
    description: 'Attended all classes this week',
    date_earned: '2024-01-14',
    category: 'participation',
    points: 25
  },
  {
    id: '4',
    title: 'Top Performer',
    description: 'Achieved highest score in Mobile App final project',
    date_earned: '2024-01-15',
    category: 'milestone',
    points: 200
  }
];

export default function ProgressTracking() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const totalProgress = Math.round(
    mockProgressData.reduce((sum, course) => sum + course.progress_percentage, 0) / mockProgressData.length
  );

  const totalPoints = mockAchievements.reduce((sum, achievement) => sum + achievement.points, 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'assignment': return <CheckCircle className="h-4 w-4" />;
      case 'participation': return <Star className="h-4 w-4" />;
      case 'milestone': return <Trophy className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'course': return 'default';
      case 'assignment': return 'secondary';
      case 'participation': return 'outline';
      case 'milestone': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Progress</h1>
          <p className="text-muted-foreground mt-1">
            Track your academic journey and achievements
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <BarChart3 className="h-5 w-5" />
          Detailed Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Progress
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalProgress}%</div>
            <p className="text-xs text-success mt-1">+8% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Courses
            </CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{mockProgressData.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Achievements
            </CardTitle>
            <Trophy className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{mockAchievements.length}</div>
            <p className="text-xs text-success mt-1">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Points
            </CardTitle>
            <Star className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalPoints}</div>
            <p className="text-xs text-success mt-1">Earned this semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Course Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProgressData.map((course) => (
              <Card key={course.course_id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{course.course_name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="default" className="text-xs">
                          Grade: {course.grade}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Week {course.current_week}/{course.total_weeks}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Progress</span>
                      <span className="font-medium">{course.progress_percentage}%</span>
                    </div>
                    <Progress value={course.progress_percentage} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Modules</span>
                      <span className="font-medium">
                        {course.completed_modules}/{course.total_modules}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Assignments</span>
                      <span className="font-medium">
                        {course.assignments_completed}/{course.assignments_total}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Last Activity
                      </span>
                      <span className="font-medium">
                        {new Date(course.last_activity).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button size="sm" className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Milestones and accomplishments in your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAchievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        {getCategoryIcon(achievement.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={getCategoryColor(achievement.category)} className="mb-1 text-xs">
                              {achievement.category}
                            </Badge>
                            <div className="text-sm font-medium text-primary">
                              +{achievement.points} pts
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Earned on {new Date(achievement.date_earned).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Streak</CardTitle>
                <CardDescription>Your consistency in learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-primary mb-2">12</div>
                  <div className="text-sm text-muted-foreground">Days in a row</div>
                  <div className="text-xs text-success mt-1">Personal best: 18 days</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Time</CardTitle>
                <CardDescription>Time spent on learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-primary mb-2">24.5</div>
                  <div className="text-sm text-muted-foreground">Hours this week</div>
                  <div className="text-xs text-success mt-1">+3.2h vs last week</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Your academic performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Detailed analytics charts will be available soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}