import React from 'react';
import PropTypes from 'prop-types';

const ValuePairsError = props =>

<div className="dropdown">
  <button className={props.value <= 2 ? "btn btn-warning dropdown-toggle btn-sm" : "btn btn-danger dropdown-toggle btn-sm"} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {props.value}
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    {props.value === 1? <span className="dropdown-item" href="#">Duplicate Domain-Range values detected</span>:""}
    {props.value === 2? <span className="dropdown-item" href="#">Fork Domain-Range values detected</span>:""}
    {props.value === 3? <span className="dropdown-item" href="#">Cycles Domain-Range values detected</span>:""}
    {props.value === 4? <span className="dropdown-item" href="#">Chains Domain-Range values detected</span>:""}
  </div>
</div>;

ValuePairsError.propTypes = {
  value:PropTypes.number
};

export default ValuePairsError;
