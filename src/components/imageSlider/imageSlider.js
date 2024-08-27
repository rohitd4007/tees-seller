// src/components/ImageSlider.js
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ec1 from '../../Resources/ec-1.jpg';
import ec2 from '../../Resources/ec-2.jpg';
import ec3 from '../../Resources/ec-3.jpg';
import ec4 from '../../Resources/ec-4.jpg';
import styles from './imageSlider.module.css'; // Assuming you have CSS modules enabled


const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const images = [ec3, ec2, ec1, ec4];

    return (
        <div className={styles.sliderContainer}>
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <Image
                            src={src}
                            alt={`Slide ${index}`}
                            priority
                            className={styles.image}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
