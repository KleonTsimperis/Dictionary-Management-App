import React from 'react';
import PropTypes from 'prop-types';


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
          <tr key={props.id}>
            <td>{item.domainTerm}</td>
            <td>{item.rangeTerm}</td>
            <td><button>edit</button></td>
            <td><button>delete</button></td>
          </tr>
      )}
      </tbody>
    </table>
  </div>;

DictionaryPairValues.propTypes = {
  dictionaryName: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
};

export default DictionaryPairValues;
