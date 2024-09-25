'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './addProductForm.module.css'; // Import the CSS file
import toast from 'react-hot-toast';

function AddProductForm(props) {
    const { setShowForm } = props
    const [productBrand, setProductBrand] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product_brand', productBrand);
        formData.append('product_title', productTitle);
        formData.append('product_selling_price', sellingPrice);
        formData.append('product_price', price);
        formData.append('product_discount', discount);
        formData.append('product_image', productImage);

        try {
            const response = await axios.post('https://user-auth-orpin-ten.vercel.app/api/product/uploadProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the user is authenticated
                }
            });
            console.log('Product uploaded successfully:', response.data);
            toast.success('Product Added Successfully')
            if (response.data) {
                window.location.reload();
            }

        } catch (error) {
            console.error('Error uploading product:', error.response.data);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.heading}>Add New Product</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="productBrand">Product Brand:</label>
                    <input
                        id="productBrand"
                        type="text"
                        value={productBrand}
                        onChange={(e) => setProductBrand(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="productTitle">Product Title:</label>
                    <input
                        id="productTitle"
                        type="text"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="sellingPrice">Selling Price:</label>
                    <input
                        id="sellingPrice"
                        type="number"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price">Price:</label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="discount">Discount:</label>
                    <input
                        id="discount"
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="productImage">Product Image:</label>
                    <input
                        id="productImage"
                        type="file"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        required
                        className={styles.fileInput}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Upload Product</button>
            </form>
        </div>
    );
}

export default AddProductForm;
