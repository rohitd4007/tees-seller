'use client';

import styles from './productDetails.module.css';
import crypto from 'crypto';
import ec3 from '../../Resources/ec-2.jpg';
import Image from 'next/image';
import { useEffect, useState } from 'react';


function ProductDetail() {

    const [productData, setProductData] = useState()
    useEffect(() => {
        let productData = JSON.parse(localStorage.getItem('selectedProductData'))
        setProductData(productData)
    }, [])


    const handleSubmit = async () => {
        let userData = JSON.parse(localStorage.getItem('userData'))

        let txnid = `txnid${Date.now()}`
        const key = 'e3ks2w';
        const salt = 'Pm3xvJxIOI8npXyxWJgwFwIIwEQKsVAm';
        const hashString = `${key}|${txnid}|${productData.price}|${productData.productDetail}|${userData.username}|${userData.userEmail}|||||||||||${salt}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        const paymentData = {
            key,
            txnid: txnid,
            amount: productData.price,
            firstname: userData.username,
            email: userData.userEmail,
            phone: userData.userMobile,
            productinfo: productData.productDetail,
            surl: 'https://test-payment-middleware.payu.in/simulatorResponse',
            furl: 'https://test-payment-middleware.payu.in/simulatorResponse',
            hash,
        };

        // Submit the form data to PayU
        const actionUrl = 'https://test.payu.in/_payment';

        // Create a form and submit it
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = actionUrl;

        for (const key in paymentData) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = paymentData[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
    };

    const product = {
        name: 'T Shirt',
        description: productData?.productDetail || '',
        price: productData?.price || 0,
        image: ec3,
        category: 'Clothes',
        stock: 5
    };


    return (
        <>
            <div className={styles.productDetailsContainer}>
                <div className={styles.productImageSection}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        priority
                        className={styles.productImage}
                    />
                </div>
                <div className={styles.productInfoSection}>
                    <h1 className={styles.productTitle}>{product.name}</h1>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>{product.price} ₹</p>
                    <p className={styles.productCategory}><strong>Category:</strong> {product.category}</p>
                    <p className={styles.productStock}><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</p>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.addToCartBtn} disabled={product.stock === 0}>
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button className={styles.addToCartBtn} onClick={() => handleSubmit()} >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div >

        </>
    );
}

export default ProductDetail;

