import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Components.css';

const Form = props =>
  <form onSubmit={props.dictionarySubmitHandler} autoComplete="off">
    <div className="form-group">
      <TextField
          id="Dictionary"
          label="Dictionary Name"
          margin="normal"
          name="dictionaryName"
          value={props.dictionaryName}
          onChange={props.handleInput}
          autoFocus={true}
        />
    </div>
    <div className="form-group">
      <TextField
          id="Domain"
          label="Domain Name"
          margin="normal"
          name="domainTerm"
          value={props.domainTerm}
          onChange={props.handleInput}
        />
    </div>
    <div className="form-group">
      <TextField
          id="Range"
          label="Range Name"
          margin="normal"
          name="rangeTerm"
          value={props.rangeTerm}
          onChange={props.handleInput}
        />
    </div>
    <Button variant="contained" color="primary" type="submit" onSubmit={props.dictionarySubmitHandler} className="centralize">
        Submit
    </Button>
    <label>
      <input
        type="checkbox"
        checked={props.multiplePairValues}
        onChange={props.handleMultiplePairValues}
      />Add multiple domain/range pairs
    </label>




  </form>;

Form.propTypes = {
  dictionarySubmitHandler: PropTypes.func.isRequired,
  dictionaryName: PropTypes.string.isRequired,
  domainTerm: PropTypes.string.isRequired,
  rangeTerm: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  multiplePairValues: PropTypes.bool.isRequired
}

export default Form;
