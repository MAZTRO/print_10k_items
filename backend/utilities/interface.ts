import { Response } from 'express'

export interface RandomUser {
  id: number;
  name: string;
  age: number;
  description: string;
  image: string; // Placeholder for now
  abilities: string[];
}

export interface SuccessData {
  response: Response
  data: string | RandomUser[]
  status: number
  details: string
}