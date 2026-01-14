
import CultureModel from './models/Culture';

async function test() {
    console.log('Testing CultureModel...');
    try {
        console.log('Calling find()...');
        const cultures = await CultureModel.find().sort({ createdAt: -1 });
        console.log('Cultures found:', cultures.length);
        console.log('First culture:', cultures[0]?.name);
    } catch (error) {
        console.error('Error in test:', error);
    }
}

test();
