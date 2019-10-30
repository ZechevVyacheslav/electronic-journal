import React from 'react';
import '../styles/MySelect.less';

const mySelect = props => {
  return (
    <div className="select">
      <select className="slct" id="slct" value={props.week} onChange={props.change}>
        <option value='0' disabled>
          Choose week
        </option>
        <option value="1">1 Week</option>
        <option value="2">2 Week</option>
        <option value="3">3 Week</option>
        <option value="4">4 Week</option>
        <option value="5">5 Week</option>
        <option value="6">6 Week</option>
        <option value="7">7 Week</option>
        <option value="8">8 Week</option>
        <option value="9">9 Week</option>
        <option value="10">10 Week</option>
        <option value="11">11 Week</option>
        <option value="12">12 Week</option>
        <option value="13">13 Week</option>
        <option value="14">14 Week</option>
        <option value="15">15 Week</option>
      </select>
    </div>
  );
};

export default mySelect;
