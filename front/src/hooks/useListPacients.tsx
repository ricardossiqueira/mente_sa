import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { api } from "../services/api";

interface IListPacientDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  gender: string;
}

async function getPacients(): Promise<AxiosResponse<IListPacientDTO[], any>> {
  return await api.get("/pacient");
}

function useListPacients() {
  return useQuery("pacients", async () => getPacients(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export { useListPacients };
export type { IListPacientDTO };
