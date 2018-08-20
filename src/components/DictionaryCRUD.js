import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  item1: {
    marginRight: 'auto'
  },
  item2: {
    margin: '5px'
  }
}

const DictionaryCRUD = props => {
  const { classes } = props;
  return(
    <li className={classes.container}>
      <h3 className={classes.item1}>{props.dictionaryName}</h3>
      <Button className={classes.item2} variant="contained" color="primary" onClick={()=>props.editDictionary()}>
          Edit
      </Button>
      <Button className={classes.item2} variant="contained" color="primary">
          Normalize
      </Button>
      <Button className={classes.item2} variant="contained" color="secondary" onClick={()=>props.removeDictionary()}>
          Remove
      </Button>
    </li>
  )
};

DictionaryCRUD.propTypes = {
  classes: PropTypes.object.isRequired,
  removeDictionary: PropTypes.func.isRequired,
  editDictionary: PropTypes.func.isRequired
};


export default withStyles(styles)(DictionaryCRUD);