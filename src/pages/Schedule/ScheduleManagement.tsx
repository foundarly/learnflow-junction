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
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getTypeColor(event.type)} className="gap-1 text-xs">
                {getTypeIcon(event.type)}
                {event.type}
              </Badge>
              <Badge variant="outline" className={`text-xs ${getStatusColor(event.status)}`}>
                {event.status}
              </Badge>
              {event.is_online && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <Video className="h-3 w-3" />
                  Online
                </Badge>
              )}
            </div>
            <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
            {event.course_name && (
              <p className="text-sm text-muted-foreground mb-2">{event.course_name}</p>
            )}
            {event.description && (
              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {event.start_time} - {event.end_time}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </span>
            {event.attendees && (
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.attendees} attendees
              </span>
            )}
          </div>

          {event.instructor && (
            <div className="flex items-center gap-1">
              <span>Instructor: {event.instructor}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-border">
          {event.meeting_link && (
            <Button size="sm" variant="outline" className="gap-2">
              <Video className="h-4 w-4" />
              Join
            </Button>
          )}
          <Button size="sm" variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Remind
          </Button>
          <Button size="sm" variant="outline">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Manage your classes, assignments, and academic events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Export
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <RefreshCw className="h-5 w-5" />
            Sync
          </Button>
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {thisWeekEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
