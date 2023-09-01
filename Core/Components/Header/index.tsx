import React from "react";
import { MapStateToProps } from "react-redux";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import Image from "next/image";

import Link from "next/link";
import SearchBar from "../SearchBar";
import { PiHandbagLight } from "react-icons/pi";

import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import MobileHeaderTop from "./MobileHeaderTop";

export interface HeaderPorps {
  isMobile: boolean;
}

const Header = ({ isMobile }: HeaderPorps) => {
  return (
    <div
      className={`w-full fixed z-30 px-12 shadow-xl bg-white flex flex-col items-center pb-4`}
    >
      {
        isMobile 
        ?
         (
            <>
            <MobileHeaderTop />
            <SearchBar />
            </>
        )
         : 
        (
            <>
        <HeaderTop />
      <HeaderBottom />
        </>
        )
      }
    
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.publicState.isMobile,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
