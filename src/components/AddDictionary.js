import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Form from './Form';

const AddDictionary = props =>
  <div>
    <Modal
        open={props.openForm}
        onClose={props.closeDictionary}
      >
      <Form
        dictionarySubmitHandler={props.dictionarySubmitHandler}
        dictionaryName={props.dictionaryName}
        dictionaryNameError={props.dictionaryNameError}
        domainTerm={props.domainTerm}
        domainTermError={props.domainTermError}
        rangeTerm={props.rangeTerm}
        rangeTermError={props.rangeTermError}
        handleInput={props.handleInput}
        multiplePairValues={props.multiplePairValues}
        handleMultiplePairValues={props.handleMultiplePairValues}
        isAddingValuesAfterCreation={props.isAddingValuesAfterCreation}
      />
    </Modal>
  </div>

AddDictionary.propTypes = {
  dictionarySubmitHandler: PropTypes.func.isRequired,
  dictionaryName: PropTypes.string.isRequired,
  domainTerm: PropTypes.string.isRequired,
  rangeTerm: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  multiplePairValues: PropTypes.bool.isRequired
};

export default AddDictionary;
