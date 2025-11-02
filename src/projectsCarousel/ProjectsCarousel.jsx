import React, { useState, useEffect, useRef } from "react";
import "./ProjectsCarousel.css";

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      image: "https://picsum.photos/320/200?t=1",
      description:
        "Exploring the neon-drenched landscapes of a digital frontier. AI-driven procedural generation creates infinite cityscapes.",
      progress: 65,
      phase: "PHASE II",
      color: "cyan",
      tags: ["Neural Networks", "Voxel Systems", "Quantum Rendering"],
    },
    {
      id: 2,
      title: "Neuro-Link UI",
      image: "https://picsum.photos/320/200?t=2",
      description:
        "Designing intuitive interfaces for brain-computer interaction. Holographic elements respond to neural patterns.",
      progress: 42,
      phase: "PHASE I",
      color: "blue",
      tags: ["BCI Framework", "Gesture Recognition", "Thought Mapping"],
    },
    {
      id: 3,
      title: "Quantum Entanglement",
      image: "https://picsum.photos/320/200?t=3",
      description:
        "Visualizing complex quantum states through advanced rendering techniques. Real-time simulation of parallel realities.",
      progress: 89,
      phase: "PHASE III",
      color: "purple",
      tags: ["Q-Bit Architecture", "Multiverse Modeling", "Probability Fields"],
    },
    {
      id: 4,
      title: "Project Chimera",
      image: "https://picsum.photos/320/200?t=4",
      description:
        "Developing next-gen propulsion systems for deep space exploration. Fusion drive concepts push beyond known physics.",
      progress: 51,
      phase: "PHASE II",
      color: "amber",
      tags: [
        "Dark Energy Capture",
        "Plasma Containment",
        "Gravitational Lensing",
      ],
    },
    {
      id: 5,
      title: "Aether Network",
      image: "https://picsum.photos/320/200?t=5",
      description:
        "Building a decentralized data network leveraging quantum blockchain and next-gen P2P technology.",
      progress: 78,
      phase: "PHASE III",
      color: "emerald",
      tags: ["Quantum Encryption", "Self-Healing Nodes", "Data Holograms"],
    },
  ];

  const moveToSlide = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const card = track.children[0];
    const cardWidth = card.offsetWidth;
    const cardMargin = parseInt(window.getComputedStyle(card).marginRight) * 2;

    const amountToMove = targetIndex * (cardWidth + cardMargin);
    const containerCenter = container.offsetWidth / 2;
    const cardCenter = cardWidth / 2;
    const targetTranslateX = containerCenter - cardCenter - amountToMove;

    track.style.transform = `translateX(${targetTranslateX - 25}px)`;
    setCurrentIndex(targetIndex);

    // Flash effect
    const flashEffect = document.createElement("div");
    flashEffect.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(56, 189, 248, 0.1);
      z-index: 30;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;
    container.appendChild(flashEffect);

    setTimeout(() => {
      flashEffect.style.opacity = "0.3";
      setTimeout(() => {
        flashEffect.style.opacity = "0";
        setTimeout(() => {
          if (container.contains(flashEffect)) {
            container.removeChild(flashEffect);
          }
        }, 200);
      }, 100);
    }, 10);
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      moveToSlide(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    const pos = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    setStartPos(pos);

    const track = trackRef.current;
    const transformMatrix = window
      .getComputedStyle(track)
      .getPropertyValue("transform");
    const translate =
      transformMatrix !== "none" ? parseInt(transformMatrix.split(",")[4]) : 0;

    setCurrentTranslate(translate);
    setPrevTranslate(translate);
    track.style.transition = "none";
    track.style.cursor = "grabbing";
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    const currentPosition = e.type.includes("mouse")
      ? e.pageX
      : e.touches[0].clientX;
    const moveX = currentPosition - startPos;
    const newTranslate = prevTranslate + moveX;
    setCurrentTranslate(newTranslate);

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const track = trackRef.current;
    if (!track) return;

    track.style.transition =
      "transform 0.75s cubic-bezier(0.21, 0.61, 0.35, 1)";
    track.style.cursor = "grab";

    const movedBy = currentTranslate - prevTranslate;
    const card = track.children[0];
    const cardWidth = card.offsetWidth;
    const threshold = cardWidth / 3.5;

    if (movedBy < -threshold && currentIndex < projects.length - 1) {
      moveToSlide(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    } else {
      moveToSlide(currentIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePrev();
      }
    };

    const handleResize = () => {
      moveToSlide(currentIndex);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex]);

  useEffect(() => {
    // Initialize carousel position
    setTimeout(() => {
      moveToSlide(currentIndex);
    }, 100);
  }, []);

  const getCardClass = (index) => {
    if (index === currentIndex) return "pc-carousel-card pc-is-active";
    if (index === currentIndex - 1) return "pc-carousel-card pc-is-prev";
    if (index === currentIndex + 1) return "pc-carousel-card pc-is-next";
    if (index < currentIndex - 1) return "pc-carousel-card pc-is-far-prev";
    if (index > currentIndex + 1) return "pc-carousel-card pc-is-far-next";
    return "pc-carousel-card";
  };

  return (
    <div className="pc-container">
      <h1>Projects Carousel</h1>

      <div className="pc-main" ref={containerRef}>
        <div
          className="pc-carousel-track"
          ref={trackRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
          onTouchEnd={handleDragEnd}
        >
          {projects.map((project, index) => (
            <div key={project.id} className={getCardClass(index)}>
              <div className="pc-card-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="pc-card-image"
                />
              </div>
              <div className="pc-card-content">
                <h3
                  className={`pc-card-title text-xl font-bold text-${project.color}-400`}
                  data-text={project.title}
                >
                  {project.title}
                </h3>
                <p className="pc-card-description">{project.description}</p>
                <div className="pc-card-progress">
                  <div
                    className="pc-progress-value"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="pc-card-stats">
                  <span>{project.phase}</span>
                  <span>{project.progress}% COMPLETE</span>
                </div>
              </div>
              <div className="pc-tech-details">
                {project.tags.map((tag, i) => (
                  <div key={i} className="pc-tech-tag">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="pc-carousel-button pc-prev" onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button className="pc-carousel-button pc-next" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <div className="pc-carousel-indicators">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`pc-indicator ${
                index === currentIndex ? "pc-active" : ""
              }`}
              onClick={() => moveToSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
