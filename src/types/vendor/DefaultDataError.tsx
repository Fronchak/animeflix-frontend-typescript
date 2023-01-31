import { FieldError } from "./FieldError";

export type DefaultDataError = {
  error: string;
  message: string;
  errors?: FieldError[];
}
