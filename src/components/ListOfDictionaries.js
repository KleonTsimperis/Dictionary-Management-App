import React from 'react';
import PropTypes from 'prop-types';
import DictionaryCRUD from './DictionaryCRUD';
import './Components.css';

const ListOfDictionaries = props =>
  <ul>
    {props.dictionaries.map(item=>
      <DictionaryCRUD
        key={item.id}
        dictionaryName={item.dictionaryName}
        id={item.id}
        removeDictionary={()=>props.removeDictionary(item.id)}
        editDictionary={()=>props.editDictionary(item.id)}
      />
    )}
  </ul>;

ListOfDictionaries.propTypes = {
  dictionaries: PropTypes.array.isRequired,
  removeDictionary: PropTypes.func.isRequired,
  editDictionary: PropTypes.func.isRequired
};

export default ListOfDictionaries;
