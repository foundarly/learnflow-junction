export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration_weeks: number;
  college_id: string;
  college_name: string;
  trainer_id: string;
  trainer_name: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  start_date: string;
  end_date: string;
  created_at: string;
  enrolled_students: number;
  max_students: number;
  tags: string[];
  weeks: CourseWeek[];
}

export interface CourseWeek {
  week_number: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  days: CourseDay[];
  assignments: Assignment[];
}

export interface CourseDay {
  day_number: number;
  date: string;
  title: string;
  description: string;
  resources: Resource[];
  live_session?: LiveSession;
  activities: Activity[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document' | 'image';
  url: string;
  file_size?: number;
  duration?: number;
  description?: string;
  uploaded_by: string;
  uploaded_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'group';
  due_date: string;
  points: number;
  status: 'draft' | 'published' | 'completed';
  attachments: Resource[];
  submission_type: 'file' | 'text' | 'link';
  created_at: string;
  submissions_count: number;
}

export interface LiveSession {
  id: string;
  title: string;
  scheduled_time: string;
  duration_minutes: number;
  meeting_link?: string;
  recording_link?: string;
  status: 'scheduled' | 'live' | 'completed';
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'discussion' | 'project' | 'reading';
  estimated_duration: number;
  status: 'available' | 'completed' | 'locked';
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  progress_percentage: number;
  status: 'active' | 'completed' | 'dropped';
  last_activity_at: string;
}