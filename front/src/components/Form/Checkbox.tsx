import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
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

interface CheckboxProps extends ChakraCheckboxProps {
  name: string;
  control: Control<FieldValues | any>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label?: ReactNode;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const CheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = ({ name, control, rules, error = null, ...rest }, children) => {
  return (
    <>
      <FormControl isInvalid={!!error}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => <ChakraCheckbox {...field} {...rest} />}
        />
        {!!error && (
          <FormErrorMessage>{error.message.toString()}</FormErrorMessage>
        )}
      </FormControl>
      {children}
    </>
  );
};

export const Checkbox = forwardRef(CheckboxBase);
