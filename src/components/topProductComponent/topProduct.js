'use client';

import { useRouter } from 'next/navigation';
import styles from './topProduct.module.css';
import Image from 'next/image';

const TopProducts = ({ products }) => {
    const router = useRouter();

    const handleCardClick = (price, productDetail) => {
        localStorage.setItem('selectedProductData', JSON.stringify({ price: price, productDetail: productDetail }))
        router.push("/productDetails")
    }

    return (
        <>
            <h1 className={styles.productTitle}>Top Products</h1>
            <div className={styles.productsContainer}>
                {products?.map((product) => (
                    <div key={product._id} className={styles.productCard} onClick={() => handleCardClick(product.product_price, product.product_title)}>
                        <Image
                            src={product.product_image_url}
                            alt={product.product_title}
                            className={styles.productImage}
                            width={100} // Example width, adjust based on your design
                            height={100} // Example height, adjust based on your design
                        />
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>{product.product_title}</h3>
                            <h2 className={styles.productBrand}>{product?.product_brand}</h2>
                            <p className={styles.productSellingPrice}>${product?.product_selling_price}</p>
                            <p className={styles.productPrice}>${product?.product_price}</p>
                            {product.product_discount && (
                                <p className={styles.productDiscount}>Discount: {product.product_discount}%</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TopProducts;
