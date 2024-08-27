'use client';

import styles from './productDetails.css'; // Import the CSS file
import crypto from 'crypto';

function ProductDetail() {

    const handleSubmit = async () => {
        let productData = JSON.parse(localStorage.getItem('selectedProductData'))
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



    return (
        <div className={styles.container}>
            ProductDetail components
            <button onClick={() => handleSubmit()}>Buy Now</button>
        </div>
    );
}

export default ProductDetail;
