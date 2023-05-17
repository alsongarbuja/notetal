import { modalTypes } from "../../types/custom";
import { modalsInApp } from "../constants/models";
import { apiCaller } from "./fetcher";

export const serverPropHandler = async (url: string, type: modalTypes) => {

    const { response, status, errorMessage } = await apiCaller(url, "GET");
  
    if(status === 'error') {
        return {
            [modalsInApp[type]]: [], 
            error: errorMessage,
        }
    }
    
    return {
        [modalsInApp[type]]: response,
    };
}
