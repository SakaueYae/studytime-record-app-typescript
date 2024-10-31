import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Record } from "../domain/record";
import { createRecord } from "../models/createRecord";
import { updateRecord } from "../models/updateRecord";
import { useEffect } from "react";

type FormModalProps = {
  isOpen: boolean;
  defaultValue: Record | null;
  onClose: () => void;
};

export const FormModal = ({
  isOpen,
  defaultValue,
  onClose,
}: FormModalProps) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Record>();

  useEffect(() => {
    reset({
      id: defaultValue?.id,
      title: defaultValue?.title,
      time: defaultValue?.time,
    });
  }, [defaultValue, reset]);

  const onSubmit = async (value: Record) => {
    try {
      if (value.id) await updateRecord(value);
      else await createRecord(value);
      handleClose();
    } catch (e) {
      console.log(e);
      setError("root.server", {
        type: "server",
        message: "記録時にエラーが発生しました",
      });
      console.log(errors);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader data-testid="formModal-title">
          {defaultValue ? "記録編集" : "新規作成"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">内容</FormLabel>
              <Input
                id="title"
                placeholder="タイトル"
                {...register("title", {
                  required: "内容の入力は必須です",
                })}
                data-testid="title-input"
              />
              <FormErrorMessage data-testid="title-error">
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
                data-testid="time-input"
              />
              <FormErrorMessage data-testid="time-error">
                {errors.time && errors.time.message}
              </FormErrorMessage>
              <FormControl isInvalid={!!errors.root?.server}>
                <FormErrorMessage>
                  {errors.root && errors.root.server.message}
                </FormErrorMessage>
              </FormControl>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            閉じる
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleSubmit(onSubmit)}
            data-testid="save-button"
          >
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
