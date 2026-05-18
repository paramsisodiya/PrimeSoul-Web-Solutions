import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const easeOutQuart = [0.25, 1, 0.5, 1] as const
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const
