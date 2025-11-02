import React, { useState, useEffect } from "react";
import "./AccordionSlider.css";

const AccordionSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const carData = [
    {
      number: "01",
      brand: "BMW M3",
      name: "BMW M3 Competition",
      subtitle: "Twin-Turbo Inline-6 Performance",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      specs: [
        { label: "Engine:", value: "3.0L Twin-Turbo Inline-6" },
        { label: "Power:", value: "503 HP @ 6,250 RPM" },
        { label: "Torque:", value: "650 Nm @ 2,750 RPM" },
        { label: "Transmission:", value: "8-Speed Automatic" },
      ],
      badges: ["0-100: 3.9s", "Top Speed: 290 km/h", "Price: $73,400"],
    },
    {
      number: "02",
      brand: "Lamborghini Huracán",
      name: "Lamborghini Huracán",
      subtitle: "Naturally Aspirated V10 Excellence",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      specs: [
        { label: "Engine:", value: "5.2L V10 Naturally Aspirated" },
        { label: "Power:", value: "610 HP @ 8,250 RPM" },
        { label: "Torque:", value: "560 Nm @ 6,500 RPM" },
        { label: "Transmission:", value: "7-Speed Dual-Clutch" },
      ],
      badges: ["0-100: 3.2s", "Top Speed: 325 km/h", "Price: $248,295"],
    },
    {
      number: "03",
      brand: "Ferrari SF90",
      name: "Ferrari SF90 Stradale",
      subtitle: "Plug-in Hybrid Revolution",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      specs: [
        { label: "Engine:", value: "4.0L V8 Twin-Turbo + Electric" },
        { label: "Power:", value: "1000 HP Combined" },
        { label: "Torque:", value: "800 Nm @ 6,000 RPM" },
        { label: "Transmission:", value: "8-Speed F1 DCT" },
      ],
      badges: ["0-100: 2.5s", "Top Speed: 340 km/h", "Price: $625,000"],
    },
    {
      number: "04",
      brand: "Porsche 911",
      name: "Porsche 911 Turbo S",
      subtitle: "Twin-Turbo Flat-Six Perfection",
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      specs: [
        { label: "Engine:", value: "3.8L Twin-Turbo Flat-6" },
        { label: "Power:", value: "640 HP @ 6,750 RPM" },
        { label: "Torque:", value: "800 Nm @ 2,500 RPM" },
        { label: "Transmission:", value: "8-Speed PDK" },
      ],
      badges: ["0-100: 2.7s", "Top Speed: 330 km/h", "Price: $207,000"],
    },
  ];

  const setActiveSlide = (index) => {
    if (currentIndex === index) {
      setCurrentIndex(-1);
    } else {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % carData.length;
    setActiveSlide(nextIndex);
  };

  const previousSlide = () => {
    const prevIndex =
      currentIndex === -1
        ? carData.length - 1
        : (currentIndex - 1 + carData.length) % carData.length;
    setActiveSlide(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="as-slider-container">
      <h1>Accordion Slider</h1>
      <div className="as-slider-main">
        <div className="as-now-showing">Now in Showroom</div>

        <div className="as-accordion-slider">
          {carData.map((car, index) => (
            <div
              key={index}
              className={`as-slide ${
                currentIndex === index ? "as-active" : ""
              }`}
              style={{ backgroundImage: `url('${car.image}')` }}
              onClick={() => setActiveSlide(index)}
            >
              <div className="as-slide-content">
                <div className="as-slide-number">{car.number}</div>
                <div className="as-car-brand">{car.brand}</div>
                <div className="as-car-name">{car.name}</div>
                <div className="as-car-subtitle">{car.subtitle}</div>
                <div className="as-car-specs">
                  {car.specs.map((spec, idx) => (
                    <div key={idx} className="as-spec-row">
                      <span className="as-spec-label">{spec.label}</span>
                      <span className="as-spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div className="as-performance-badges">
                  {car.badges.map((badge, idx) => (
                    <div key={idx} className="as-badge">
                      <div className="as-badge-icon"></div>
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="as-add-button"></div>
            </div>
          ))}
        </div>

        <button
          className="as-navigation-arrows as-nav-prev"
          onClick={previousSlide}
        >
          ‹
        </button>
        <button
          className="as-navigation-arrows as-nav-next"
          onClick={nextSlide}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default AccordionSlider;
