import React from "react";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center p-8 bg-white gap-8">
        <FooterTop />
        <FooterBottom />
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-[#666] text-white">
        ©Taaghche.com
      </div>
    </>
  );
};

export default Footer;
