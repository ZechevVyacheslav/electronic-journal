import React from 'react';
import '../styles/Flash.less';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const flash = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="flash-control">
      <FontAwesomeIcon icon={faCheckCircle} /> <span className="flash-control__title">Success</span>
    </div>
  );
};

export default flash;
