import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import ms from "ms";
import dayjs from "dayjs";

import { auth } from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IProfessionalRepository } from "../../repositories/IProfessionalRepository";
import { IProfessionalTokensRepository } from "../../repositories/IProfessionalTokensRepository";

type RequestType = {
  email: string;
  password: string;
};

type ResponseType = {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
};

@injectable()
class AuthProfessionalUseCase {
  constructor(
    @inject("ProfessionalRepository")
    private repository: IProfessionalRepository,
    @inject("ProfessionalTokensRepository")
    private tokensRepository: IProfessionalTokensRepository
  ) {}

  async execute({ email, password }: RequestType): Promise<ResponseType> {
    const professional = await this.repository.findByEmail(email);

    if (!professional) throw new AppError("Email ou senha incorreto", 404);

    const passwordMatch = await compare(password, professional.password);

    if (!passwordMatch) throw new AppError("Email ou senha incorreto", 404);

    const token = sign({}, auth.token.secret, {
      subject: professional.id,
      expiresIn: auth.token.expiresIn,
    });

    const refreshToken = sign(
      { email: professional.email },
      auth.token.secret,
      {
        subject: professional.id,
        expiresIn: auth.refreshToken.expiresIn,
      }
    );

    const expiresAt = dayjs()
      .add(ms(auth.refreshToken.expiresIn), "milliseconds")
      .toDate();

    await this.tokensRepository.create({
      professionalId: professional.id,
      refreshToken,
      expiresAt,
    });

    return {
      name: professional.name,
      email: professional.email,
      token,
      refreshToken,
    };
  }
}

export { AuthProfessionalUseCase };
