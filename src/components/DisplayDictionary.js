import React from 'react';
import PropTypes from 'prop-types';
import DictionaryPairValues from './DictionaryPairValues';
import './Components.css';

const DisplayDictionary = props =>
  <div>
    {props.dictionaries.filter(item=>item.isEditing===true).map(item=>
      <DictionaryPairValues
        key={item.id}
        id={item.id}
        dictionaryName={item.dictionaryName}
        values={item.values}
        handleInputEditing={text=>props.handleInputEditing(text,item.id)}
        dictionarySubmitHandler={props.dictionarySubmitHandler}
      />
    )}
  </div>;

DisplayDictionary.propTypes = {
  dictionaries: PropTypes.array.isRequired,
  handleInputEditing: PropTypes.func.isRequired,
  dictionarySubmitHandler: PropTypes.func.isRequired
};

export default DisplayDictionary;
