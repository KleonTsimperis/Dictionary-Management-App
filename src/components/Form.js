import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './Components.css';

const Form = props =>

  <form onSubmit={props.dictionarySubmitHandler} autoComplete="off">
    <fieldset>
      <label><strong>Dictionary Name</strong></label>
      {props.isAddingValuesAfterCreation? <h2>{props.dictionaryName}</h2>:
      <input type="text" id="name" name="dictionaryName" value={props.dictionaryName} onChange={props.handleInput} autoFocus={true}/>}
      <label className="errorLabel" style={{color:"red"}}>{props.dictionaryName === "" ? props.dictionaryNameError : ""}</label>

      <label htmlFor="email">Domain Term</label>
      <input type="text" id="email" name="domainTerm" value={props.domainTerm} onChange={props.handleInput}/>
      <label className="errorLabel" style={{color:"red"}}>{props.domainTerm.length <= 1 ? props.domainTermError : ""}</label>

      <label htmlFor="password">Range Term</label>
      <input type="text" id="password" name="rangeTerm" value={props.rangeTerm} onChange={props.handleInput}/>
      <label className="errorLabel" style={{color:"red"}}>{props.rangeTerm.length <= 2 ? props.rangeTermError : ""}</label>

      <label>
        Add multiple domain/range pairs
      </label>
      <Checkbox
          checked={props.multiplePairValues}
          onChange={props.handleMultiplePairValues}
          value="checkedF"
          color="primary"
          className="balance"
        />
      {/*<input
        type="checkbox"
        checked={props.multiplePairValues}
        onChange={props.handleMultiplePairValues}
      />*/}
      <Button style={{marginTop: "1rem"}} variant="contained" color="primary" type="submit" onSubmit={props.dictionarySubmitHandler} className="submit">
          Submit
      </Button>
    </fieldset>
  </form>;

  Form.propTypes = {
    dictionarySubmitHandler: PropTypes.func.isRequired,
    dictionaryName: PropTypes.string.isRequired,
    domainTerm: PropTypes.string.isRequired,
    rangeTerm: PropTypes.string.isRequired,
    dictionaryNameError: PropTypes.string,
    domainTermError: PropTypes.string,
    rangeTermError: PropTypes.string,
    handleInput: PropTypes.func.isRequired,
    multiplePairValues: PropTypes.bool.isRequired,
    handleMultiplePairValues: PropTypes.func.isRequired
  };


export default Form;
