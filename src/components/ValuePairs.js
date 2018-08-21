import React from 'react';



const ValuePairs = props =>

<tr key={props.id}>
  <td>{props.isEditingValues? <input type="text" value={props.domainTerm} onChange={props.inputeDomain}/> : <span>{props.domainTerm}</span>}</td>
  <td>{props.isEditingValues? <input type="text" value={props.rangeTerm}  onChange={props.inputeRange}/> : <span>{props.rangeTerm}</span>}</td>

  <td><button onClick={props.editValues}>{props.isEditingValues? "Save":"Edit"}</button></td>
  <td><button onClick={props.removeValuePairs}>remove</button></td>
  <td><button onClick={props.addValuesToDictionary}>Add values</button></td>
</tr>

export default ValuePairs;
