'use client';

import { useRouter } from 'next/navigation';
import styles from './topProduct.module.css';
import ProductCard from '../productCardComponent/productCards';

const TopProducts = ({ products, headerTitle }) => {
    const router = useRouter();

    const handleCardClick = (price, productDetail, id) => {
        localStorage.setItem('selectedProductData', JSON.stringify({ price: price, productDetail: productDetail }))
        router.push(`/productDetails?id=${id}`);
    }

    return (
        <>
            <h1 className={styles.productTitle}>{headerTitle || 'Top Products'}</h1>
            <div className={styles.productsContainer}>
                {!headerTitle ? products?.slice(0, 5).map((product) => (
                    <ProductCard key={product._id} product={product} />
                )) : products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <a href="/allProducts" className={styles.viewAllLink}>View All Products</a>
        </>
    );
};

export default TopProducts;