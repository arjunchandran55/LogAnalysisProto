
import axios from "axios";

export const initiateGetCall = (
    url: string,
    params?: URLSearchParams,
    successCallback?: (response?: any) => void, errorCallBack?: (error?: any) => void ) => {
    axios.get(url, {
        params,
    })
    .then((response) => {
        if (successCallback) { successCallback(response); }
    })
    .catch((error) => {
        if (errorCallBack) { errorCallBack(error); }
    });
};

export const initiatePostCall = (
    url: string,
    data: any,
    successCallback?: (response?: any) => void, 
    errorCallBack?: (error?: any) => void 
) => {
    axios.post(url, data)
    .then((response: any) => {
        if (successCallback) { successCallback(response); }
    })
    .catch((error: any) => {
        if (errorCallBack) { errorCallBack(error); }
    });
}

