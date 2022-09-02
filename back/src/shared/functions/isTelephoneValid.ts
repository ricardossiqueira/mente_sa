import { AppError } from "../../errors/AppError";

function isTelephoneValid(email: string): void {
  const validTelephone = email.match(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
  );

  if (!validTelephone) throw new AppError("Telefone inválido", 422);
}

export { isTelephoneValid };
