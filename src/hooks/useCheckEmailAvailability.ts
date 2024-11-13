import axios from "axios";
import { useState } from "react";


type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {

    const [emailStatus, setEmailStatus] = useState<TStatus>("idle");
    const [entredEmail, setEntredEmail] = useState<string | null>(null);

    const checkEmailAvailability = async(email: string) => {
        setEntredEmail(email);
        setEmailStatus("checking");

        try {
            const response = await axios.get(`/users?email=${email}`);

            if (!response.data.length) {
                setEmailStatus("available");
        }else {
            setEmailStatus("notAvailable");
        }
    } catch {
        setEmailStatus("failed");
    }

}

    const resetEmailAvailability = () => {
        setEmailStatus("idle");
        setEntredEmail(null);
    }
    
    return {emailStatus, entredEmail, checkEmailAvailability, resetEmailAvailability}
}


export {useCheckEmailAvailability}
