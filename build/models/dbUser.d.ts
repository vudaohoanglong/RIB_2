import mongoose from "mongoose";
interface IdbUser extends mongoose.Document {
    email: String;
    password: String;
    role: String;
    contentIDs: [
        {
            contentId: String;
        }
    ];
}
interface IdbUserModel extends mongoose.Model<IdbUser> {
    findByCredentials(email: String, password: String): Promise<IdbUser | null>;
    generateAuthToken(): Promise<String | null>;
}
declare const dbUser: IdbUserModel;
export default dbUser;
