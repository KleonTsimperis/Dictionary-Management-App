import React from 'react';
import PropTypes from 'prop-types';
import DictionaryPairValues from './DictionaryPairValues';
import './Components.css';

const DisplayDictionary = props =>
  <div>
    {props.dictionaries.filter(item=>item.isEditing===true).map((item,index)=>
      <DictionaryPairValues
        key={index}
        id={item.id}
        dictionaryName={item.dictionaryName}
        values={item.values}
        inpute={props.inpute}
        dictionarySubmitHandler={props.dictionarySubmitHandler}
        editValues={props.editValues}

      />
    )}
  </div>;

DisplayDictionary.propTypes = {
  dictionaries: PropTypes.array.isRequired,
  dictionarySubmitHandler: PropTypes.func.isRequired
};

export default DisplayDictionary;
