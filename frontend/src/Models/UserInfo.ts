import {ObjectId} from 'mongodb';

export interface UserInfo {
    _id: ObjectId | null; 
    userEmail: string
}