import { useEffect, useState } from "react";
import { getRecords } from "./models/getRecords";
import { Table } from "./components/Table";
import { Record } from "./domain/record";
import { FormModal } from "./components/FormModal";
import { Button, useDisclosure } from "@chakra-ui/react";

function App() {
  const [records, setRecords] = useState<Record[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    (async () => {
      const records = await getRecords();
      setRecords(records);
    })();
  }, []);

  return (
    <>
      <h1>Study Time Record App</h1>
      <Table records={records} />
      <FormModal isOpen={isOpen} onClose={onClose} />
      <Button colorScheme="teal" onClick={onOpen}>
        新規登録
      </Button>
    </>
  );
}

export default App;
