import React from 'react';
import '../styles/NumberedInput.less';

const numberedInput = props => {
  return (
    <div className="numbered-input">
      <span className="numbered-input__number">{props.number}</span>
      <div className="numbered-input__roundedSide"></div>
      <input
        className="numbered-input__name"
        type="text"
        placeholder={props.placeholder}
        value={props.name}
        onKeyPress={props.adding}
        onChange={props.editing}
      />
    </div>
  );
};

export default numberedInput;
