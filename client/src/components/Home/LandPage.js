import React from "react";
import { Hidden, makeStyles } from "@material-ui/core";
import styled, {keyframes} from 'styled-components';
import Pulse from 'react-animations/lib/pulse.js';
import LandNav from './LandNav.js';
import Blob from './blob.svg';
import { BrowserRouter as Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  text: {

  },

  button: {

  },
}));

const LandPage = () => {
  const classes = useStyles();

  const PulseAnimation = keyframes`${Pulse}`;
  const PulseSec = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 5px;
  background-image: url(./blob.svg);

  &:hover .animate {
    animation: infinite 5s ${PulseAnimation};
  }

  .text {
    position: absolute;
    white-space: nowrap;
    font-size: 5.5vw;
    color: #fff;
    font-size: 1.5 em;
    font-family: 'Segoe UI', sans-serif;
    transform: translateY(-120px);
    text-align: center;
  }

  .btn {
    text-decoration: none;
    display: inline-block;
    padding: 8px 30px;
    border-radius: 40px;
    background: #fff;
    color: #3f51b5;
    transform: translateY(100px);
  }

  .animate {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  `;

  return (
    <>
      <LandNav/>
        <PulseSec>
          <img src={Blob} className={"animate"}></img>
          <h1 className={"text"}>The <br/> Study Buddy!</h1>
          <Link to="/user">
            <button className={"btn"}>Explore</button>
          </Link>
        </PulseSec>
    </>
  );
};

export default LandPage;

