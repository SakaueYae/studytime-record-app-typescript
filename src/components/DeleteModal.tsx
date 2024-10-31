import { Record } from "../domain/record";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { deleteRecord } from "../models/deleteRecord";

type DeleteModalProps = {
  record: Record;
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteModal = ({ record, isOpen, onClose }: DeleteModalProps) => {
  const onDelete = async () => {
    await deleteRecord(record.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>以下の記録を削除します。よろしいでしょうか？</Text>
          <Box display="flex">
            <Text>{record.title}</Text>
            <Text>{record.time}h</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3}>
            キャンセル
          </Button>
          <Button
            colorScheme="red"
            onClick={onDelete}
            data-testid="delete-button"
          >
            削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
