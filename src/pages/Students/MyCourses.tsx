import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Search, 
  Play, 
  Clock, 
  Users,
  Calendar,
  Award,
  FileText,
  Video,
  CheckCircle,
  AlertCircle,
  Download,
  Star
} from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function MyCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');

  // Mock enrolled courses - in real app this would come from user enrollment data
  const enrolledCourses = mockCourses.map(course => ({
    ...course,
    progress: Math.floor(Math.random() * 100),
    lastAccessed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    grade: course.status === 'completed' ? Math.floor(Math.random() * 30) + 70 : null,
    completedWeeks: Math.floor(Math.random() * course.duration_weeks),
    totalAssignments: Math.floor(Math.random() * 10) + 5,
    completedAssignments: Math.floor(Math.random() * 8) + 2
  }));

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.trainer_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === 'active') {
      matchesTab = course.status === 'active' && course.progress < 100;
    } else if (activeTab === 'completed') {
      matchesTab = course.status === 'completed' || course.progress >= 100;
    }
    
    return matchesSearch && matchesTab;
  });

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-primary';
    if (progress >= 30) return 'bg-warning';
    return 'bg-destructive';
  };

  const courseStats = {
    total: enrolledCourses.length,
    active: enrolledCourses.filter(c => c.status === 'active' && c.progress < 100).length,
    completed: enrolledCourses.filter(c => c.status === 'completed' || c.progress >= 100).length,
    averageProgress: Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">
            Track your learning progress and continue your studies
          </p>
        </div>
        <Link to="/courses">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            <BookOpen className="h-5 w-5" />
            Browse Courses
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Enrolled Courses
            </CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{courseStats.total}</div>
            <p className="text-xs text-success mt-1">+1 this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Courses
            </CardTitle>
            <Play className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{courseStats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently studying</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <Award className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{courseStats.completed}</div>
            <p className="text-xs text-success mt-1">Certificates earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Progress
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{courseStats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            size="sm"
          >
            All Courses ({enrolledCourses.length})
          </Button>
          <Button
            variant={activeTab === 'active' ? 'default' : 'outline'}
            onClick={() => setActiveTab('active')}
            size="sm"
          >
            Active ({courseStats.active})
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('completed')}
            size="sm"
          >
            Completed ({courseStats.completed})
          </Button>
        </div>
        
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="card-hover">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <Badge variant={course.progress >= 100 ? 'default' : 'outline'}>
                  {course.progress >= 100 ? 'Completed' : 'In Progress'}
                </Badge>
                {course.grade && (
                  <Badge variant="outline" className="gap-1">
                    <Star className="h-3 w-3" />
                    {course.grade}%
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Week {course.completedWeeks} of {course.duration_weeks}
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Instructor</span>
                  <span className="font-medium">{course.trainer_name}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Duration
                  </span>
                  <span className="font-medium">{course.duration_weeks} weeks</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Classmates
                  </span>
                  <span className="font-medium">{course.enrolled_students} students</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Assignments
                  </span>
                  <span className="font-medium">
                    {course.completedAssignments}/{course.totalAssignments} completed
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Last Accessed
                  </span>
                  <span className="font-medium">
                    {new Date(course.lastAccessed).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {course.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{course.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {course.progress >= 100 ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Certificate
                    </Button>
                    <Button size="sm" className="flex-1 gap-2">
                      <Play className="h-4 w-4" />
                      Review
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Video className="h-4 w-4" />
                      Materials
                    </Button>
                    <Link to={`/courses/${course.id}/continue`} className="flex-1">
                      <Button size="sm" className="w-full gap-2">
                        <Play className="h-4 w-4" />
                        Continue
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Next Activity */}
              {course.progress < 100 && (
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-warning shrink-0" />
                    <div>
                      <div className="font-medium">Next: React Hooks Assignment</div>
                      <div className="text-muted-foreground text-xs">
                        Due in 3 days
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : activeTab === 'active'
              ? 'You have no active courses at the moment'
              : activeTab === 'completed'
              ? 'You haven\'t completed any courses yet'
              : 'You are not enrolled in any courses yet'}
          </p>
          <Link to="/courses">
            <Button className="gap-2">
              <BookOpen className="h-4 w-4" />
              Browse Available Courses
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}