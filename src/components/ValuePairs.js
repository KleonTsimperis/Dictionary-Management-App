import React from 'react';
import PropTypes from 'prop-types';
import ValuePairsError from './ValuePairsError';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';

const ValuePairs = props =>

  <tr key={props.id}>
    <td>{props.isEditingValues? <input type="text" value={props.editingDomainTerm} onChange={props.inputeDomain}/> : <span>{props.domainTerm}</span>}</td>
    <td>{props.isEditingValues? <input type="text" value={props.editingRangeTerm} onChange={props.inputeRange}/> : <span>{props.rangeTerm}</span>}</td>
    <td>{props.error1? <ValuePairsError value={1}/>:''}</td>
    <td>{props.error2? <ValuePairsError value={2}/>:''}</td>
    <td>{props.error3? <ValuePairsError value={3}/>:''}</td>
    <td>{props.error4? <ValuePairsError value={4}/>:''}</td>
    <td>
      <IconButton  aria-label="Delete" onClick={props.editValues} color="primary">
        {props.isEditingValues ? <Save />:<Edit />}
      </IconButton>
    </td>
    <td>
      <IconButton  aria-label="Delete" onClick={props.removeValuePairs} color="secondary">
        <DeleteIcon />
      </IconButton>
    </td>
  </tr>;

ValuePairs.propTypes = {
  id: PropTypes.number,
  isEditingValues: PropTypes.bool.isRequired,
  editingDomainTerm: PropTypes.string.isRequired,
  editingRangeTerm: PropTypes.string.isRequired,
  inputeDomain: PropTypes.func.isRequired,
  inputeRange: PropTypes.func.isRequired,
  domainTerm: PropTypes.string.isRequired,
  rangeTerm: PropTypes.string.isRequired,
  error1: PropTypes.bool.isRequired,
  error2: PropTypes.bool.isRequired,
  error3: PropTypes.bool.isRequired,
  error4: PropTypes.bool.isRequired
};

export default ValuePairs;
