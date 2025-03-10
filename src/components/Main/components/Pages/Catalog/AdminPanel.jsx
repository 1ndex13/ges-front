import React, { useState } from 'react';
import ProductForm from './ProductForm';
import axios from 'axios';

const AdminPanel = () => {
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddOrUpdateProduct = async (product) => {
        if (product.id) {
            await axios.put(`http://localhost:8080/api/products/${product.id}`, product, {
                auth: { username: 'admin', password: 'admin123' } // Учетные данные администратора
            });
        } else {
            await axios.post('http://localhost:8080/api/products', product, {
                auth: { username: 'admin', password: 'admin123' } // Учетные данные администратора
            });
        }
        setEditingProduct(null);
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <ProductForm product={editingProduct} onSubmit={handleAddOrUpdateProduct} />
        </div>
    );
};

export default AdminPanel;