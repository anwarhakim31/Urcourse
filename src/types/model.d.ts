export interface Course {
  id?: string;
  title: string;
  categoryId?: string | null;
  description?: string | null;
  image?: string | null;
  level?: string | null;
  price?: number | null;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
