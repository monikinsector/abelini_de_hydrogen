import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — safely merge Tailwind class names
 * - handles conditional classes
 * - removes conflicting Tailwind utilities
 * - fully TypeScript-safe
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
