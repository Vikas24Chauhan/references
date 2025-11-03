import React from "react";
import Navbar from "./navbar/Navbar";
import TopDestinations from "./topDestinations/TopDestinations";
import ScrollStack from "./scrollStack/ScrollStack";
import CardToCode from "./cardToCode/CardToCode";
import CircularGallery from "./circularGallery/CircularGallery";
import DomeGallery from "./domeGallery/DomeGallery";
import ScrollToBloom from "./scrollToBloom/ScrollToBloom";
import AccordionSlider from "./accordionSlider/AccordionSlider";
import DraggableImageSlider from "./draggableImageSlider/DraggableImageSlider";
import ProjectsCarousel from "./projectsCarousel/ProjectsCarousel";
import FlowingMenu from "./flowingMenu/FlowingMenu";
import Footer from "./footer/Footer";

// Navbar
const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

function Home() {
  return (
    <>
      <Navbar
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="/path-to-your-logo.svg"
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />

      <TopDestinations />

      <ScrollStack />

      <CardToCode />

      <CircularGallery />

      <DomeGallery />

      <ScrollToBloom />

      <AccordionSlider />

      <DraggableImageSlider />

      <ProjectsCarousel />

      <FlowingMenu />

      <Footer />
    </>
  );
}

export default Home;
