"use client"

import { useRouter } from 'next/navigation';
import styles from './topBrands.module.css'; // Import the CSS file


const TopBrands = (props) => {
    const router = useRouter(); // Add this line


    const brands = ["Adidas", "Nike", "HERE&NOW", "HRX", "H&M", "WROGN", "Puma", "Levis", "Jack & Jones"]
    const handleBrandClick = (brand) => {
        console.log(`Clicked on brand: ${brand}`);
        // Navigate to the brand-specific products page
        router.push(`/${brand.toLowerCase().replace(/\s+/g, '-')}-products`);

    };

    return (
        <>
            <h1 className={styles.productTitle}>Top Brands</h1>
            <div className={styles.topBrandsContainer}>
                {brands?.map((brand, i) =>
                    <div
                        key={i}
                        className={styles.brandCard}
                        onClick={() => handleBrandClick(brand)}
                    >
                        {brand}
                    </div>
                )}
            </div >

        </>
    )
}


export default TopBrands