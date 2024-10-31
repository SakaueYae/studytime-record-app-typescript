import {
  TableContainer,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Record } from "../domain/record";

type TableProps = {
  records: Record[];
  onEdit: (record: Record) => void;
  onDelete: (record: Record) => void;
};

export const Table = ({ records, onEdit, onDelete }: TableProps) => {
  return (
    <TableContainer data-testid="table">
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            <Th>タイトル</Th>
            <Th>勉強時間</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record) => (
            <Tr key={record.id}>
              <Td>{record.title}</Td>
              <Td>{record.time}</Td>
              <Td
                textAlign="center"
                cursor="pointer"
                onClick={() => onEdit(record)}
              >
                <EditIcon />
              </Td>
              <Td
                data-testid="delete-icon"
                textAlign="center"
                cursor="pointer"
                onClick={() => onDelete(record)}
              >
                <DeleteIcon />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};
