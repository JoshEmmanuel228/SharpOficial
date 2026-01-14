import { FileStore } from '../utils/fileStore';

export interface ICulture {
    _id?: string;
    name: string;
    slug: string;
    description: string;
    characteristics: {
        origins: string[];
        connection: string;
        themes: string[];
        musicalStyle: string;
        globalInfluence: string;
    };
    impact: {
        unesco: string;
        culturalIdentity: string;
        evolution: string;
    };
    headerImage?: string;
    gallery?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const store = new FileStore<ICulture>('cultures.json');

class CultureModel {
    static find() {
        const query = {
            sort: (criteria: any) => {
                return store.find().then(items => {
                    // Simple sort implementation for createdAt
                    if (criteria.createdAt === -1) {
                        return items.sort((a: any, b: any) => {
                            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                            return dateB - dateA;
                        });
                    }
                    return items;
                });
            },
            then: (resolve: any, reject: any) => {
                return store.find().then(resolve, reject);
            }
        };
        return query as any;
    }

    static async findOne(query: Partial<ICulture>) {
        return await store.findOne(query);
    }

    static async create(data: ICulture) {
        return await store.create({ ...data, createdAt: new Date(), updatedAt: new Date() });
    }

    static async findOneAndUpdate(query: Partial<ICulture>, update: Partial<ICulture>, options?: any) {
        return await store.findOneAndUpdate(query, { ...update, updatedAt: new Date() });
    }

    static async findOneAndDelete(query: Partial<ICulture>) {
        return await store.findOneAndDelete(query);
    }

    // Helper for seeding
    static async deleteMany(query: any) {
        // Not implemented in FileStore yet, but for now we can just ignore or implement if needed for seeding
        // Since we are using a static JSON file, we might not need this for runtime
        return;
    }

    static async insertMany(docs: ICulture[]) {
        for (const doc of docs) {
            await store.create(doc);
        }
    }
}

export default CultureModel;

