import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
    // WE MUST MAKE SURE THAT THE ERROR WE HAVE IS FROM AXIOS
        if(isAxiosError(error)) {
            return error.response?.data ||error.response?.data.message || error.message
        } else {
            return "Unexpected type of error";
        }
}

export default axiosErrorHandler;