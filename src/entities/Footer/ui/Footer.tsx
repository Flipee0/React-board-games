import React from "react";
import FooterContainer from "shared/ui/Footer/FooterContainer";

type FooterProps = {
  children: React.ReactNode;
};

export const Footer = ({ children }: FooterProps) => {
  return <FooterContainer>{children}</FooterContainer>;
};
