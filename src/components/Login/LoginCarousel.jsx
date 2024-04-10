import React from 'react'
import Banner_1 from "../../assets/banner_01.jpg"
import Banner_2 from "../../assets/banner_02.jpg"
import Banner_3 from "../../assets/banner_03.jpg"
import Banner_4 from "../../assets/banner_04.jpg"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginCarousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
                }
            }
        ]
    };
    
    return (
        <div className="col-md-12">
            <Slider {...settings}>
                <div className="item">
                    <div className="item-card">
                        <img src={Banner_1} alt="" className='img-banner'/>
                    </div>
                </div>
                <div className="item">
                    <div className="item-card">
                        <img src={Banner_2} alt="" className='img-banner'/>
                    </div>
                </div>
                <div className="item">
                    <div className="item-card">
                        <img src={Banner_3} alt="" className='img-banner'/>
                    </div>
                </div>
                <div className="item">
                    <div className="item-card">
                        <img src={Banner_4} alt="" className='img-banner'/>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default LoginCarousel