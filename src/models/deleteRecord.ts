import { supabase } from "../utils/supabase";

export const deleteRecord = async (id: string) => {
  await supabase.from("study-record").delete().eq("id", id);
};
