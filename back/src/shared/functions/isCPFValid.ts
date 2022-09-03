import { AppError } from "../../errors/AppError";

function isCPFValid(email: string): void {
  const validEmail = email.match(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  );

  if (!validEmail) throw new AppError("CPF inválido", 422);
}

export { isCPFValid };
