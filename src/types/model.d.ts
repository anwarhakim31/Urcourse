export interface Course {
  id?: string;
  title: string;
  category?: Category;
  categoryId?: string | null;
  description?: string | null;
  image?: string | null;
  level?: string | null;
  price?: number | null;
  curriculum?: {
    id?: string;
    module: Module[];
    exercise: Exercise[];
  };
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
  resource?: Resource[];
}

export interface Exercise {
  id?: string;
  isPublished?: boolean;
  title?: string;
  description?: string;
  position?: number;
  video?: string;
  isFree?: boolean;
  resource?: Resource[];
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
}

export interface Transaction {
  id: string;
  purchaseId: string;
  paymentMethod: string;
  paymentName: string;
  xenditCode: string;
  expired: Date;
  amount: number;
  invoice?: string;
  status: string;
  purchase?: Purchase;
  createdAt?: Date;
}
