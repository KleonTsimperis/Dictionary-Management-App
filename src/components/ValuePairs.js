import React from 'react';
import PropTypes from 'prop-types';


const ValuePairs = props =>

<tr key={props.id}>
  <td>{props.isEditingValues? <input type="text" value={props.domainTerm} onChange={props.inpute}  /> : <span>{props.domainTerm}</span>}</td>
  <td>{props.isEditingValues? <input type="text" value={props.rangeTerm}  onChange={props.inpute} /> : <span>{props.rangeTerm}</span>}</td>

  <td><button onClick={props.editValues}>edit</button></td>
  <td><button>remove</button></td>
</tr>

export default ValuePairs;
