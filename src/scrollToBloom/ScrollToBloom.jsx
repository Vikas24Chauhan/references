import React from "react";
import "./ScrollToBloom.css";
import { div } from "motion/react-client";

const ScrollToBloom = () => {
  const cardData = [
    {
      imgSrc: "https://assets.codepen.io/2585/Roboto.svg",
      text: "Sort of short and tiny amount of content here.",
      link: "https://blush.design/collections/i6aPXTYbSUdZEveWhgik/transhumans",
      linkText: "Cool art",
    },
    {
      imgSrc: "https://assets.codepen.io/2585/Entertainment.svg",
      text: "The words in this example are tolerable, passable and fair, but do draw out a bit.",
      link: "https://blush.design/collections/i6aPXTYbSUdZEveWhgik/transhumans",
      linkText: "By Pablo Stanley",
    },
    {
      imgSrc: "https://assets.codepen.io/2585/Mechanical+Love.svg",
      text: "I'm brief comparatively.",
      link: "https://blush.design/collections/i6aPXTYbSUdZEveWhgik/transhumans",
      linkText: "Find more",
    },
    {
      imgSrc: "https://assets.codepen.io/2585/Waiting.svg",
      text: "Sometimes the message is just right.",
      link: "https://blush.design/collections/i6aPXTYbSUdZEveWhgik/transhumans",
      linkText: "Share good art",
    },
  ];

  // Repeat the data to match the original count
  const repeatedCardData = Array(12).fill(cardData).flat();

  return (
    <div className="stb-container">
      <h1>Scroll To Bloom</h1>
      <div className="stb-main">
        {repeatedCardData.map((card, index) => (
          <div key={index} className="stb-card-animation-layer">
            <article className="stb-card">
              <img
                src={card.imgSrc}
                alt="placeholder-hand-drawn-vector"
                height="500"
                width="500"
              />
              <p>{card.text}</p>
              <a href={card.link}>{card.linkText}</a>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollToBloom;
