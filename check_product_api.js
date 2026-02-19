const fetch = require('node-fetch'); // You might need to install node-fetch or use built-in fetch if node version > 18

async function checkProduct() {
    try {
        const response = await fetch('http://localhost:5000/api/products/20?_t=' + Date.now());
        const data = await response.json();
        console.log('Product Image URLs:', data.imageUrls);
        console.log('Product Name:', data.name);
    } catch (error) {
        console.error('Error:', error);
    }
}

checkProduct();
