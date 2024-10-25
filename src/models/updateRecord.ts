import { Record } from "../domain/record";
import { supabase } from "../utils/supabase";

export const updateRecord = async ({ id, title, time }: Record) => {
  const res = await supabase
    .from("study-record")
    .update({ title, time })
    .eq("id", id);
  console.log(res);
};
