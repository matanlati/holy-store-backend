import { DateTime, Str } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export const Task = z.object({
	name: Str({ example: "lorem" }),
	slug: Str(),
	description: Str({ required: false }),
	completed: z.boolean().default(false),
	due_date: DateTime(),
});

export interface Item {
  id: number;
  title: string;
  brand?: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sku?: string;
  isInStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}


