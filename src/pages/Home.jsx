import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Array of images to show on slideshow
const slides = [
    { 
        id: 1, 
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", 
        text: "Shop Smarter. Live Better.",
        subtext: "Your favorite brands, delivered straight to your door.",
        position: "top-20 left-1/2 transform -translate-x-1/2 z-10 text-center flex flex-col items-center gap-8 lg:gap-20",
    },
    { 
        id: 2, 
        image: "https://images.unsplash.com/photo-1760443728596-b8f1399fe2cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169", 
        text: "Find the latest tech",
        subtext: "Smart tech. Sleek design. Everything you need — all in one place.",
        positionText: "left-1/2 transform -translate-x-1/2 top-20",
        position: "left-1/2 transform -translate-x-1/2 flex flex-col items-center",
        h2Position: "absolute top-20 text-center",
        pPosition: "absolute bottom-40 text-center"
    },
    { 
        id: 3, 
        image: "https://images.unsplash.com/photo-1723328254549-24bb3deb4a83?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", 
        text: "Timeless Elegance",
        subtext: "Accessories that elevate every moment.",
        position: "flex flex-col items-center md:items-start md:justify-center md:gap-8 md:p-4"
    },
    { 
        id: 4, 
        image: "https://images.unsplash.com/photo-1759395162954-f2191918e647?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", 
        text:"Style That Speaks",
        subtext: "Discover outfits that match your personality — and your budget.",
        position: "absolute top-20 left-1/2 transform -translate-x-1/2 z-10 text-center flex flex-col items-center justify-evenly",
    },
]

// Settings for slideshow
const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    pauseOnFocus: false,
    appendDots: dots => (
        <div
        style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <ul className="m-0 p-0">{dots}</ul>
        </div>
    ),
}

export function Home () {
    return (
        <main className="w-full">
            <div>
                <section className="w-full h-[70vh] sm:h-[80vh]">
                    <Slider 
                        {...settings} 
                    >
                        {slides.map(slide => (
                            <div className="relative">
                                {/* Background image */}
                                <img
                                    src={slide.image}
                                    alt={slide.text}
                                    className="w-full h-[70vh] sm:h-[80vh] object-cover brightness-75" 
                                />

                                {/* Text overlays */}
                                <div className={`absolute inset-0 text-white z-10 ${slide.position}`}>
                                    <h2 className={`text-4xl md:text-6xl font-semibold ${slide.h2Position}`}>{slide.text}</h2>

                                    <p className={`text-xl sm:text-2xl lg:text-3xl ${slide.pPosition}`}>{slide.subtext}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </section>
            </div>

            {/* TODO: Add other Home page content here */}
        </main>
    )
}