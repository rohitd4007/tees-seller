"use client"

import styles from './topBrands.module.css'; // Import the CSS file


const TopBrands = (props) => {

    const brands = ["Adida", "Nike", "HERE&NOW", "HRX", "H&M", "WROGN", "Puma", "Levis", "Jack & Jones"]

    return (
        <>
            <h1 className={styles.productTitle}>Top Brands</h1>
            <div className={styles.topBrandsContainer}>
                {brands?.map((brand, i) =>
                    <div key={i} className={styles.brandCard}>{brand}</div>
                )}
            </div >

        </>
    )
}


export default TopBrands