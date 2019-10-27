import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Header.less';

import Logo from '../containers/Logo';
import logo from '../logo.png';
import Dropdown from '../containers/Dropdown';
import {
  faPlusCircle,
  faUserGraduate,
  faEdit,
  faEye,
  faBook,
  faListUl
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  render() {
    const generateBlackIcon = iconTitle => {
      return (
        <FontAwesomeIcon
          icon={iconTitle}
          style={{ color: '#000', marginRight: '5px' }}
        />
      );
    };
    return (
      <header className="page-header">
        <nav className="header__nav">
          <Logo img={logo} />
          <ul className="nav__list">
            <li className="list__item">
              <Dropdown
                title="Students"
                icon={generateBlackIcon(faUserGraduate)}
              >
                <Link to="/create-student-list">{generateBlackIcon(faPlusCircle)} Create list</Link>
                <Link to="/edit-students">{generateBlackIcon(faEdit)} Edit lists</Link>
                <Link to="/view-students">{generateBlackIcon(faEye)} View lists</Link>
              </Dropdown>
            </li>
            <li className="list__item">
              <Dropdown title="Subjects" icon={generateBlackIcon(faBook)}>
                <Link to="/create-subjects">
                  {generateBlackIcon(faPlusCircle)} Create subjects
                </Link>
                <Link to="/edit-subjects">{generateBlackIcon(faEdit)} Edit subjects</Link>
              </Dropdown>
            </li>
            <li className="list__item">
              <Dropdown title="Journal" icon={generateBlackIcon(faListUl)}>
                <Link to="/create-journal">{generateBlackIcon(faPlusCircle)} Create journal</Link>
                <Link to="/edit-journal">{generateBlackIcon(faEdit)} Edit journal</Link>
                <a href="#">{generateBlackIcon(faEye)} View journals</a>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
