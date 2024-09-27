'use client';

import styles from './productDetails.module.css';
import crypto from 'crypto';
import ec3 from '../../Resources/ec-2.jpg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';


function ProductDetail() {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [productData, setProductData] = useState()
    const [cart, setCart] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            const res = await fetch('https://user-auth-orpin-ten.vercel.app/api/product/all-products');
            let products = await res.json();
            const selectedProduct = products?.find(product => product?._id === id);
            if (selectedProduct) {
                setProductData(selectedProduct);
            } else {
                setError('Product not found.');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Error fetching products.');
        }
    };

    const handleSubmit = async () => {
        let userData = JSON.parse(localStorage.getItem('userData'))

        let txnid = `txnid${Date.now()}`
        const key = 'e3ks2w';
        const salt = 'Pm3xvJxIOI8npXyxWJgwFwIIwEQKsVAm';
        const hashString = `${key}|${txnid}|${Number(productData.product_selling_price)}|${productData.product_title}|${userData.username}|${userData.userEmail}|||||||||||${salt}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        const paymentData = {
            key,
            txnid: txnid,
            amount: productData.product_selling_price,
            firstname: userData.username,
            email: userData.userEmail,
            phone: userData.userMobile,
            productinfo: productData.product_title,
            surl: 'https://test-payment-middleware.payu.in/simulatorResponse',
            furl: 'https://test-payment-middleware.payu.in/simulatorResponse',
            hash,
        };

        const actionUrl = 'https://test.payu.in/_payment';

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
        stock: 5
    };

    // TODO: IMPLEMENT WITH REDUX
    const handleAddToCart = (product) => {
        const existingProductIndex = cart.findIndex(item => item._id === product._id);
        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity = (updatedCart[existingProductIndex].quantity || 1) + 1;
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success('Product added to cart');
    }


    return (
        <>
            <div className={styles.productDetailsContainer}>
                <div className={styles.productImageSection}>
                    <Image
                        src={productData?.product_image_url}
                        alt={productData?.product_title}
                        priority
                        className={styles.productImage}
                        width={500}
                        height={500}
                    />
                </div>
                <div className={styles.productInfoSection}>
                    <h1 className={styles.productTitle}>{productData?.product_title}</h1>
                    <p className={styles.productDescription}>{productData?.product_brand}</p>
                    <p className={styles.productPrice}>{productData?.product_selling_price} ₹</p>
                    <p className={styles.productCategory}><strong>Category:</strong> {"Clothes"}</p>
                    <p className={styles.productStock}><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</p>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.addToCartBtn} onClick={() => handleAddToCart(productData)}>
                            {'Add to Cart'}
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

