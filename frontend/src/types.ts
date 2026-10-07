export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Exercise {
  _id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
}
