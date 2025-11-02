import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./DraggableImageSlider.css";

gsap.registerPlugin(Draggable);

const DraggableImageSlider = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const proxyRef = useRef(null);
  const draggableInstanceRef = useRef(null);
  const cardsOrderRef = useRef([]);

  const images = [
    "https://images.unsplash.com/photo-1663094615740-322d2a238949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTQzOTU4OTl8&ixlib=rb-4.1.0&q=80&w=400.jpg",
    "https://images.unsplash.com/photo-1679537241464-f4f2cba721dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTQzOTYwNDF8&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1486546910464-ec8e45c4a137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTQzOTYxOTJ8&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTQzOTYyMjh8&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1494253109108-2e30c049369b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTQzOTYyOTB8&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTQzOTYzNjV8&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1730248202596-fbdef5624120?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTQzOTY2NDJ8&ixlib=rb-4.1.0&q=80&w=400",
  ];

  const EASE = "back.out(1.7)";
  const SHADOW = "0px 22px 70px 4px rgba(1, 14, 39, 1)";
  const MAX_DRAG_DISTANCE = 300;

  const initialCardSettings = [
    { rot: -24, scale: 0.7, origin: "bottom left", opacity: 0, z: 1 },
    { rot: -16, scale: 0.8, origin: "bottom left", z: 2 },
    { rot: -8, scale: 0.9, origin: "bottom left", z: 3 },
    { rot: 0, scale: 1.0, origin: "bottom center", z: 4 },
    { rot: 8, scale: 0.9, origin: "bottom right", z: 3 },
    { rot: 16, scale: 0.8, origin: "bottom right", z: 2 },
    { rot: 24, scale: 0.7, origin: "bottom right", opacity: 0, z: 1 },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter((card) => card !== null);
    cardsOrderRef.current = [...cards];
    let direction;

    gsap.set(container, { opacity: 1 });

    // Initial card setup
    cards.forEach((card, i) => {
      gsap.set(card, {
        rotation: initialCardSettings[i].rot,
        scale: initialCardSettings[i].scale,
        transformOrigin: initialCardSettings[i].origin,
        opacity: initialCardSettings[i].opacity ?? 1,
        boxShadow: SHADOW,
        zIndex: initialCardSettings[i].z,
      });
    });

    // Animate cards on drag
    const animateCardsOnDrag = (distance) => {
      const d = gsap.utils.clamp(-1, 1, distance);
      const absD = Math.abs(d);
      const dragTweens = [
        { index: 0, rot: -26 + d, scale: (7 + d) / 10, opacity: d / 2 + 0.2 },
        { index: 1, rot: -16 + d * 2, scale: (8 + d) / 10 },
        { index: 2, rot: -8 + d * 4, scale: (9 + d) / 10 },
        {
          index: 3,
          rot: d * 8,
          origin: direction,
          ease: "power4.out",
          boxShadow: `0px 22px ${70 - absD * 20}px 4px rgba(1, 14, 39, ${
            1 - absD / 4
          })`,
        },
        { index: 4, rot: 8 + d * 4, scale: (-d + 9) / 10 },
        { index: 5, rot: 16 + d * 2, scale: (-d + 8) / 10 },
        { index: 6, rot: 26 + d, scale: (-d + 7) / 10, opacity: -d / 2 + 0.2 },
      ];

      dragTweens.forEach(
        ({ index, rot, scale, opacity, origin, boxShadow, ease }) => {
          gsap.to(cardsOrderRef.current[index], {
            rotation: gsap.utils.clamp(-30, 30, rot),
            ...(scale !== undefined && {
              scale: gsap.utils.clamp(0.6, 1, scale),
            }),
            ...(opacity !== undefined && { opacity }),
            ...(origin && { transformOrigin: origin }),
            ...(boxShadow && { boxShadow }),
            ...(ease !== undefined && { ease }),
          });
        }
      );
    };

    // Reset cards position
    const resetDraggablePosition = () => {
      cardsOrderRef.current.forEach((card, i) => {
        gsap.to(card, {
          rotation: initialCardSettings[i].rot,
          scale: initialCardSettings[i].scale,
          transformOrigin: initialCardSettings[i].origin,
          opacity: initialCardSettings[i].opacity ?? 1,
          boxShadow: SHADOW,
          ease: EASE,
        });
      });
    };

    // Flip cards
    const flipCards = () => {
      if (direction === "bottom right") {
        cardsOrderRef.current.unshift(cardsOrderRef.current.pop());
      } else {
        cardsOrderRef.current.push(cardsOrderRef.current.shift());
      }
      const zIndex = gsap.utils.distribute({
        base: 1,
        amount: 3,
        from: "edges",
      });
      gsap.set(cardsOrderRef.current, { zIndex });
    };

    // Draggable setup
    const proxy = proxyRef.current;
    draggableInstanceRef.current = Draggable.create(proxy, {
      trigger: container,
      type: "x",
      bounds: { minX: -MAX_DRAG_DISTANCE, maxX: MAX_DRAG_DISTANCE },
      onDrag() {
        direction = Math.sign(this.x) === 1 ? "bottom right" : "bottom left";
        const distance = this.x / MAX_DRAG_DISTANCE;
        animateCardsOnDrag(distance);
      },
      onDragEnd() {
        if (Math.abs(this.x) > 50) {
          flipCards();
        }
        resetDraggablePosition();
        gsap.set(this.target, { x: 0 });
      },
    });

    return () => {
      if (draggableInstanceRef.current && draggableInstanceRef.current[0]) {
        draggableInstanceRef.current[0].kill();
      }
    };
  }, []);

  return (
    <div className="dis-slider-container">
      <h1>Draggable Image Slider</h1>

      <div className="dis-demo" ref={containerRef}>
        {images.map((src, index) => (
          <div
            key={index}
            className="dis-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <img src={src} alt={`dis-Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div ref={proxyRef} style={{ display: "none" }} />
    </div>
  );
};

export default DraggableImageSlider;
