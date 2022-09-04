import {
  Button,
  VStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Center,
  toast,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiAddCircleFill } from "react-icons/ri";
import * as yup from "yup";
import dayjs from "dayjs";

import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { QueryObserverResult, useMutation } from "react-query";
import { api } from "../../services/api";
import { IRequestError } from "../../shared/interfaces/IRequestError";
import { AxiosResponse } from "axios";
import { IListPacientDTO } from "../../hooks/useListPacients";

type CreatePacientDTO = {
  name: string;
  email: string;
  cpf: string;
  gender: string;
  birthDate: Date;
  telephone: string;
  address: string;
};

const yupNewPacientFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome do paciente é obrigatório")
    .min(5, "Mínimo de 5 caracteres"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  cpf: yup
    .string()
    .required("CPF do paciente é obrigatório")
    .matches(
      /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
      "CPF inválido"
    ),
  birthDate: yup
    .date()
    .required("Data de nascimento do paciente é obrigatória"),
  telephone: yup
    .string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Telefone inválido"
    )
    .required("Telefone do paciente é obrigatório"),
  address: yup
    .string()
    .required("Endereço do paciente é obrigatório")
    .min(20, "Endereço muito curto"),
});

type NewPacientModalProps = {
  refetch: () => {};
};

export function NewPacientModal({ refetch }: NewPacientModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValidating },
  } = useForm({ resolver: yupResolver(yupNewPacientFormSchema) });

  const createPacient = useMutation(
    async (pacientData: CreatePacientDTO) => {
      return await api.post("/pacient", { ...pacientData });
    },
    {
      onSuccess: () => {
        toast({
          title: "Paciente cadastrado com sucesso",
          status: "success",
        });
        refetch();
        reset();
        onClose();
      },
      onError: (error: IRequestError) => {
        const { message } = error.response.data;
        toast({
          title: "Erro ao criar paciente",
          description: message,
          status: "error",
        });
      },
    }
  );

  const handleCreatePacient: SubmitHandler<CreatePacientDTO> = (values) => {
    createPacient.mutate(values);
  };

  return (
    <>
      <Button
        aria-label="novo paciente"
        leftIcon={<Icon as={RiAddCircleFill} />}
        colorScheme={"purple"}
        boxShadow={"md"}
        onClick={onOpen}
      >
        Novo Paciente
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreatePacient)}>
          <ModalHeader>
            <Center>
              <Text fontSize={"2xl"} fontWeight={"bold"} color={"purple.600"}>
                Cadastro do Paciente
              </Text>
            </Center>
          </ModalHeader>
          <ModalBody pb={6}>
            <VStack spacing={"1rem"}>
              <Input
                name="name"
                placeholder="Nome"
                error={errors.name}
                {...register("name")}
              />
              <Input
                name="birthDate"
                type={"date"}
                max={dayjs().format("YYYY-MM-DD")}
                defaultValue={dayjs().format("YYYY-MM-DD")}
                error={errors.birthDate}
                {...register("birthDate")}
              />
              <Input
                name="cpf"
                placeholder="CPF"
                error={errors.cpf}
                {...register("cpf")}
              />
              <Select
                rules={{ required: true }}
                control={control}
                placeholder="Gênero"
                name={"gender"}
                error={errors.gender}
                options={["Cisgênero", "Transgênero", "Não binário"]}
              />
              <Input
                name="address"
                placeholder="Endereço"
                error={errors.address}
                {...register("address")}
              />
              <Input
                name="telephone"
                placeholder="Telefone"
                type={"tel"}
                error={errors.telephone}
                {...register("telephone")}
              />
              <Input
                name="email"
                placeholder="E-mail"
                error={errors.email}
                {...register("email")}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={"1rem"} colorScheme={"red"}>
              Cancelar
            </Button>
            <Button colorScheme="purple" type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
