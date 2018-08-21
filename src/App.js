import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Table from './components/Table';
import NavBar from './components/NavBar';
import AddDictionary from './components/AddDictionary';
import ListOfDictionaries from './components/ListOfDictionaries';
import DisplayDictionary from './components/DisplayDictionary';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import update from 'immutability-helper';


class App extends Component {

    state = {
      list:[],
      dictionaries:[],
      openForm:false,
      dictionaryName:"",
      dictionaryNameError:"",
      domainTerm:"",
      domainTermError:"",
      rangeTerm:"",
      rangeTermError:"",
      snackBarOpen:false,
      multiplePairValues:true,
      isAddingValuesAfterCreation:false
    };

  lastDictionaryId = 0;

  assignDictionaryId = () => {
    const id = this.lastDictionaryId;
    this.lastDictionaryId += 1;
    return id;
  };

  componentDidMount = () =>
    axios.get('/list.json')
         .then(response => this.setState({list:response.data}));

  addDictionary = () =>
    this.setState({openForm:true, dictionaryName:"", domainTerm:"", rangeTerm:"", multiplePairValues:true, isAddingValuesAfterCreation:false});

  addValuesToDictionary = dictionaryName =>
    this.setState({openForm:true, dictionaryName, multiplePairValues:true, isAddingValuesAfterCreation:true});

  closeDictionary = () =>
    this.setState({openForm:false});

  handleInput = e =>
    this.setState({[e.target.name]: e.target.value });

  handleMultiplePairValues = () =>
    this.setState({multiplePairValues:!this.state.multiplePairValues});

  validateTextInput = () => {
    var isError = false;
    const errors = {
      dictionaryNameError:"",
      domainTermError:"",
      rangeTermError:"",
    };
    if(this.state.dictionaryName.length === 0){
      isError = true;
      errors.dictionaryNameError = "Field must not be empty";
    }
    if(this.state.domainTerm.length < 1){
      isError = true;
      errors.domainTermError =  "Insert more than 2 characters";
    }
    if(this.state.rangeTerm.length < 2){
      isError = true;
      errors.rangeTermError = "Insert more than 3 characters";
    }
    this.setState({
      ...errors
    });
    return isError;
  };

  // validateDuplicateDomainsRanges = () => {
  //   var isError = false;
  //   var index = this.state.dictionaries.findIndex(item => item.dictionaryName === this.state.dictionaryName);
  //   console.log(index);
  // };


  dictionarySubmitHandler = e => {
    e.preventDefault();
    const err = this.validateTextInput();
    if(!err){
      var index = this.state.dictionaries.findIndex(item => item.dictionaryName === this.state.dictionaryName);
      // if its new
      if (index === -1){
        this.createNewDictionary();
        this.handleOpenSnackBar();
        } else {
        this.editExistingDictionary(index);
        this.handleOpenSnackBar();
        }
      };
    };

  createNewDictionary = () =>
    this.setState({
      dictionaries:[
      {
       dictionaryName:this.state.dictionaryName,
       isShowing:false,
       id:this.assignDictionaryId(),
       values:[
         {
           domainTerm: this.state.domainTerm,
           rangeTerm: this.state.rangeTerm,
           isEditingValues: false
         }
       ]
      },
     ...this.state.dictionaries,
    ],
      domainTerm:"",
      rangeTerm:"",
      openForm:this.handleFormState()
    });

  validateDuplicateDomainsRanges = index => {
    var isError1 = false;
    var isError2 = false;
    var cumulativeError = false;
    var validateDictionary = this.state.dictionaries[index];
    const validatePairs = validateDictionary.values.map(item=>({domainCheck:item.domainTerm, rangeCheck:item.rangeTerm}));
    for (var i=0; i < validatePairs.length; i++){
      if(this.state.domainTerm === validatePairs[i].domainCheck){
        isError1 = true;
      };
      if(this.state.rangeTerm === validatePairs[i].rangeCheck){
        isError2 = true;
      };
      if(isError1 && isError2){
        cumulativeError = true;
        alert('Duplicate');
      };
    };
    return cumulativeError;
    // Message: "This Domain - Value pair already exist"
  };

  validateForks = index => {
    var isError = false;
    var validateDictionary = this.state.dictionaries[index];
    var validatePairs = validateDictionary.values.map(item=>({domainCheck:item.domainTerm, rangeCheck:item.rangeTerm}));
    for (var i=0; i < validatePairs.length; i++){
      if(this.state.domainTerm === validatePairs[i].domainCheck && this.state.rangeTerm !== validatePairs[i].rangeCheck){
      isError = true;
      alert('Fork');
      };
    };
    return isError;
  };

  validateCycles = index => {
    var isError = false;
    var validateDictionary = this.state.dictionaries[index];
    var validatePairs = validateDictionary.values.map(item=>({domainCheck:item.domainTerm, rangeCheck:item.rangeTerm}));
    for (var i=0; i < validatePairs.length; i++){
      if(this.state.domainTerm === validatePairs[i].rangeCheck && this.state.rangeTerm === validatePairs[i].domainCheck){
        isError = true;
        alert('cycle validated');
      };
    };
    return isError;
  };

  validateChains = index => {
    var isError = false;
    var validateDictionary = this.state.dictionaries[index];
    var validatePairs = validateDictionary.values.map(item=>({domainCheck:item.domainTerm, rangeCheck:item.rangeTerm}));
    for (var i=0; i < validatePairs.length; i++){
      if(this.state.domainTerm === validatePairs[i].rangeCheck){
        isError = true;
        alert('chains validation failed');
      };
    };
    return isError;
  };

