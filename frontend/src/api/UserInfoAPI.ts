import { UserInfo } from "../Models/UserInfo";

const apiUrl = process.env.BACKEND_BASE_URL;

export const getCurrentUserInfo = async (): Promise<UserInfo> => {
    const response = await fetch(`${apiUrl}/userInfo`);
    const data = await response.json();
    return data;
}

export const createUserInfo = async (userInfo: Omit<UserInfo, '_id'>): Promise<UserInfo> => {
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

export const createIfNotExists = async (userInfo: Omit<UserInfo, '_id'>): Promise<string> => {
    const userInfoExists = getCurrentUserInfo();
    let response = `user ${userInfo.userEmail} already exists`
    if (!userInfoExists) {
        const createResponse = createUserInfo(userInfo);
        response = JSON.stringify(createResponse);
    }
    return response
}