import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onSubmit }) => {
    const [formData, setFormData] = useState(product || {
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
            />
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
            />
            <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default ProductForm;