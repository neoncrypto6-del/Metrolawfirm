export interface TeamMember {
  id: string;
  name: string;
  title: string;
  email: string | null;
  phone: string | null;
  photo_url: string | null;
  bio: string | null;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at?: string;
}

export interface Service {
  slug: string;
  title: string;
  iconName: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string[];
  processSteps: {title: string;description: string;}[];
  keyPoints: string[];
  ctaText: string;
}