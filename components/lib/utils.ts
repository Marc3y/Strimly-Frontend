import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { create } from "zustand";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useStore = create((set:any) => ({
  userData: undefined,
  setUserData: (data:any) => set({userData: data}),
}));