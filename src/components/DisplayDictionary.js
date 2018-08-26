import React from 'react';
import PropTypes from 'prop-types';
import DictionaryPairValues from './DictionaryPairValues';
import './Components.css';



const DisplayDictionary = props =>
  <div className="displayDictionary">
    {props.dictionaries.filter(item=>item.isShowing===true).map((item,index)=>
      <DictionaryPairValues
        key={index}
        editingKeyValue={props.editingKeyValue}
        editingDomainTerm={props.editingDomainTerm}
        editingRangeTerm={props.editingRangeTerm}
        id={item.id}
        dictionaryName={item.dictionaryName}
        values={item.values}
        inpute={props.inpute}
        removeValuePairs={props.removeValuePairs}
        editValues={props.editValues}
      />
    )}
  </div>;

DisplayDictionary.propTypes = {
  dictionaries: PropTypes.array.isRequired,
  editingKeyValue: PropTypes.array.isRequired,
  editingDomainTerm: PropTypes.string.isRequired,
  editingRangeTerm: PropTypes.string.isRequired,
  inpute: PropTypes.func.isRequired,
  removeValuePairs: PropTypes.func.isRequired,
  editValues: PropTypes.func.isRequired,
};

export default DisplayDictionary;
