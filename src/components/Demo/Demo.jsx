import React from 'react'
import './Demo.css'

import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Demo = () => {
    return (
        <main className='demo_conatainer'>
            <header>
                <div>
                    <div><img src="https://static.vecteezy.com/system/resources/thumbnails/021/966/428/small_2x/beauty-logo-for-woman-logo-can-be-used-for-beauty-salon-cosmetic-spa-premium-vector.jpg" alt="" /></div>
                    <p>Classic Touch</p>
                </div>

                {/* <div>
                    <div><FaHome/></div>
                    <div><IoMdSettings/></div>
                    <div><RiAccountCircleFill/></div>
                </div> */}

                <div className='btn_group'>
                    <button>Queue List</button>
                    <button>Join Queue</button>
                </div>
            </header>

            <section>
                <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    // autoPlay={true}
                    // interval={6000}
                    showStatus={false}
                    showArrows={false}
                    stopOnHover={false}
                >
                    <div className='carousel_item'>
                        <img src="https://media.istockphoto.com/id/525568423/photo/london-piccadilly-during-night.jpg?s=612x612&w=0&k=20&c=mBHnao0BnbANC1h2E-rOJ_tSviC7jTw9ir4tfp1V6uI=" />
                    </div>
                    <div className='carousel_item'>
                        <img src="https://cdn.pixabay.com/photo/2016/03/03/10/17/social-media-1233873_1280.jpg" />
                    </div>
                    <div className='carousel_item'>
                        <img src="https://thumbs.dreamstime.com/b/advertising-word-cloud-business-concept-56936998.jpg" />
                    </div>
                </Carousel>

                {/* <div className='btn_group'>
                    <button>Queue List</button>
                    <button>Join Queue</button>
                </div> */}

                <div className='icon_group'>
                    <div><FaHome /></div>
                    <div><IoMdSettings /></div>
                    <div><RiAccountCircleFill /></div>
                </div>
            </section>
        </main>
    )
}

export default Demo