import React from 'react';
import PropTypes from 'prop-types';
import DictionaryCRUD from './DictionaryCRUD';
import './Components.css';

const ListOfDictionaries = props =>
  <ul>
    {props.dictionaries.map((item,index)=>
      <DictionaryCRUD
        key={index}
        dictionaryName={item.dictionaryName}
        id={item.id}
        showDictionary={()=>props.showDictionary(item.dictionaryName)}
        normalizeDictionary={()=>props.normalizeDictionary(item.id)}
        removeDictionary={()=>props.removeDictionary(item.id)}
        addValuesToDictionary={()=>props.addValuesToDictionary(item.dictionaryName)}
      />
    )}
  </ul>;

ListOfDictionaries.propTypes = {
  dictionaries: PropTypes.array.isRequired,
  showDictionary: PropTypes.func.isRequired,
  normalizeDictionary: PropTypes.func.isRequired,
  removeDictionary: PropTypes.func.isRequired,
  addValuesToDictionary: PropTypes.func.isRequired,
};

export default ListOfDictionaries;
