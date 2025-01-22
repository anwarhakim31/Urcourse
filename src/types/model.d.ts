export interface User {
  id?: string;
  fullname?: string;
  email?: string;
  phone?: string;
  photo?: string;
}

export interface Course {
  id?: string;
  title: string;
  category?: Category;
  categoryId?: string | null;
  description?: string | null;
  image?: string | null;
  level?: string | null;
  price?: number | null;
  certificate?: boolean;
  curriculum?: {
    id?: string;
    module: Module[];
    exercise: Exercise[];
  };

  averageRating?: number | null;
  ratingCount?: number | null;

  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  firstList?: {
    id: string;
  };
}

export interface Module {
  id?: string;
  isPublished?: boolean;
  title?: string;
  description?: string;
  position?: number;
  video?: string;
  isFree?: boolean;
  resourse?: Resource[];
  proggress?: Proggress[];
}

export interface Exercise {
  id?: string;
  isPublished?: boolean;
  title?: string;
  duration?: string;
  description?: string;
  position?: number;
  image?: string | null;
  isFree?: boolean;
  resourse?: Resource[];
  proggress?: Proggress[];
  questions?: Question[];
}

export interface ExerciseResult {
  id?: string;
  exerciseId?: string;
  isPassed?: boolean;
  score?: number;
}

export interface Question {
  id?: string;
  text?: string;
  position?: number;
  exerciseId?: string;
  exercise?: Exercise;
  image?: string;
  answers?: Answer[];
}

export interface Answer {
  id?: string;
  text?: string;
  isCorrect?: boolean;
  questionId?: string;
  question?: Question;
}

export interface Proggress {
  id?: string;
  userId?: string;
  moduleId?: string | null;
  exerciseId?: string | null;
}

export interface Resource {
  id?: string;
  name?: string;
  file?: string;
}

export interface Category {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Purchase {
  id?: string;
  userId?: string;
  courseId?: string;
  status?: string;
  price?: number;
  course?: Course;
  user?: User;
}

export interface Transaction {
  id: string;
  purchaseId: string;
  paymentMethod: string;
  paymentName: string;
  paymentCode: string;
  expired: Date;
  amount: number;
  invoice?: string;
  status: string;
  purchase?: Purchase;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Reviews {
  id?: string;
  userId?: string;
  courseId?: string;
  rating?: number;
  comment?: string;
  course?: Course;
  user?: User;
}
