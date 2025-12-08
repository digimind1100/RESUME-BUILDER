import React, { useState, useEffect, useRef } from "react";
import "./TemplateShowcase.css";

// 11 portrait images: /images/simple-1.png ... /images/simple-11.png
const templateImages = Array.from({ length: 11 }, (_, index) => ({
  id: index + 1,
  src: `/images/simple-${index + 1}.png`,
  title: `Simple Template ${index + 1}`,
}));

export default function TemplateShowcase() {
  const containerRef = useRef(null);

  const [slidesToShow, setSlidesToShow] = useState(4); // ✅ desktop: 4
  const [slideWidth, setSlideWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // left-most slide index

  // Layout / responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = window.innerWidth;
      let count = 4; // default desktop

      if (width <= 640) {
        count = 1; // small phones
      } else if (width <= 1024) {
        count = 2; // tablets / small laptops
      }

      const maxIndexAllowed = Math.max(0, templateImages.length - count);

      setSlidesToShow(count);
      setCurrentIndex((prev) => Math.min(prev, maxIndexAllowed));

      const containerWidth = containerRef.current.clientWidth;
      setSlideWidth(containerWidth / count);
    };

    handleResize(); // run initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, templateImages.length - slidesToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // ✅ Auto-slide
  useEffect(() => {
    if (!slideWidth) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const localMax = Math.max(0, templateImages.length - slidesToShow);
        if (prev >= localMax) return 0;
        return prev + 1;
      });
    }, 3500); // 3.5s per slide

    return () => clearInterval(interval);
  }, [slideWidth, slidesToShow]);

  return (
    <section className="simple-templates-section">
      <div className="container simple-templates-inner">
        {/* Heading / text - centered */}
        <header className="simple-templates-header">
          <p className="simple-templates-eyebrow">Resume Templates</p>
          <h2 className="simple-templates-title">
            Simple <span>portrait</span> templates for every resume
          </h2>
          <p className="simple-templates-subtitle">
            Clean, focused layouts that keep your content readable. Browse
            different designs – your content stays the same, only styling
            changes.
          </p>
        </header>

        {/* Slider */}
        <div className="simple-templates-slider">
          <div className="simple-templates-window" ref={containerRef}>
            <div
              className="simple-templates-track"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}px)`,
              }}
            >
              {templateImages.map((tpl) => (
                <div
                  key={tpl.id}
                  className="simple-template-slide"
                  style={
                    slideWidth
                      ? { minWidth: `${slideWidth}px` }
                      : undefined
                  }
                >
                  <div className="simple-template-frame">
                    <img
                      src={tpl.src}
                      alt={tpl.title}
                      className="simple-template-image"
                      loading="lazy"
                    />
                  </div>
                  <p className="simple-template-caption">{tpl.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="simple-templates-controls">
            <button
              type="button"
              className="simple-templates-arrow"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ‹
            </button>

            <span className="simple-templates-indicator">
              {currentIndex + 1} / {templateImages.length}
            </span>

            <button
              type="button"
              className="simple-templates-arrow"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
            >
              ›
            </button>
          </div>

          {/* ✅ Bottom center button */}
          <div className="simple-templates-footer">
            <button
              type="button"
              className="simple-templates-main-btn"
              onClick={() => {
                // Agar tum react-router use kar rahe ho to yahan navigate("/templates") bhi laga sakte ho
                window.location.href = "/templates";
              }}
            >
              Visit Templates Page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
