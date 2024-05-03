import { SHA256 as sha256 } from "crypto-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TClient } from "./types";

export const defaultClient: TClient = {
  name: "",
  email: "",
  phoneNumber: "",
  company: "",
  address: {
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashText = (string: any): string => {
  return sha256(string).toString();
};

export function exclude(object: any, keys: string[]) {
  for (let key of keys) {
    delete object[key];
  }
  return object;
}
