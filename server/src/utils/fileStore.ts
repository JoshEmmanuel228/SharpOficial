import fs from 'fs/promises';
import path from 'path';

export class FileStore<T extends { id?: string; _id?: string }> {
    private filePath: string;

    constructor(filename: string) {
        // Use process.cwd() to be safe in both local (server/) and Docker (/app)
        this.filePath = path.join(process.cwd(), 'data', filename);
    }

    private async readData(): Promise<T[]> {
        try {
            console.log(`[DEBUG] Reading file from: ${this.filePath}`);
            await fs.access(this.filePath);
            const data = await fs.readFile(this.filePath, 'utf-8');
            console.log(`[DEBUG] Read success, length: ${data.length}`);
            return JSON.parse(data);
        } catch (error) {
            console.error(`[DEBUG] Error reading file at ${this.filePath}:`, error);
            // If file doesn't exist, return empty array
            return [];
        }
    }

    private async writeData(data: T[]): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    async find(): Promise<T[]> {
        return await this.readData();
    }

    async findOne(query: Partial<T>): Promise<T | null> {
        const data = await this.readData();
        return data.find(item => {
            return Object.entries(query).every(([key, value]) => (item as any)[key] === value);
        }) || null;
    }

    async create(item: T): Promise<T> {
        const data = await this.readData();
        // Generate a simple ID if not present
        if (!(item as any)._id && !(item as any).id) {
            (item as any)._id = Date.now().toString();
        }
        data.push(item);
        await this.writeData(data);
        return item;
    }

    async findOneAndUpdate(query: Partial<T>, update: Partial<T>): Promise<T | null> {
        const data = await this.readData();
        const index = data.findIndex(item => {
            return Object.entries(query).every(([key, value]) => (item as any)[key] === value);
        });

        if (index === -1) return null;

        data[index] = { ...data[index], ...update };
        await this.writeData(data);
        return data[index];
    }

    async findOneAndDelete(query: Partial<T>): Promise<T | null> {
        const data = await this.readData();
        const index = data.findIndex(item => {
            return Object.entries(query).every(([key, value]) => (item as any)[key] === value);
        });

        if (index === -1) return null;

        const deletedItem = data[index];
        data.splice(index, 1);
        await this.writeData(data);
        return deletedItem;
    }
}
