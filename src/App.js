import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Table from './components/Table';
import NavBar from './components/NavBar';
import AddDictionary from './components/AddDictionary';
import ListOfDictionaries from './components/ListOfDictionaries';
import DisplayDictionary from './components/DisplayDictionary';
import update from 'immutability-helper';
import SnackBarMessages from './components/SnackBarMessages';


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
      isAddingValuesAfterCreation:false,
      editingKeyValue:[],
      snackBarMessage:""
    };

  componentDidMount = () => {
    axios.get('/list.json')
         .then(response => this.setState({list:response.data}));
    this.hydrateStateWithLocalStorage();
  };

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let createNewD = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          createNewD = JSON.parse(createNewD);
          this.setState({ dictionaries: createNewD });
        } catch (e) {
          // handle empty string
          this.setState({ dictionaries: createNewD });
        }
      }
    }
  };

  addDictionary = () => {
    if (this.state.editingKeyValue === undefined || this.state.editingKeyValue.length === 0){
      this.setState({openForm:true, dictionaryName:"", domainTerm:"", rangeTerm:"", multiplePairValues:true, isAddingValuesAfterCreation:false});
    } else {
      this.setState({snackBarOpen:true, snackBarMessage:"Save current values before adding a dictionary"});
    }
  };

  addValuesToDictionary = dictionaryName => {
    var hasErrors;
    const index = this.state.dictionaries.findIndex(item=>item.dictionaryName === dictionaryName);
    var dictionary = this.state.dictionaries[index];
    for (var i=0; i < dictionary.values.length; i++){
      if(dictionary.values[i].error1 || dictionary.values[i].error2 || dictionary.values[i].error3 || dictionary.values[i].error4){
        hasErrors = true;
      }
    }
    if (!hasErrors){
      if (this.state.editingKeyValue === undefined || this.state.editingKeyValue.length === 0){
          // preventing to add more value-pairs before saving existing ones
          this.setState({openForm:true, dictionaryName, domainTerm:"", rangeTerm:"", multiplePairValues:true, isAddingValuesAfterCreation:true});
      } else {
        this.setState({snackBarOpen:true, snackBarMessage:"Save current values before adding new ones"});
      }
    } else {
      this.setState({snackBarOpen:true, snackBarMessage:"Resolve errors before adding new values"})
    }
  };

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
    setTimeout(()=>this.setState({dictionaryNameError:"", domainTermError:"", rangeTermError:""}),6000);
    return isError;
  };

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

  createNewDictionary = () => {
    let createNewD = [
    {
     dictionaryName:this.state.dictionaryName,
     isShowing:false,
     id:Date.now(),
     values:[
       {
         domainTerm: this.state.domainTerm,
         rangeTerm: this.state.rangeTerm,
         isEditingValues: false,
         error1: false,
         error2: false,
         error3: false,
         error4: false,
       }
     ]
    },
   ...this.state.dictionaries,
  ];
    this.setState({
      dictionaries:createNewD,
      domainTerm:"",
      rangeTerm:"",
      snackBarMessage:"New dictionary created",
      openForm:this.handleFormState()
    });
    localStorage.setItem('dictionaries', JSON.stringify(createNewD));
  };

  editExistingDictionary = index => {
    var hasErrors;
    var updatedDictionary = this.state.dictionaries[index];
    for (var y=0; y < updatedDictionary.values.length; y++){
      if(updatedDictionary.values[y].error1 || updatedDictionary.values[y].error2 || updatedDictionary.values[y].error3 || updatedDictionary.values[y].error4){
        hasErrors = true;
      }
    }
    var row = updatedDictionary.values.length;
    if (!hasErrors){
      updatedDictionary.values.push({
        domainTerm:this.state.domainTerm,
        rangeTerm:this.state.rangeTerm,
        isEditingValues: false,
        error1:false,
        error2:false,
        error3:false,
        error4:false
      });
      let editedDictionary = [
        ...this.state.dictionaries.slice(0,index),
        updatedDictionary,
        ...this.state.dictionaries.slice(index+1)
      ];
      this.setState({
        dictionaries:editedDictionary,
        domainTerm:"",
        rangeTerm:"",
        snackBarMessage:"Values added",
        openForm:this.handleFormState()
      });
      // validation upon creation of existing dictionary
      this.validateDuplicateDomainsRanges(updatedDictionary.id,row,this.state.domainTerm,this.state.rangeTerm);
      this.validateForks(updatedDictionary.id,row,this.state.domainTerm,this.state.rangeTerm);
      this.validateCycles(updatedDictionary.id,row,this.state.domainTerm,this.state.rangeTerm);
      this.validateChains(updatedDictionary.id,row,this.state.domainTerm,this.state.rangeTerm);
      localStorage.setItem('dictionaries', JSON.stringify(editedDictionary));
    } else {
      this.setState({snackBarOpen:true, snackBarMessage:"Correct the errors before adding more pairs"});
    }
  };

  editValues = (id,row) => {
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionaryToEdit = this.state.dictionaries[index];
    if (JSON.stringify(this.state.editingKeyValue) !== JSON.stringify([id,row])){
      this.setState({
      editingKeyValue:[id,row],
      domainTerm:dictionaryToEdit.values[row].domainTerm,
      rangeTerm:dictionaryToEdit.values[row].rangeTerm
      });
    } else {
      dictionaryToEdit.values[row].domainTerm = this.state.domainTerm;
      dictionaryToEdit.values[row].rangeTerm = this.state.rangeTerm;

      const updatedDictionaries = update(this.state.dictionaries,{$splice: [[index, 1, dictionaryToEdit]]});
      this.setState({dictionaries:updatedDictionaries,editingKeyValue:[]});
      localStorage.setItem('dictionaries', JSON.stringify(updatedDictionaries));
    }
  };

  validateDuplicateDomainsRanges = (id, row, dom, ran) => {
    var isError = false;
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var validateDictionary = this.state.dictionaries[index];

    var validatePairs = validateDictionary.values.map(item=>({domainCheck:item.domainTerm, rangeCheck:item.rangeTerm}));

    for (var i=0; i < validatePairs.length; i++){
      if(dom === validatePairs[i].domainCheck && ran === validatePairs[i].rangeCheck && row !== i){
        isError = true;
        validateDictionary.values[row].error1 = true;
        // duplicate error can never be a fork error. setting error2 as false in order to reset it in case it already exist
        validateDictionary.values[row].error2 = false;
        validateDictionary.values[i].error2 = false;
      } else if(dom !== validatePairs[i].domainCheck && row !== i){
        validateDictionary.values[row].error1 = false;
        validateDictionary.values[i].error1 = false;
      }
    };
    // Setting state only if there is an error
    if(isError){
      const updatedDictionaries = update(this.state.dictionaries,{$splice: [[index, 1, validateDictionary]]});
      this.setState({dictionaries:updatedDictionaries});
    }
    return isError;
  };

  validateForks = (id, row, dom, ran) => {
    var existingError = false;
    var isError = false;
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var validateDictionary = this.state.dictionaries[index];
    existingError = validateDictionary.values[row].error2;

    var validatePairs = validateDictionary.values.map(item=>({domainCheck:item.domainTerm, rangeCheck:item.rangeTerm}));

    for (var i=0; i < validatePairs.length; i++){
      if(dom===validatePairs[i].domainCheck && ran !==validatePairs[i].rangeCheck && row !== i){
        isError = true;
        validateDictionary.values[row].error2 = true;
        validateDictionary.values[row].error1 = false;
        validateDictionary.values[i].error1 = false;
      } else if (dom !==validatePairs[i].domainCheck && row !==i){
        validateDictionary.values[row].error2 = false;
        validateDictionary.values[i].error2 = false;
      }
    }
    // Setting state only if there is an error
    if((existingError && !isError) || isError){
      const updatedDictionaries = update(this.state.dictionaries,{$splice: [[index, 1, validateDictionary]]});
      this.setState({dictionaries:updatedDictionaries});
    };
    return isError;
  };

  validateCycles = (id, row, dom, ran) => {
    var existingError = false;
    var isError = false;
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var validateDictionary = this.state.dictionaries[index];
    existingError = validateDictionary.values[row].error3;

    var validatePairs = validateDictionary.values.map(item=>({domainCheck:item.domainTerm, rangeCheck:item.rangeTerm}));

    for (var i=0; i < validatePairs.length; i++){
      if((dom === validatePairs[i].rangeCheck && row !== i) && (ran === validatePairs[i].domainCheck && row !== i)){
        isError = true;
        validateDictionary.values[row].error3 = true;
      } else if((dom !== validatePairs[i].rangeCheck && row !== i) || (ran !== validatePairs[i].domainCheck && row !== i)){
        validateDictionary.values[row].error3 = false;
        validateDictionary.values[i].error3 = false;
      }
    };


    // Setting state only if there is an error
    if((existingError && !isError) || isError){
      const updatedDictionaries = update(this.state.dictionaries,{$splice: [[index, 1, validateDictionary]]});
      this.setState({dictionaries:updatedDictionaries});
    };
    return isError;
  };

  validateChains = (id, row, dom, ran) => {
    var isError = false;
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var validateDictionary = this.state.dictionaries[index];

    var validatePairs = validateDictionary.values.map(item=>({domainCheck:item.domainTerm, rangeCheck:item.rangeTerm}));

    for (let i=0; i < validatePairs.length; i++){
      if((dom === validatePairs[i].rangeCheck && row !== i)||(ran === validatePairs[i].domainCheck && row !== i)){
        isError = true;
        validateDictionary.values[row].error4 = true;
      } else if (dom !== validatePairs[i].rangeCheck && row !== i){
        validateDictionary.values[row].error4 = false;
        validateDictionary.values[i].error4 = false;
      } else if (ran !== validatePairs[i].domainCheck && row !== i){
        validateDictionary.values[row].error4 = false;
        validateDictionary.values[i].error4 = false;
      }
    };
    if(isError){
      const updatedDictionaries = update(this.state.dictionaries,{$splice: [[index, 1, validateDictionary]]});
      this.setState({dictionaries:updatedDictionaries});
    }
    return isError;
  };

  inpute = (id,row,text,fieldName) => {
    var domainTermValue = this.state.domainTerm;
    var rangeTermValue = this.state.rangeTerm;
    if(fieldName==="domain"){
      domainTermValue = text;
      this.setState({domainTerm:text});
    } else if (fieldName==="range") {
      rangeTermValue = text;
      this.setState({rangeTerm:text});
    };
    this.validateDuplicateDomainsRanges(id, row, domainTermValue, rangeTermValue);
    this.validateForks(id, row, domainTermValue, rangeTermValue);
    this.validateCycles(id, row, domainTermValue, rangeTermValue);
    this.validateChains(id, row, domainTermValue, rangeTermValue);
  };

  removeValuePairs = (id,row) => {
    var firstPair;
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionaryToRemoveValues = this.state.dictionaries[index];
    dictionaryToRemoveValues.values.splice(row,1);

    firstPair = dictionaryToRemoveValues.values[0];
    if(firstPair){
      this.validateDuplicateDomainsRanges(id, 0, firstPair.domainTerm, firstPair.rangeTerm);
      this.validateForks(id, 0, firstPair.domainTerm, firstPair.rangeTerm);
      this.validateCycles(id, 0, firstPair.domainTerm, firstPair.rangeTerm);
      this.validateChains(id, 0, firstPair.domainTerm, firstPair.rangeTerm);
    }
    const updatedDictionaries = update(this.state.dictionaries,{$splice: [[index, 1, dictionaryToRemoveValues]]});
    this.setState({dictionaries:updatedDictionaries, editingKeyValue:[]});
    localStorage.setItem('dictionaries', JSON.stringify(updatedDictionaries));
    // Without helpers
    // this.setState({dictionaries:[...this.state.dictionaries.slice(0,index), dictionaryToRemoveValues, ...this.state.dictionaries.slice(index+1)]});
  };

  preventShowDictionaryWhenEditing = () => {
    var isEditing = false;
    if(this.state.editingKeyValue.length !== 0 || this.state.editingKeyValue === undefined){
      isEditing = true;
    };
    return isEditing;
  };

  showDictionary = dictionaryName => {
    const editing = this.preventShowDictionaryWhenEditing();
    if (!editing){
      this.setState({dictionaries:this.state.dictionaries.map(item=>{
        if(item.dictionaryName!==dictionaryName){
          return {
            ...item,
            isShowing:false
          }
        }
        if(item.dictionaryName===dictionaryName){
          return {
            ...item,
            isShowing:true
          }
        }
        return item;
      })})
    } else {
        this.setState({snackBarOpen:true,snackBarMessage:"Save values before displaying a different dictionary"});
    };
  };

  removeDictionary = id => {
    const dictionaries = [...this.state.dictionaries];
    const updatedDictionaries = dictionaries.filter(item=>item.id !== id);
    this.setState({dictionaries:updatedDictionaries,editingKeyValue:[]});
    localStorage.setItem('dictionaries', JSON.stringify(updatedDictionaries));
  };

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

  preventNormalizeWhenErrors = id => {
    var hasErrors = false
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionaryUseToNormalize = this.state.dictionaries[index];
    for (var y=0; y < dictionaryUseToNormalize.values.length; y++){
      if(dictionaryUseToNormalize.values[y].error1 || dictionaryUseToNormalize.values[y].error2 || dictionaryUseToNormalize.values[y].error3 || dictionaryUseToNormalize.values[y].error4){
        hasErrors = true;
      }
    }
    return hasErrors;
  };

  normalizeDictionary = id => {
    const err = this.preventNormalizeWhenErrors(id);
    if (this.state.editingKeyValue === undefined || this.state.editingKeyValue.length === 0){
      if (!err){
        var currentList = this.state.list;
        const index = this.state.dictionaries.findIndex(item=>item.id === id);
        var dictionaryUseToNormalize = this.state.dictionaries[index];

        var pairValuesToNormalize = dictionaryUseToNormalize.values.map(item=>({domainTerm:item.domainTerm, rangeTerm:item.rangeTerm}));
        for (var i=0; i < pairValuesToNormalize.length; i++){
          for (var k=0; k < currentList.length; k++){
            if(pairValuesToNormalize[i].domainTerm === currentList[k].color){
              currentList[k].color = pairValuesToNormalize[i].rangeTerm;
            };
          };
        };
        this.setState({list:currentList,snackBarMessage:"Normalization Successful", snackBarOpen:true, editingKeyValue:[]});
      } else {
        this.setState({snackBarMessage:"Correct the errors before Normalizing", snackBarOpen:true});
      }
    } else {
      this.setState({snackBarMessage:"Save values before normalizing", snackBarOpen:true});
    }
  };

  render() {
    localStorage.setItem('list',JSON.stringify(this.state.list));
    return (
        <div>
          <NavBar addDictionary={this.addDictionary}/>
          <Grid container  justify="center">
            <Grid item xs={12} md={3} >
              <Table
               list={this.state.list}
               />
            </Grid>
            <Grid item xs={12} md={5}>
              <DisplayDictionary
                editingKeyValue={this.state.editingKeyValue}
                editingDomainTerm={this.state.domainTerm}
                editingRangeTerm={this.state.rangeTerm}
                dictionaries={this.state.dictionaries}
                handleInput={this.handleInput}
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
                addValuesToDictionary={this.addValuesToDictionary}
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
          <SnackBarMessages
            snackBarOpen={this.state.snackBarOpen}
            handleCloseSnackBar={this.handleCloseSnackBar}
            snackBarMessage={this.state.snackBarMessage}
          />
        </div>
    );
  }
}

export default App;
