import React from "react";

type FooterProps = {
  children: React.ReactNode;
};

const FooterContainer = ({ children }: FooterProps) => {
  return (
    <>
      <footer>{children}</footer>
    </>
  );
};

export default FooterContainer;
