import { FormRecord } from "../domain/record";
import { supabase } from "../utils/supabase";

export const createRecord = async ({ title, time }: FormRecord) => {
  const res = await supabase.from("study-record").insert([{ title, time }]);
  console.log(res);
};
