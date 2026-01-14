import { FileStore } from '../utils/fileStore';

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    isAdmin: boolean;
    phone?: string;
    age?: number;
    beltSize?: string;
    country?: string;
    address?: string;
    createdAt: Date;
}

const User = new FileStore<IUser>('users.json');

export default User;
