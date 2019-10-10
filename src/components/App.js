import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import '../styles/App.less';

class App extends Component {
  buttonHandler = () => {
    const { addRandomNumber } = this.props;
    addRandomNumber();
  };

  render() {
    const { numbers } = this.props;
    return (
      <>
        <button className='button' onClick={this.buttonHandler}>
          Add new react app with random number
        </button>
        {numbers.map(element => {
          return (
            <div className="header" key={element}>
              My {element} react app ^_^
            </div>
          );
        })}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    numbers: state.numbers
  };
};

const mapDispatchToProps = {
  addRandomNumber: actions.addRandomNumber
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
