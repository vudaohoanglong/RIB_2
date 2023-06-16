import { IUser } from '@lumieducation/h5p-server';

/**
 * Example user object
 */
export default class User implements IUser {
    constructor(id?,role?) {
        this.id = id ? id : '1';
        this.name = 'Firstname Surname';
        this.canInstallRecommended = true;
        this.canUpdateAndInstallLibraries = true;
        this.canCreateRestricted = true;
        this.type = 'local';
        this.email = 'test@example.com';
        this.role = role ? role : 'Student';
    }

    public canCreateRestricted: boolean;
    public canInstallRecommended: boolean;
    public canUpdateAndInstallLibraries: boolean;
    public email: string;
    public id: string;
    public name: string;
    public type: 'local';
    public role: string;
}
