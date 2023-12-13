import { toast } from "react-toastify";
import { JWT } from "./constants";

export function successToast(message: string) {
  toast.success(message);
  return null;
}


export function errorToast(message: string) {
  toast.error(message);
  return null;
}

export function getJWTFromLocalStorage() {
  return localStorage.getItem(`${JWT}`);
}