import React from 'react';
import '../styles/Dropdown.less';

const dropdown = props => {
  return (
    <div className="dropdown">
      <button className="dropbtn">{props.icon} {props.title}</button>
      <div className="dropdown-content">{props.children}</div>
    </div>
  );
};

export default dropdown;