  editExistingDictionary = index => {
    var updatedDictionary = this.state.dictionaries[index];
    const error1 = this.validateDuplicateDomainsRanges(index);
    const error2 = this.validateForks(index);
    const error3 = this.validateCycles(index);
    const error4 = this.validateChains(index);


    if (!error1 && !error2 && !error3 & !error4){
    updatedDictionary.values.push({
      domainTerm:this.state.domainTerm,
      rangeTerm:this.state.rangeTerm,
      isEditingValues: false
    });
    this.setState({
      dictionaries:[
        ...this.state.dictionaries.slice(0,index),
        updatedDictionary,
        ...this.state.dictionaries.slice(index+1)
      ],
      domainTerm:"",
      rangeTerm:"",
      openForm:this.handleFormState()
    });
    };
  };

  editValues = (id,row) => {
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionaryToEdit = this.state.dictionaries[index];
    dictionaryToEdit.values[row].isEditingValues = !dictionaryToEdit.values[row].isEditingValues;
    this.setState({
      dictionaries:[
        ...this.state.dictionaries.slice(0,index),
        dictionaryToEdit,
        ...this.state.dictionaries.slice(index+1)
      ]
    });
  };

  inpute = (id,row,text,fieldName) => {
    console.log(id,row,text,fieldName);
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionaryToEdit = this.state.dictionaries[index];
    if(fieldName==="domain"){
      dictionaryToEdit.values[row].domainTerm = text;
    } else if (fieldName==="range") {
      dictionaryToEdit.values[row].rangeTerm = text;
    };
    const updatedDictionaries = update(this.state.dictionaries,{$splice: [[index, 1, dictionaryToEdit]]});
    this.setState({dictionaries:updatedDictionaries});
    // Without helpers
    // this.setState({dictionaries:[...this.state.dictionaries.slice(0,index), dictionaryToEdit,...this.state.dictionaries.slice(index+1)]});
  };

  removeValuePairs = (id,row) => {
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionaryToRemoveValues = this.state.dictionaries[index];
    dictionaryToRemoveValues.values.splice(row,1);
    const updatedDictionaries = update(this.state.dictionaries,{$splice: [[index, 1, dictionaryToRemoveValues]]});
    this.setState({dictionaries:updatedDictionaries});
    // Without helpers
    // this.setState({dictionaries:[...this.state.dictionaries.slice(0,index), dictionaryToRemoveValues, ...this.state.dictionaries.slice(index+1)]});
  };

  showDictionary = id =>
    this.setState({dictionaries:this.state.dictionaries.map(item=>{
      if(item.id!==id){
        return {
          ...item,
          isShowing:false
        }
      }
      if(item.id===id){
        return {
          ...item,
          isShowing:true
        }
      }
      return item;
    })});

  normalizeDictionary = id => {
    var currentList = this.state.list;
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionaryUseToNormalize = this.state.dictionaries[index];
    var pairValuesToNormalize = dictionaryUseToNormalize.values.map(item=>({domainTerm:item.domainTerm, rangeTerm:item.rangeTerm}));
    for (var i=0; i < pairValuesToNormalize.length; i++){
      for (var y=0; y < currentList.length; y++){
        if(pairValuesToNormalize[i].domainTerm === currentList[y].color){
          currentList[y].color = pairValuesToNormalize[i].rangeTerm;
        };
      };
    };
    console.log(pairValuesToNormalize)
    this.setState({list:currentList});
  };

  removeDictionary = id =>
    this.setState({dictionaries:this.state.dictionaries.filter(item=> id !== item.id)});

  handleFormState = () => {
    if (this.state.multiplePairValues){
      return true;
    } else {
      return false;
    }
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackBarOpen: false});
  };

  handleOpenSnackBar = () =>
    this.setState({snackBarOpen: true});


  render() {
    return (
        <div>
          <NavBar addDictionary={this.addDictionary}/>
          <Grid container>

            <Grid item xs={12} md={4} >
              <Table list={this.state.list}/>
            </Grid>

            <Grid item xs={12} md={4}>
              <DisplayDictionary
                dictionaries={this.state.dictionaries}
                handleInput={this.handleInput}
                addValuesToDictionary={this.addValuesToDictionary}
                editValues={this.editValues}
                inpute={this.inpute}
                removeValuePairs={this.removeValuePairs}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ListOfDictionaries
                dictionaries={this.state.dictionaries}
                removeDictionary={this.removeDictionary}
                showDictionary={this.showDictionary}
                normalizeDictionary={this.normalizeDictionary}
              />
            </Grid>

          </Grid>




          <AddDictionary
            openForm={this.state.openForm}
            closeDictionary={this.closeDictionary}
            dictionarySubmitHandler={this.dictionarySubmitHandler}
            handleInput={this.handleInput}
            dictionaryName={this.state.dictionaryName}
            dictionaryNameError={this.state.dictionaryNameError}
            domainTerm={this.state.domainTerm}
            domainTermError={this.state.domainTermError}
            rangeTerm={this.state.rangeTerm}
            rangeTermError={this.state.rangeTermError}
            multiplePairValues={this.state.multiplePairValues}
            handleMultiplePairValues={this.handleMultiplePairValues}
            isAddingValuesAfterCreation={this.state.isAddingValuesAfterCreation}
          />
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Submitted</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackBar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        </div>
    );
  }
}

export default App;
