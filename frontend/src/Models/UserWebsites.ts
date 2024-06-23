import {ObjectId} from 'mongodb';

interface Userwebsite {
    WebsiteName: string;
     WebsiteContent: string;
}

export interface UserWebsites {
    _id: ObjectId | null;
    UserEmail: string;
    UserWebsites: Userwebsite[]
}