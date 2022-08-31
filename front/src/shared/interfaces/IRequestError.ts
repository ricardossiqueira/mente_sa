import { AxiosError } from "axios";

interface IRequestError extends AxiosError<{ message: string }> {}

export type { IRequestError };
