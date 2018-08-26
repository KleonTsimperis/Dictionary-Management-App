import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    background:'linearGradient(#777, #444)'
  },
  item1: {
    marginRight: 'auto'
  },
  item2: {
    margin: '5px',

  },
  item3: {
    margin: '5px',
  },
  item4: {
    margin: 'auto',
    height: '18px'
  }
};

const DictionaryCRUD = props => {
  const { classes } = props;
  return(
    <li className={classes.container}>
      <h3 className={classes.item1}>{props.dictionaryName}</h3>
      <Button className={classes.item2} variant="contained" color="primary" size="small" onClick={props.showDictionary}>
          Display
      </Button>
      <Button className={classes.item2} variant="contained" color="primary" size="small" onClick={props.addValuesToDictionary}>
          Add Values
      </Button>
      <Button className={classes.item2} variant="contained" color="primary" size="small" onClick={props.normalizeDictionary}>
          Normalize
      </Button>
      <Button className={classes.item3} variant="contained" color="secondary" size="small" onClick={props.removeDictionary}>
          <DeleteIcon className={classes.item4} />
      </Button>
    </li>
  )
};

DictionaryCRUD.propTypes = {
  classes: PropTypes.object.isRequired,
  showDictionary: PropTypes.func.isRequired,
  addValuesToDictionary: PropTypes.func.isRequired,
  normalizeDictionary: PropTypes.func.isRequired,
  removeDictionary: PropTypes.func.isRequired,
};

export default withStyles(styles)(DictionaryCRUD);
