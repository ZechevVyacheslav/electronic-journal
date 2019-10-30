import React from 'react';
import '../styles/MyCheckbox.less'

const myCheckbox = props => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={props.wasAbsent} onChange={props.change}/>
      <span className="checkmark"></span>
    </label>
  );
};

export default myCheckbox;
