import { ICreateSessionDTO } from "../dto/ICreateSessionDTO";

interface ISessionRepository {
  create(data: ICreateSessionDTO): Promise<void>;
}

export { ISessionRepository };
