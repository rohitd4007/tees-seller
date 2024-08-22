'use client';

import styles from './topProduct.module.css';
import ec2 from '../../Resources/ec-2.jpg';
import Image from 'next/image';


const TopProducts = ({ }) => {
    const products = [
        {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 1
        },
        {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 2
        }, {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 3
        }, {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 4
        }, {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 5
        }, {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 6
        }, {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 5
        }, {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 6
        }, {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 5
        }, {
            image: ec2,
            name: 'Branded T Shirt',
            price: 200,
            discount: '23%',
            id: 6
        },
    ]
    return (
        <>
            <h1 className={styles.productTitle}>Top Products</h1>
            <div className={styles.productsContainer}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>{product.name}</h3>
                            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                            {product.discount && (
                                <p className={styles.productDiscount}>Discount: {product.discount}%</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TopProducts;
