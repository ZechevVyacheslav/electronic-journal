import React from 'react';
import { Link } from 'react-router-dom';

const logo = props => {
  return (
    <Link to="/">
      <img src={props.img} height="55px" width="55px" />
    </Link>
  );
};

export default logo;
