export interface Course {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  price: number | null;
  isPublished: boolean;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
