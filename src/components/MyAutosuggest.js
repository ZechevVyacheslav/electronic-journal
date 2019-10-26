import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import '../styles/MyAutosuggest.less';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, sourceArray) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  //   return languages.filter(language => regex.test(language.name));
  return sourceArray.filter(element => regex.test(element.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}
// const getSuggestionValue = feild => suggestion => {
//   return suggestion[feild];
// };

function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}

// const renderSuggestion = feild => suggestion => {
//   return <span>{suggestion[feild]}</span>;
// };

class MyAutosuggest extends Component {
  state = {
    value: '',
    array: this.props.array,
    suggestions: []
  };

  onChange = (event, { newValue }) => {
    const { id, onChange } = this.props;

    this.setState({
      value: newValue
    });

    onChange(id, newValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.state.array)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { id, placeholder } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder,
      value: this.props.value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        id={id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default MyAutosuggest;
