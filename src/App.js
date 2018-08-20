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
    this.setState({openForm:true, dictionaryName:"", multiplePairValues:true});

  closeDictionary = () =>
    this.setState({openForm:false});

  handleInput = e =>
    this.setState({[e.target.name]: e.target.value });

  inpute = (id,e) => {
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionary = this.state.dictionaries[index];

    console.log(index);

    this.setState({domainTerm:e.target.value});



  };


  handleMultiplePairValues = () =>
    this.setState({multiplePairValues:!this.state.multiplePairValues});

  validate = () => {
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

  dictionarySubmitHandler = e => {
    e.preventDefault();
    const err = this.validate();
    if(!err){
      var index = this.state.dictionaries.findIndex((obj => obj.dictionaryName === this.state.dictionaryName));
      // if its new
      if (index === -1){
        this.createNewDictionary();
        this.handleOpenSnackBar();
        } else {
        this.editExistingDictionary(index);
        this.handleOpenSnackBar();
        }
      }
    };

  createNewDictionary = () =>
    this.setState({
      dictionaries:[
      {
       dictionaryName:this.state.dictionaryName,
       isEditing:false,
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

  editExistingDictionary = index => {
    var updatedDictionary = this.state.dictionaries[index];
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
    })
  }

  editValues = (id,row) => {
    const index = this.state.dictionaries.findIndex(item=>item.id === id);
    var dictionaryToEdit = this.state.dictionaries[index];
    dictionaryToEdit.values[row].isEditingValues = true;

    this.setState({
      dictionaries:[
        ...this.state.dictionaries.slice(0,index),
        dictionaryToEdit,
        ...this.state.dictionaries.slice(index+1)
      ]
    })
  };

  showDictionary = id =>
    this.setState({dictionaries:this.state.dictionaries.map(item=>{
      if(item.id!==id){
        return {
          ...item,
          isEditing:false
        }
      }
      if(item.id===id){
        return {
          ...item,
          isEditing:true
        }
      }
      return item;
    })});

  handleFormState = () => {
    if (this.state.multiplePairValues){
      return true;
    } else {
      return false;
    }
  };

  removeDictionary = id =>
    this.setState({dictionaries:this.state.dictionaries.filter(item=> id !== item.id)});

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
                dictionarySubmitHandler={this.dictionarySubmitHandler}
                editValues={this.editValues}
                inpute={this.inpute}

              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ListOfDictionaries
                dictionaries={this.state.dictionaries}
                removeDictionary={this.removeDictionary}
                showDictionary={this.showDictionary}
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
