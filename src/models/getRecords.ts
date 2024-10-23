import { supabase } from "../utils/supabase";
import { Record } from "../domain/record";

export const getRecords = async (): Promise<Record[]> => {
  const res = await supabase.from("study-record").select("*");
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};
