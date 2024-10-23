import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { FormRecord } from "../domain/record";
import { createRecord } from "../models/createRecord";

export const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormRecord>();
  const onSubmit = async (value: FormRecord) => {
    try {
      await createRecord(value);
    } catch {
      setError("root.server", {
        message: "記録時にエラーが発生しました",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor="title">内容</FormLabel>
        <Input
          id="title"
          placeholder="タイトル"
          {...register("title", {
            required: "内容の入力は必須です",
          })}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.time}>
        <FormLabel htmlFor="time">時間</FormLabel>
        <Input
          id="time"
          placeholder="1"
          type="number"
          {...register("time", {
            required: "時間の入力は必須です",
            min: {
              value: 0,
              message: "時間は0以上である必要があります",
            },
          })}
        />
        <FormErrorMessage>
          {errors.time && errors.time.message}
        </FormErrorMessage>
      </FormControl>
      <FormErrorMessage>
        {errors.root?.server && errors.root.server.message}
      </FormErrorMessage>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};
