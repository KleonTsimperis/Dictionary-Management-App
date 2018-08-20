import React from 'react';
import './Components.css';

const Form = props =>

  <form onSubmit={props.dictionarySubmitHandler}>
    <fieldset>
      <label><strong>Dictionary Name:</strong></label>
      <input type="text" id="name" name="dictionaryName" value={props.dictionaryName} onChange={props.handleInput} autoFocus={true}/>

      <label for="email">Domain Term:</label>
      <input type="text" id="email" name="domainTerm" value={props.domainTerm} onChange={props.handleInput}/>

      <label for="password">Range Term:</label>
      <input type="text" id="password" name="rangeTerm" value={props.rangeTerm} onChange={props.handleInput}/>

      <label style={{textAlign:"center"}}>
        Add multiple domain/range pairs
      </label><input
        type="checkbox"
        checked={props.multiplePairValues}
        onChange={props.handleMultiplePairValues}
      />
      <button variant="contained" color="primary" type="submit" onSubmit={props.dictionarySubmitHandler} className="submit">
          Submit
      </button>
    </fieldset>

  </form>;



export default Form;
