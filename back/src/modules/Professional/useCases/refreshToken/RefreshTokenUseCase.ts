import dayjs from "dayjs";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import ms from "ms";
import { inject, injectable } from "tsyringe";

import { IProfessionalTokensRepository } from "../../repositories/IProfessionalTokensRepository";
import { auth } from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";

type PayloadType = {
  email: string;
  sub: string;
};

type ResponseType = {
  token: string;
  refreshToken: string;
};

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("ProfessionalTokensRepository")
    private repository: IProfessionalTokensRepository
  ) {}

  async execute(refreshToken: string): Promise<ResponseType> {
    // check if the given refreshToken is valid
    const { email: professionalEmail, sub: professionalId } = verify(
      refreshToken,
      auth.refreshToken.secret
    ) as PayloadType;

    // check if the given token belongs to the given professional
    const professionalToken = await this.repository.findByIdAndRefreshToken(
      professionalId,
      refreshToken
    );

    // if not found on that professional throw an error
    if (!professionalToken) throw new AppError("Refresh token não encontrado");

    // delete the given token from the database
    await this.repository.deleteById(professionalToken.id);

    // create a new token for the given professional
    const newRefreshToken = sign({ professionalEmail }, auth.token.secret, {
      subject: professionalId,
      expiresIn: auth.refreshToken.expiresIn,
    });

    const expiresAt = dayjs()
      .add(ms(auth.refreshToken.expiresIn), "milliseconds")
      .toDate();

    await this.repository.create({
      refreshToken: newRefreshToken,
      expiresAt,
      professionalId,
    });

    const newToken = sign({}, auth.token.secret, { subject: professionalId });

    return { token: newToken, refreshToken: newRefreshToken };
  }
}

export { RefreshTokenUseCase };
