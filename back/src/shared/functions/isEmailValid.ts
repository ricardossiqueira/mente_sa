import { AppError } from "../../errors/AppError";

function isEmailValid(email: string): void {
  const validEmail = email.match(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );

  if (!validEmail) throw new AppError("Email inválido", 422);
}

export { isEmailValid };
