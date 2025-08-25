import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  MessageCircle,
  FileText,
  Calendar,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Crown,
  Activity,
  Clock
} from 'lucide-react';
import { mockGroups } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function GroupsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState(mockGroups);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const groupStats = {
    total: groups.length,
    active: groups.filter(g => g.status === 'active').length,
    totalMembers: groups.reduce((sum, g) => sum + g.members.length, 0),
    averageMembers: Math.round(groups.reduce((sum, g) => sum + g.members.length, 0) / groups.length)
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Groups Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage student collaboration groups
          </p>
        </div>
        <Button size="lg" className="gap-2 w-full sm:w-auto">
          <Plus className="h-5 w-5" />
          Create Group
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Groups
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{groupStats.total}</div>
            <p className="text-xs text-success mt-1">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Groups
            </CardTitle>
            <Activity className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{groupStats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round((groupStats.active / groupStats.total) * 100)}% active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Members
            </CardTitle>
            <UserPlus className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{groupStats.totalMembers}</div>
            <p className="text-xs text-success mt-1">+12 new members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Group Size
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{groupStats.averageMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">members per group</p>
          </CardContent>
        </Card>
      </div>

      {/* Groups List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>All Groups</CardTitle>
              <CardDescription>Manage student collaboration groups and activities</CardDescription>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="card-hover">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getStatusColor(group.status)}>
                          {group.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {group.course_name}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-1">{group.name}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-2">
                        {group.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end" 
                        className="bg-popover border border-border shadow-lg z-50"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Group
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Group
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Group Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add Members
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Group
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Group Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <Users className="h-6 w-6 mx-auto mb-1 text-primary" />
                      <div className="text-lg font-semibold">{group.members.length}/{group.max_members}</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <FileText className="h-6 w-6 mx-auto mb-1 text-primary" />
                      <div className="text-lg font-semibold">{group.assignments.length}</div>
                      <div className="text-xs text-muted-foreground">Assignments</div>
                    </div>
                  </div>

                  {/* Members Preview */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Members</div>
                    <div className="space-y-2">
                      {group.members.slice(0, 3).map((member) => (
                        <div key={member.user_id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground truncate flex-1">
                            {member.name}
                          </span>
                          {member.role === 'leader' && (
                            <Crown className="h-3 w-3 text-warning" />
                          )}
                        </div>
                      ))}
                      {group.members.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{group.members.length - 3} more members
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Group Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created by</span>
                      <span className="font-medium">{group.created_by_name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-medium">
                        {new Date(group.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link to={`/groups/${group.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Link to={`/groups/${group.id}/chat`} className="flex-1">
                      <Button size="sm" className="w-full gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Chat
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create New Group Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            <Card className="border-dashed border-2 card-hover cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full py-12">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Create New Group</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Start a new collaboration group for your students
                </p>
                <Button className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Create Group
                </Button>
              </CardContent>
            </Card>
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No groups found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Start by creating your first collaboration group'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}