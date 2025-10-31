import React from "react";
import Navbar from "./navbar/Navbar";
import TopDestinations from "./topDestinations/TopDestinations";
import ScrollStack from "./scrollStack/ScrollStack";
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
      <div style={{ height: "100vh", background: "#1a1a1a" }}>
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
      </div>
      <TopDestinations />
      <ScrollStack />
      <Footer />
    </>
  );
}

export default Home;
