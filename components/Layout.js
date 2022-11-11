import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
