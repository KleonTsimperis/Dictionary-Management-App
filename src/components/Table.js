import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import './Components.css';

const Table = props =>

    <table className="list" style={{width:"95%", margin:"auto", marginTop:"1rem"}}>
      <thead>
        <tr>
          <th colSpan="3" className="text-center">Product List</th>
        </tr>
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
