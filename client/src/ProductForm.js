import React, { useState } from 'react';

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [style, setStyle] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: parseFloat(price),
      style,
      size,
      color,
      brand,
      imageUrls: [imageUrl],
      description,
    };
    fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(data => {
        onProductAdded(data);
        setName('');
        setPrice('');
        setStyle('');
        setSize('');
        setColor('');
        setBrand('');
        setImageUrl('');
        setDescription('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Product</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Style" required />
      <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Size" required />
      <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" required />
      <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" required />
      <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
