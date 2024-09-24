import Image from 'next/image';
import styles from './productCards.module.css';

const ProductCard = ({ product }) => {
    return (
        <div key={product._id} className={styles.productCard} onClick={() => handleCardClick(product.product_price, product.product_title, product?._id)}>
            <Image
                src={product.product_image_url}
                alt={product.product_title}
                className={styles.productImage}
                width={500}
                height={500}
            />
            <div className={styles.productInfo}>
                <h2 className={styles.productBrand}>{product.product_brand}</h2>
                <div className={styles.productName}>{product?.product_title}</div>
                <div className={styles.productPrice}>
                    <span>
                        <span className={styles.priceSymbol}> ₹ </span>
                        <span className={styles.price}>{product?.product_selling_price}</span>
                    </span>
                    <span className={styles.actualPriceWrapper}>
                        M.R.P: <span className={styles.actualPrice}>{product?.product_price}</span>
                        <span className={styles.discount}> {product.product_discount}% off</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;