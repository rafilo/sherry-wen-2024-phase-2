import {ObjectId} from 'mongodb';

export interface UserInfo {
    _id: ObjectId | null | object
    userEmail: string,
    userWebsite: string
}