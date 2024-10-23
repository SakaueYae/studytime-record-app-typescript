import { useEffect, useState } from "react";
import { getRecords } from "./models/getRecords";
import { Table } from "./components/Table";
import { Record } from "./domain/record";
import { Form } from "./components/Form";

function App() {
  const [records, setRecords] = useState<Record[]>([]);
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
      <Form />
    </>
  );
}

export default App;
