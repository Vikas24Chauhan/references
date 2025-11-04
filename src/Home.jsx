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
import ScrollRevealSections from "./scrollRevealSections/ScrollRevealSections";
import ZoomEffectOnScroll from "./zoomEffectOnScroll/ZoomEffectOnScroll";
import Footer from "./footer/Footer";

function Home() {
  return (
    <>
      <Navbar
        position="right"
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

      <ScrollRevealSections />

      <ZoomEffectOnScroll />

      <Footer />
    </>
  );
}

export default Home;
