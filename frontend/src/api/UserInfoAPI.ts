import { UserInfo } from "../Models/UserInfo";

const apiUrl = "http://localhost:5039/api";

export const getCurrentUserInfo = async (userInfo: Omit<UserInfo, '_id'>):Promise<object> => {
    const response = await fetch(`${apiUrl}/UserInfo/${userInfo.userEmail}`);
    //const response = await fetch(`${apiUrl}/UserInfo/test2@gmail.com`);
    let data = {};
    if (response.status == 200){
        data = await response.json();
    }
    return data;
}

export const createUserInfo = async (userInfo: UserInfo):Promise<UserInfo> => {
    const response = await fetch(`${apiUrl}/UserInfo`, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(userInfo)
    })
    const data = await response.json();
    // const data = await response;
    return data;
    
}