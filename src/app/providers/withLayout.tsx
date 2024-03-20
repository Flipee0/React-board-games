import React from "react";
import Layout from "shared/ui/Layout/Layout";
import { Appbar } from "widgets/Appbar";
import { Footer } from "widgets/Footer";

const WithLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout appbar={<Appbar />} footer={<Footer />}>
      {children}
    </Layout>
  );
};

export default WithLayout;
