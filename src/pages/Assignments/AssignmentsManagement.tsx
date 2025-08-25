import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Calendar,
  Users,
  Clock,
  Edit,
  Trash2,
  Eye,
  GraduationCap,
  Download,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockAssignments } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function AssignmentsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [assignments, setAssignments] = useState(mockAssignments);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesType = typeFilter === 'all' || assignment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-3 w-3" />;
      case 'draft': return <Edit className="h-3 w-3" />;
      case 'completed': return <GraduationCap className="h-3 w-3" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'group' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground';
  };

  const assignmentStats = {
    total: assignments.length,
    published: assignments.filter(a => a.status === 'published').length,
    draft: assignments.filter(a => a.status === 'draft').length,
    totalSubmissions: assignments.reduce((sum, a) => sum + a.submissions_count, 0)
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground mt-1">
            Create, manage, and track student assignments
          </p>
        </div>
        <Button size="lg" className="gap-2 w-full sm:w-auto">
          <Plus className="h-5 w-5" />
          Create Assignment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Assignments
            </CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{assignmentStats.total}</div>
            <p className="text-xs text-success mt-1">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{assignmentStats.published}</div>
            <p className="text-xs text-muted-foreground mt-1">Active assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Draft Assignments
            </CardTitle>
            <Edit className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{assignmentStats.draft}</div>
            <p className="text-xs text-warning mt-1">Need to publish</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Submissions
            </CardTitle>
            <Upload className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{assignmentStats.totalSubmissions}</div>
            <p className="text-xs text-success mt-1">+8 today</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <CardTitle>All Assignments</CardTitle>
              <CardDescription>Manage assignment creation and track submissions</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="p-6 rounded-lg border hover:shadow-md transition-all">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                  {/* Assignment Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                          <div className="flex gap-2">
                            <Badge variant={getStatusColor(assignment.status)} className="gap-1">
                              {getStatusIcon(assignment.status)}
                              {assignment.status}
                            </Badge>
                            <Badge className={getTypeColor(assignment.type)}>
                              {assignment.type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {assignment.description}
                        </p>
                      </div>
                    </div>

                    {/* Assignment Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Due Date</div>
                          <div className="text-muted-foreground">
                            {new Date(assignment.due_date).toLocaleDateString()}
                          </div>
                          {getDaysUntilDue(assignment.due_date) >= 0 && (
                            <div className={`text-xs ${getDaysUntilDue(assignment.due_date) <= 3 ? 'text-warning' : 'text-muted-foreground'}`}>
                              {getDaysUntilDue(assignment.due_date) === 0 ? 'Due today' : 
                               getDaysUntilDue(assignment.due_date) === 1 ? 'Due tomorrow' :
                               `${getDaysUntilDue(assignment.due_date)} days left`}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Submissions</div>
                          <div className="text-muted-foreground">{assignment.submissions_count}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Points</div>
                          <div className="text-muted-foreground">{assignment.points} pts</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Type</div>
                          <div className="text-muted-foreground capitalize">
                            {assignment.submission_type}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar for Submissions */}
                    {assignment.status === 'published' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Submission Progress</span>
                          <span className="font-medium">
                            {assignment.submissions_count}/30 students
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full">
                          <div 
                            className="h-2 bg-gradient-primary rounded-full transition-all"
                            style={{ width: `${Math.min((assignment.submissions_count / 30) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link to={`/assignments/${assignment.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                    </Link>
                    <Link to={`/assignments/${assignment.id}/submissions`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Submissions</span>
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end" 
                        className="bg-popover border border-border shadow-lg z-50"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Assignment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Users className="mr-2 h-4 w-4" />
                          View Submissions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Export Results
                        </DropdownMenuItem>
                        {assignment.status === 'draft' && (
                          <DropdownMenuItem className="cursor-pointer">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Publish Assignment
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Assignment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No assignments found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your search or filters' 
                  : 'Start by creating your first assignment'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}