import { inject, injectable } from "tsyringe";

import { ICreateSessionDTO } from "../../dto/ICreateSessionDTO";
import { ISessionRepository } from "../../repositories/ISessionRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateSessionUseCase {
  constructor(
    @inject("SessionRepository")
    private repository: ISessionRepository
  ) {}

  private isDurationValid(duration: number): void {
    if (duration < 0 || duration > 90) throw new AppError("Duração inválida");
  }

  async execute(data: ICreateSessionDTO): Promise<void> {
    const { duration } = data;

    this.isDurationValid(duration);

    await this.repository.create(data);
  }
}

export { CreateSessionUseCase };
