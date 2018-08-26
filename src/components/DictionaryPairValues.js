import React from 'react';
import PropTypes from 'prop-types';
import ValuePairs from './ValuePairs';


const DictionaryPairValues = props => {
  const isEditingValues = index => JSON.stringify(props.editingKeyValue) === JSON.stringify([props.id,index]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="8" className="text-center">Dictionary {props.dictionaryName} properties</th>
          </tr>
          <tr>
            <th>Domain Term</th>
            <th>Range Term</th>
            <th colSpan="4" style={{width:"10%"}}>Errors</th>
            <th colSpan="2" style={{width:"10%"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
        {props.values.map((item,index)=>
          <ValuePairs
            key={index}
            dictionaryName={props.dictionaryName}
            editingDomainTerm={props.editingDomainTerm}
            editingRangeTerm={props.editingRangeTerm}
            domainTerm={item.domainTerm}
            rangeTerm={item.rangeTerm}
            error1={item.error1}
            error2={item.error2}
            error3={item.error3}
            error4={item.error4}
            isEditingValues={isEditingValues(index)}
            editValues={()=>props.editValues(props.id,index)}
            inputeDomain={(e)=>props.inpute(props.id,index,e.target.value,"domain")}
            inputeRange={(e)=>props.inpute(props.id,index,e.target.value,"range")}
            removeValuePairs={()=>props.removeValuePairs(props.id,index)}
          />
        )}
        </tbody>
      </table>
    </div>
  );
};

DictionaryPairValues.propTypes = {
  dictionaryName: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  editingDomainTerm: PropTypes.string.isRequired,
  editingRangeTerm: PropTypes.string.isRequired,
  editValues: PropTypes.func.isRequired,
  inpute: PropTypes.func.isRequired,
  removeValuePairs: PropTypes.func.isRequired,
};

export default DictionaryPairValues;
