import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  Plus,
  Filter,
  Download,
  Video,
  MapPin,
  Users,
  BookOpen,
  Bell,
  RefreshCw,
  FileText,
  Award,
  Settings
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'class' | 'assignment' | 'exam' | 'meeting' | 'workshop';
  course_name?: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  instructor?: string;
  attendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  is_online: boolean;
  meeting_link?: string;
  description?: string;
}

const mockScheduleData: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    type: 'class',
    course_name: 'Web Development Fundamentals',
    date: '2024-01-16',
    start_time: '09:00',
    end_time: '11:00',
    location: 'Room A-201',
    instructor: 'Sarah Johnson',
    attendees: 25,
    status: 'upcoming',
    is_online: false,
    description: 'Learn about useState, useEffect, and custom hooks'
  },
  {
    id: '2',
    title: 'React Project Review',
    type: 'assignment',
    course_name: 'Web Development Fundamentals',
    date: '2024-01-16',
    start_time: '14:00',
    end_time: '14:00',
    location: 'Online Submission',
    status: 'upcoming',
    is_online: true,
    description: 'Submit your React portfolio project'
  },
  {
    id: '3',
    title: 'Data Analysis Workshop',
    type: 'workshop',
    course_name: 'Data Science Basics',
    date: '2024-01-17',
    start_time: '10:00',
    end_time: '12:00',
    location: 'Computer Lab B',
    instructor: 'Mike Chen',
    attendees: 20,
    status: 'upcoming',
    is_online: false,
    meeting_link: 'https://meet.google.com/abc-def-ghi',
    description: 'Hands-on data analysis using Python and Pandas'
  },
  {
    id: '4',
    title: 'Mobile UI Design Principles',
    type: 'class',
    course_name: 'Mobile App Development',
    date: '2024-01-17',
    start_time: '13:30',
    end_time: '15:30',
    location: 'Design Studio',
    instructor: 'Lisa Wang',
    attendees: 18,
    status: 'upcoming',
    is_online: false,
    description: 'Learn about mobile-first design and user experience'
  },
  {
    id: '5',
    title: 'Midterm Examination',
    type: 'exam',
    course_name: 'Data Science Basics',
    date: '2024-01-18',
    start_time: '09:00',
    end_time: '11:00',
    location: 'Exam Hall 1',
    status: 'upcoming',
    is_online: false,
    description: 'Comprehensive exam covering weeks 1-6'
  }
];

export default function ScheduleManagement() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('today');
  const [scheduleEvents] = useState(mockScheduleData);

  const today = new Date().toISOString().split('T')[0];
  
  const todayEvents = scheduleEvents.filter(event => event.date === today);
  const upcomingEvents = scheduleEvents.filter(event => new Date(event.date) > new Date(today));
  const thisWeekEvents = scheduleEvents.filter(event => {
    const eventDate = new Date(event.date);
    const weekStart = new Date();
    const weekEnd = new Date();
    weekEnd.setDate(weekStart.getDate() + 7);
    return eventDate >= weekStart && eventDate <= weekEnd;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'default';
      case 'assignment': return 'secondary';
      case 'exam': return 'destructive';
      case 'meeting': return 'outline';
      case 'workshop': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return <BookOpen className="h-4 w-4" />;
      case 'assignment': return <FileText className="h-4 w-4" />;
      case 'exam': return <Award className="h-4 w-4" />;
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'workshop': return <Settings className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-primary';
      case 'ongoing': return 'text-success';
      case 'completed': return 'text-muted-foreground';
      case 'cancelled': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const EventCard = ({ event }: { event: ScheduleEvent }) => (
    <Card className="card-hover">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant={getTypeColor(event.type)} className="gap-1 text-xs">
                {getTypeIcon(event.type)}
                <span className="hidden sm:inline">{event.type}</span>
              </Badge>
              <Badge variant="outline" className={`text-xs ${getStatusColor(event.status)}`}>
                {event.status}
              </Badge>
              {event.is_online && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <Video className="h-3 w-3" />
                  <span className="hidden sm:inline">Online</span>
                </Badge>
              )}
            </div>
            <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base line-clamp-2">{event.title}</h4>
            {event.course_name && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{event.course_name}</p>
            )}
            {event.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
            )}
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(event.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.start_time} - {event.end_time}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1 line-clamp-1">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{event.location}</span>
              </span>
              {event.attendees && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {event.attendees} attendees
                </span>
              )}
            </div>

            {event.instructor && (
              <div className="flex items-center gap-1 text-xs">
                <span className="truncate">Instructor: {event.instructor}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
            {event.meeting_link && (
              <Button size="sm" variant="outline" className="gap-1 flex-1 sm:flex-none text-xs">
                <Video className="h-3 w-3" />
                Join
              </Button>
            )}
            <Button size="sm" variant="outline" className="gap-1 flex-1 sm:flex-none text-xs">
              <Bell className="h-3 w-3" />
              Remind
            </Button>
            <Button size="sm" variant="outline" className="flex-1 sm:flex-none text-xs">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your classes, assignments, and academic events
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="default" className="gap-2 w-full sm:w-auto text-sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="default" className="gap-2 w-full sm:w-auto text-sm">
            <RefreshCw className="h-4 w-4" />
            Sync
          </Button>
          <Button size="default" className="gap-2 w-full sm:w-auto text-sm">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Events
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{todayEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Week
            </CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{thisWeekEvents.length}</div>
            <p className="text-xs text-success mt-1">Events planned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Online Classes
            </CardTitle>
            <Video className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {scheduleEvents.filter(e => e.is_online).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Virtual events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Exams
            </CardTitle>
            <Award className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {scheduleEvents.filter(e => e.type === 'exam').length}
            </div>
            <p className="text-xs text-warning mt-1">Prepare well</p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {todayEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {todayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No events today</h3>
                <p className="text-muted-foreground">Take a break or catch up on assignments!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="week" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {thisWeekEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
