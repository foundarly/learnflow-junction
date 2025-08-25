import { User, College } from '@/types/auth';
import { Course, CourseWeek, Assignment } from '@/types/course';
import { Group } from '@/types/group';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'super@admin.com',
    name: 'System Administrator',
    role: 'super_admin',
    phone: '+1234567890',
    join_date: '2023-01-01',
    status: 'active',
    permissions: ['manage_colleges', 'manage_users', 'view_analytics']
  },
  {
    id: '2',
    email: 'admin@techuni.edu',
    name: 'John Smith',
    role: 'admin',
    college_id: 'college-1',
    college_name: 'Tech University',
    department: 'Administration',
    phone: '+1234567891',
    join_date: '2023-01-15',
    status: 'active',
    permissions: ['manage_courses', 'manage_users', 'view_college_analytics']
  },
  {
    id: '3',
    email: 'sarah.trainer@techuni.edu',
    name: 'Sarah Johnson',
    role: 'trainer',
    college_id: 'college-1',
    college_name: 'Tech University',
    department: 'Computer Science',
    phone: '+1234567892',
    join_date: '2023-02-01',
    status: 'active',
    permissions: ['manage_content', 'grade_assignments', 'track_attendance']
  },
  {
    id: '4',
    email: 'mike.staff@techuni.edu',
    name: 'Mike Williams',
    role: 'staff',
    college_id: 'college-1',
    college_name: 'Tech University',
    department: 'Student Services',
    phone: '+1234567893',
    join_date: '2023-02-15',
    status: 'active',
    permissions: ['manage_groups', 'coordinate_activities']
  },
  {
    id: '5',
    email: 'alice.student@techuni.edu',
    name: 'Alice Brown',
    role: 'student',
    college_id: 'college-1',
    college_name: 'Tech University',
    department: 'Computer Science',
    phone: '+1234567894',
    join_date: '2024-01-01',
    status: 'active',
    permissions: ['view_courses', 'submit_assignments', 'join_groups']
  }
];

// Mock Colleges
export const mockColleges: College[] = [
  {
    id: 'college-1',
    name: 'Tech University',
    address: '123 Education St, Tech City, TC 12345',
    contact_email: 'contact@techuni.edu',
    contact_phone: '+1234567800',
    admin_id: '2',
    status: 'active',
    created_at: '2023-01-01',
    courses_count: 8,
    students_count: 156
  },
  {
    id: 'college-2',
    name: 'Digital Skills Institute',
    address: '456 Learning Ave, Digital Town, DT 67890',
    contact_email: 'info@dsi.edu',
    contact_phone: '+1234567801',
    admin_id: '6',
    status: 'active',
    created_at: '2023-06-01',
    courses_count: 5,
    students_count: 89
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Full Stack Web Development',
    description: 'Complete course covering frontend and backend development with modern technologies.',
    thumbnail: '/api/placeholder/400/250',
    duration_weeks: 12,
    college_id: 'college-1',
    college_name: 'Tech University',
    trainer_id: '3',
    trainer_name: 'Sarah Johnson',
    status: 'active',
    start_date: '2024-01-15',
    end_date: '2024-04-07',
    created_at: '2023-12-01',
    enrolled_students: 24,
    max_students: 30,
    tags: ['JavaScript', 'React', 'Node.js', 'Database'],
    weeks: []
  },
  {
    id: 'course-2',
    title: 'Data Science Fundamentals',
    description: 'Introduction to data analysis, visualization, and machine learning concepts.',
    thumbnail: '/api/placeholder/400/250',
    duration_weeks: 10,
    college_id: 'college-1',
    college_name: 'Tech University',
    trainer_id: '3',
    trainer_name: 'Sarah Johnson',
    status: 'active',
    start_date: '2024-02-01',
    end_date: '2024-04-11',
    created_at: '2023-12-15',
    enrolled_students: 18,
    max_students: 25,
    tags: ['Python', 'Pandas', 'Machine Learning', 'Visualization'],
    weeks: []
  }
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'React Portfolio Website',
    description: 'Create a personal portfolio website using React and modern CSS techniques.',
    type: 'individual',
    due_date: '2024-03-15',
    points: 100,
    status: 'published',
    attachments: [],
    submission_type: 'link',
    created_at: '2024-02-15',
    submissions_count: 18
  },
  {
    id: 'assignment-2',
    title: 'Group Project: E-commerce Platform',
    description: 'Build a complete e-commerce platform with your team including frontend and backend.',
    type: 'group',
    due_date: '2024-04-01',
    points: 200,
    status: 'published',
    attachments: [],
    submission_type: 'file',
    created_at: '2024-02-20',
    submissions_count: 6
  }
];

// Mock Groups
export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Web Dev Warriors',
    description: 'Focused on building amazing web applications',
    course_id: 'course-1',
    course_name: 'Full Stack Web Development',
    college_id: 'college-1',
    created_by: '4',
    created_by_name: 'Mike Williams',
    created_at: '2024-01-20',
    members: [
      {
        user_id: '5',
        name: 'Alice Brown',
        email: 'alice.student@techuni.edu',
        role: 'leader',
        joined_at: '2024-01-20',
        status: 'active'
      }
    ],
    assignments: [],
    status: 'active',
    max_members: 5
  }
];

// Calendar Events
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'class' | 'assignment' | 'exam' | 'meeting';
  course_id?: string;
  course_name?: string;
  meeting_link?: string;
  description: string;
  status: 'upcoming' | 'completed' | 'live';
}

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'React Fundamentals Live Session',
    date: '2024-03-10',
    time: '10:00 AM',
    type: 'class',
    course_id: 'course-1',
    course_name: 'Full Stack Web Development',
    meeting_link: 'https://meet.google.com/xyz-abc-def',
    description: 'Introduction to React components and hooks',
    status: 'upcoming'
  },
  {
    id: 'event-2',
    title: 'Portfolio Assignment Due',
    date: '2024-03-15',
    time: '11:59 PM',
    type: 'assignment',
    course_id: 'course-1',
    course_name: 'Full Stack Web Development',
    description: 'Submit your React portfolio website',
    status: 'upcoming'
  },
  {
    id: 'event-3',
    title: 'Data Analysis Workshop',
    date: '2024-03-12',
    time: '2:00 PM',
    type: 'class',
    course_id: 'course-2',
    course_name: 'Data Science Fundamentals',
    meeting_link: 'https://meet.google.com/abc-def-ghi',
    description: 'Hands-on data analysis with Python and Pandas',
    status: 'upcoming'
  }
];

// Analytics Data
export interface AnalyticsData {
  totalUsers: number;
  totalColleges: number;
  totalCourses: number;
  totalStudents: number;
  activeUsers: number;
  coursesCompleted: number;
  userGrowth: { month: string; users: number }[];
  courseEnrollments: { course: string; enrollments: number }[];
}

export const mockAnalytics: AnalyticsData = {
  totalUsers: 1247,
  totalColleges: 12,
  totalCourses: 48,
  totalStudents: 892,
  activeUsers: 734,
  coursesCompleted: 156,
  userGrowth: [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 250 },
    { month: 'Apr', users: 340 },
    { month: 'May', users: 420 },
    { month: 'Jun', users: 520 }
  ],
  courseEnrollments: [
    { course: 'Web Development', enrollments: 245 },
    { course: 'Data Science', enrollments: 189 },
    { course: 'Mobile Apps', enrollments: 156 },
    { course: 'UI/UX Design', enrollments: 134 },
    { course: 'Cybersecurity', enrollments: 98 }
  ]
};