import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  UserCheck,
  UserX,
  Calendar,
  Search,
  Download,
  Filter,
  Clock,
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AttendanceRecord {
  id: string;
  student_name: string;
  student_id: string;
  course_name: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late';
  duration: string;
}

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: '1',
    student_name: 'Alice Johnson',
    student_id: 'STU001',
    course_name: 'Web Development Fundamentals',
    date: '2024-01-15',
    time: '09:00 AM',
    status: 'present',
    duration: '2h 30m'
  },
  {
    id: '2',
    student_name: 'Bob Smith',
    student_id: 'STU002',
    course_name: 'Web Development Fundamentals',
    date: '2024-01-15',
    time: '09:00 AM',
    status: 'late',
    duration: '2h 15m'
  },
  {
    id: '3',
    student_name: 'Carol Davis',
    student_id: 'STU003',
    course_name: 'Data Science Basics',
    date: '2024-01-15',
    time: '02:00 PM',
    status: 'absent',
    duration: '0h'
  },
  {
    id: '4',
    student_name: 'David Wilson',
    student_id: 'STU004',
    course_name: 'Mobile App Development',
    date: '2024-01-14',
    time: '10:00 AM',
    status: 'present',
    duration: '3h'
  }
];

export default function AttendanceTracking() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [attendanceRecords] = useState(mockAttendanceData);

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.course_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || record.course_name === courseFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'default';
      case 'late': return 'secondary';
      case 'absent': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <UserCheck className="h-3 w-3" />;
      case 'late': return <Clock className="h-3 w-3" />;
      case 'absent': return <UserX className="h-3 w-3" />;
      default: return null;
    }
  };

  const attendanceStats = {
    total: attendanceRecords.length,
    present: attendanceRecords.filter(r => r.status === 'present').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length
  };

  const presentPercentage = Math.round((attendanceStats.present / attendanceStats.total) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Attendance Tracking</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Monitor student attendance and participation across all courses
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="default" className="gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button size="default" className="gap-2 w-full sm:w-auto">
            <Calendar className="h-4 w-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sessions
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{attendanceStats.total}</div>
            <p className="text-xs text-success mt-1">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Present
            </CardTitle>
            <UserCheck className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{attendanceStats.present}</div>
            <p className="text-xs text-success mt-1">{presentPercentage}% attendance rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Late Arrivals
            </CardTitle>
            <Clock className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{attendanceStats.late}</div>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Absences
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{attendanceStats.absent}</div>
            <p className="text-xs text-destructive mt-1">Follow up required</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-base sm:text-lg">Attendance Records</CardTitle>
                <CardDescription className="text-sm">Track and manage student attendance</CardDescription>
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students or courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="All Courses" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border shadow-lg z-50">
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="Web Development Fundamentals">Web Development</SelectItem>
                      <SelectItem value="Data Science Basics">Data Science</SelectItem>
                      <SelectItem value="Mobile App Development">Mobile Development</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border shadow-lg z-50">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="p-3 sm:p-4 rounded-lg border hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">{record.student_name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {record.student_id}
                      </Badge>
                      <Badge variant={getStatusColor(record.status)} className="gap-1 text-xs">
                        {getStatusIcon(record.status)}
                        {record.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{record.course_name}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {record.time}
                      </span>
                      <span className="hidden sm:inline">Duration: {record.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No attendance records found</h3>
              <p className="text-muted-foreground">
                {searchTerm || courseFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters' 
                  : 'Start by marking attendance for your classes'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}