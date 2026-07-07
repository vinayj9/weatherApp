import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// type GeolocationPosition = {
//   lat: number;
//   lon: number;
// };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// // Get current user geolocation
// export const getUserLocation = (): Promise<GeolocationPosition> => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("Geolocation is not supported by this browser."));
//     } else {
//       navigator.geolocation.getCurrentPosition((position) => {
//         resolve({
//           lat: position.coords.latitude,
//           lon: position.coords.longitude,
//         });
//       }, (error) => {
//         reject(error);
//       });
//     }
//   });
// };