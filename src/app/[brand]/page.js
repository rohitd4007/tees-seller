'use client'

import TopProducts from '@/components/topProductComponent/topProduct';
import { useEffect, useState } from 'react';

export default function BrandProducts({ params }) {
    const brand = decodeURIComponent(params.brand.replace(/-products$/, '').replace(/-/g, ' '));
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const getProducts = async () => {
        try {
            const res = await fetch('https://user-auth-orpin-ten.vercel.app/api/product/all-products');
            let products = await res.json();
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const filtered = products.filter(product => {
                const productBrand = product.product_brand.toLowerCase();
                return productBrand.includes(brand.toLowerCase()) || brand.toLowerCase().includes(productBrand);
            });
            setFilteredProducts(filtered);
        }
    }, [products, brand]);

    return (
        <div>
            <TopProducts products={filteredProducts} headerTitle={brand + " Products"} />
        </div>
    );
}