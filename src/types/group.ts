export interface Group {
  id: string;
  name: string;
  description: string;
  course_id: string;
  course_name: string;
  college_id: string;
  created_by: string;
  created_by_name: string;
  created_at: string;
  members: GroupMember[];
  assignments: GroupAssignment[];
  status: 'active' | 'inactive';
  max_members: number;
}

export interface GroupMember {
  user_id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'leader' | 'member';
  joined_at: string;
  status: 'active' | 'inactive';
}

export interface GroupAssignment {
  id: string;
  assignment_id: string;
  title: string;
  due_date: string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'graded';
  submission?: GroupSubmission;
}

export interface GroupSubmission {
  id: string;
  submitted_by: string;
  submitted_at: string;
  content: string;
  attachments: string[];
  grade?: number;
  feedback?: string;
  graded_by?: string;
  graded_at?: string;
}

export interface GroupChat {
  id: string;
  group_id: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'link';
  attachments?: string[];
}