import React from 'react';
import '../styles/NumberedInput.less';

const numberedInput = props => {
  const naitiveInput = (
    <input
      className="numbered-input__name"
      type="text"
      placeholder={props.placeholder}
      value={props.name}
      onKeyPress={props.adding}
      onChange={props.editing}
    />
  );
  return (
    <div className="numbered-input">
      <span className="numbered-input__number" onClick={props.removing}>
        {props.number}
      </span>
      {!props.children ?  naitiveInput  : props.children}
    </div>
  );
};

export default numberedInput;
