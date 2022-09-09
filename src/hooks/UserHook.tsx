import { useState } from "react";
import { supabase } from "../components/Auth/supabaseClient";


export const useUserHook = () => {
    const user = useState(supabase.auth.user())
    return user;
}