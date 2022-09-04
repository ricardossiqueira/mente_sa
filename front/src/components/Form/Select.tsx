import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldPath,
  FieldValues,
  Merge,
  RegisterOptions,
} from "react-hook-form";

interface SelectProps extends ChakraSelectProps {
  name: string;
  control: Control<FieldValues | any>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  options: string[];
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, options, control, rules, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <ChakraSelect
            size={"lg"}
            backgroundColor={"transparent"}
            focusBorderColor="purple.500"
            _active={{ borderColor: "purple.500" }}
            _hover={{ bg: "whiteAlpha.400" }}
            bg="whteAlpha.900"
            variant="outline"
            borderColor="blackAlpha.500"
            borderWidth={"1px"}
            {...field}
            {...rest}
          >
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </ChakraSelect>
        )}
      />
      {!!error && (
        <FormErrorMessage>{error.message.toString()}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
