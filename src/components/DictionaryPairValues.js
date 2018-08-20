import React from 'react';
import PropTypes from 'prop-types';
import ValuePairs from './ValuePairs';


const DictionaryPairValues = props =>
  <div>
    <label>{props.dictionaryName}</label>
    <table>
      <thead>
        <tr>
          <th>domainTerm</th>
          <th>rangeTerm</th>
        </tr>
      </thead>
      <tbody>
      {props.values.map((item,index)=>
        <ValuePairs
          key={index}
          id={index}
          domainTerm={item.domainTerm}
          rangeTerm={item.rangeTerm}
          isEditingValues={item.isEditingValues}
          editValues={()=>props.editValues(props.id,index)}
          inpute={()=>props.inpute(props.id)}
        />

      )}
      </tbody>
    </table>
  </div>;

DictionaryPairValues.propTypes = {
  dictionaryName: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
};

export default DictionaryPairValues;
