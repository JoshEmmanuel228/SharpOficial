import { FileStore } from '../utils/fileStore';

export interface IAppointment {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    date: string; // FileStore stores as string usually
    time: string;
    product?: string;
    price?: number;
    status: string;
    createdAt: Date;
}

const Appointment = new FileStore<IAppointment>('appointments.json');

export default Appointment;
