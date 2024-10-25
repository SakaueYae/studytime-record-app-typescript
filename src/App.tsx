import { useEffect, useState } from "react";
import { getRecords } from "./models/getRecords";
import { Table } from "./components/Table";
import { Record } from "./domain/record";
import { FormModal } from "./components/FormModal";
import { Button, useDisclosure } from "@chakra-ui/react";
import { DeleteModal } from "./components/DeleteModal";

function App() {
  const [records, setRecords] = useState<Record[]>([]);
  const [defaultValue, setDefaultValue] = useState<Record | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<Record>({
    id: "",
    title: "",
    time: 0,
  });
  const {
    isOpen: formModalIsOpen,
    onOpen: formModalOnOpen,
    onClose: formModalOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteModalIsOpen,
    onOpen: deleteModalOnOpen,
    onClose: deleteModalOnClose,
  } = useDisclosure();

  useEffect(() => {
    (async () => {
      const records = await getRecords();
      setRecords(records);
    })();
  }, []);

  return (
    <>
      <h1>Study Time Record App</h1>
      <Table
        records={records}
        onEdit={(record) => {
          setDefaultValue(record);
          formModalOnOpen();
        }}
        onDelete={(record) => {
          setDeleteRecord(record);
          deleteModalOnOpen();
        }}
      />
      <FormModal
        isOpen={formModalIsOpen}
        defaultValue={defaultValue}
        onClose={formModalOnClose}
      />
      <Button
        colorScheme="teal"
        onClick={() => {
          setDefaultValue(null);
          formModalOnOpen();
        }}
      >
        新規登録
      </Button>
      <DeleteModal
        record={deleteRecord}
        isOpen={deleteModalIsOpen}
        onClose={deleteModalOnClose}
      />
    </>
  );
}

export default App;
