import React from "react";
import LandNav from './LandNav.js'; 
import { BrowserRouter as Route, Link } from "react-router-dom";
import styles from './LandPage.module.css';

const LandPage = () => {
  return (
    <>
      <LandNav/>
        <section>
          <h1 className={styles.text}> Welcome to <br/> the Study Buddy!</h1>
          <Link to="/user">
            <button className={styles.btn}> Explore </button>
          </Link>
        </section>
    </>
  );
};

export default LandPage;

