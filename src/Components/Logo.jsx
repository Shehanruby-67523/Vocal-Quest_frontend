import React from "react";
import LogoBrand from "../assets/logo_brand.png";

export default function Logo() {
  return (
    <div className="flex h-12 w-auto items-center justify-center">
      <img src={LogoBrand} alt="Vocal Quest Logo" className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105" />
    </div>
  );
}