import { UserInfo } from "../Models/UserInfo";

const apiUrl = "http://localhost:5039/api";

export const getCurrentUserInfo = async (userInfo: Omit<UserInfo, '_id'>) => {
    const response = await fetch(`${apiUrl}/userInfo/${userInfo.userEmail}`);
    const data = await response.json();
    return data;
}

//TODO: need to test
export const createUserInfo = async (userInfo: Omit<UserInfo, '_id'>) => {
    
    const response = await fetch(`${apiUrl}/userInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    const data = await response.json();
    return data;
    
}