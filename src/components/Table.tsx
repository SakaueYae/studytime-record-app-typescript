import {
  TableContainer,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { Record } from "../domain/record";

type TableProps = {
  records: Record[];
};

export const Table = ({ records }: TableProps) => {
  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            <Th>タイトル</Th>
            <Th isNumeric>勉強時間</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record) => (
            <Tr key={record.id}>
              <Td>{record.title}</Td>
              <Td>{record.time}</Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};
