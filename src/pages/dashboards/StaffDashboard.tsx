import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  UserPlus, 
  Plus,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { mockGroups, mockCalendarEvents } from '@/data/mockData';
import { Link } from 'react-router-dom';

export function StaffDashboard() {
  const staffStats = {
    activeGroups: 8,
    totalStudents: 45,
    upcomingEvents: 6,
    collaborationRate: 92
  };

  const stats = [
    {
      title: 'Active Groups',
      value: staffStats.activeGroups,
      icon: Users,
      change: '+2 this week',
      changeType: 'positive' as const
    },
    {
      title: 'Students Managed',
      value: staffStats.totalStudents,
      icon: UserPlus,
      change: '100% engaged',
      changeType: 'positive' as const
    },
    {
      title: 'Upcoming Events',
      value: staffStats.upcomingEvents,
      icon: Calendar,
      change: '3 today',
      changeType: 'neutral' as const
    },
    {
      title: 'Collaboration Rate',
      value: `${staffStats.collaborationRate}%`,
      icon: BarChart3,
      change: '+7% improvement',
      changeType: 'positive' as const
    }
  ];

  const activeGroups = mockGroups.slice(0, 3);
  const upcomingEvents = mockCalendarEvents.filter(event => 
    event.type === 'meeting' || event.type === 'assignment'
  ).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Coordination</h1>
          <p className="text-muted-foreground mt-1">
            Facilitate student collaboration, manage groups, and coordinate activities
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/events/new">
            <Button variant="outline" size="lg" className="gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Event
            </Button>
          </Link>
        <Link to="/dashboard/groups/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Create Group
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
                    stat.changeType === 'positive' ? 'text-success' : 'text-muted-foreground'
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
        {/* Active Groups */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Groups</CardTitle>
                <CardDescription>Student collaboration groups you're managing</CardDescription>
              </div>
              <Link to="/dashboard/groups">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeGroups.map((group) => (
              <div key={group.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{group.name}</h4>
                    <p className="text-sm text-muted-foreground">{group.course_name}</p>
                  </div>
                  <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                    {group.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{group.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {group.members.length}/{group.max_members} members
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      {group.assignments.length} assignments
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/groups/${group.id}/chat`}>
                      <Button size="sm" variant="outline" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </Button>
                    </Link>
                    <Link to={`/dashboard/groups/${group.id}/manage`}>
                      <Button size="sm">
                        Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            <Link to="/dashboard/groups/new">
              <Button variant="outline" className="w-full h-16 border-dashed">
                <Plus className="mr-2 h-5 w-5" />
                Create New Group
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your coordination activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {event.type === 'meeting' ? (
                    <Users className="h-5 w-5 text-primary" />
                  ) : (
                    <Clock className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {event.time}
                  </div>
                  <Badge 
                    variant={event.status === 'upcoming' ? 'default' : 'secondary'} 
                    className="mt-1 text-xs"
                  >
                    {event.status}
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

      {/* Activities and Student Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Student engagement and group updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Group Assignment Completed</div>
                <div className="text-xs text-muted-foreground">
                  Web Dev Warriors finished their e-commerce project
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">New Group Member</div>
                <div className="text-xs text-muted-foreground">
                  Sarah joined Data Science Explorers
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Group Needs Attention</div>
                <div className="text-xs text-muted-foreground">
                  Mobile App Team has low participation
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collaboration Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Collaboration Metrics</CardTitle>
            <CardDescription>Group performance and engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-success/10">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">15</div>
                <div className="text-sm text-muted-foreground">Completed Projects</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">342</div>
                <div className="text-sm text-muted-foreground">Messages Today</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Group Participation</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-gradient-primary rounded-full w-[92%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Assignment Completion</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-gradient-success rounded-full w-[87%]"></div>
                </div>
              </div>
            </div>

            <Link to="/dashboard/analytics/collaboration">
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Metrics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}