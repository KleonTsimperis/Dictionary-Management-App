import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1
  },
  container: {
    display: 'flex'
  },
  title: {
    marginRight: 'auto'
  }
};



const NavBar = props => {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.container}>
          <Typography variant="title" color="inherit" className={classes.title}>
            Dictionary Management App
          </Typography>
          <Button variant="contained" color="primary" className={classes.button} onClick={()=>props.addDictionary()}>
            Add Dictionary
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  addDictionary: PropTypes.func.isRequired
}


export default withStyles(styles)(NavBar);
