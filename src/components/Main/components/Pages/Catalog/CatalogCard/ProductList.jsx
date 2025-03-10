import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductList';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;