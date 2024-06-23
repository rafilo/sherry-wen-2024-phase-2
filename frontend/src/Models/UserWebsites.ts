import {ObjectId} from 'mongodb';

export interface UserWebsites {
    _id: ObjectId;
    UserEmail: string;
    UserWebsite: {
        WebsiteName: string;
        WebsiteContent: string;
    }
}