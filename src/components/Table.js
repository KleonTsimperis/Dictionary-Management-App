import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import './Components.css';

const Table = props =>

    <table className="list">
      <thead>
        <tr>
          <th>Product</th>
          <th>Color</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <List
          list = {props.list}
         />
      </tbody>
    </table>

Table.propTypes = {
  list: PropTypes.array.isRequired
}

export default Table;
