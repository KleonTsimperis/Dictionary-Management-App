import React from 'react';
import PropTypes from 'prop-types';
import DictionaryPairValues from './DictionaryPairValues';
import './Components.css';

const DisplayDictionary = props =>
  <div>
    {props.dictionaries.filter(item=>item.isShowing===true).map((item,index)=>
      <DictionaryPairValues
        key={index}
        id={item.id}
        dictionaryName={item.dictionaryName}
        values={item.values}
        inpute={props.inpute}
        removeValuePairs={props.removeValuePairs}
        addValuesToDictionary={props.addValuesToDictionary}
        editValues={props.editValues}
      />
    )}
  </div>;

DisplayDictionary.propTypes = {
  dictionaries: PropTypes.array.isRequired,
};

export default DisplayDictionary;
