import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();
}

export function getFirstName(fullName: string) {
  return fullName.split(" ")[0];
}

export function getFormattedTime(timestamp: string) {
  const messageDate = new Date(timestamp);
  const now = new Date();

  const diffInMinutes = (now.getTime() - messageDate.getTime()) / (1000 * 60);

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 1440) {
    return format(messageDate, "hh:mm a");
  } else if (diffInMinutes < 10080) {
    return format(messageDate, "eeee");
  } else {
    return format(messageDate, "MM/dd/yy");
  }
}
