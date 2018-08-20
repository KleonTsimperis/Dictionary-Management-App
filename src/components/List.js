import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Components.css';


const List = props =>
  <Fragment>
    {props.list.map(item=>
          <tr key={item.id}>
            <td>{item.product}</td>
            <td>{item.color}</td>
            <td>{item.price}</td>
          </tr>
    )}
  </Fragment>;

List.propTypes = {
  list: PropTypes.array.isRequired
}

export default List;
