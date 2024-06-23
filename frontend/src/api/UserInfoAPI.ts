import { UserInfo } from "../Models/UserInfo";

const apiUrl = "http://localhost:5039/api";

export const getCurrentUserInfo = async (userInfo: Omit<UserInfo, '_id'>) => {
    const response = await fetch(`${apiUrl}/UserInfo/${userInfo.userEmail}`);
    //const response = await fetch(`${apiUrl}/UserInfo/test2@gmail.com`);
    let data = {};
    if (response.status == 200){
        data = await response.json();
    }
    return data;
}

//TODO: need modify
export const createUserInfo = async (userInfo: Omit<UserInfo, '_id'>) => {
    
    const response = await fetch(`${apiUrl}/UserInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    const data = await response.json();
    return data;
    
}