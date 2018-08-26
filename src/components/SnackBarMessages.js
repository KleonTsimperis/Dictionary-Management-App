import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

const SnackBarMessages = props =>

  <Snackbar
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right'
  }}
  open={props.snackBarOpen}
  autoHideDuration={4500}
  onClose={props.handleCloseSnackBar}
  ContentProps={{
    'aria-describedby': 'message-id',
  }}
  message={<span>{props.snackBarMessage}</span>}
  action={[
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={props.handleCloseSnackBar}
    >
      <CloseIcon />
    </IconButton>,
  ]}
  />


SnackBarMessages.propTypes = {
  snackBarStatus: PropTypes.bool,
  snackBarOpen: PropTypes.bool,
  handleCloseSnackBar: PropTypes.func
};

export default SnackBarMessages;
