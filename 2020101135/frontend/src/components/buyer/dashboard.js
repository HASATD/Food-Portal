import { Component, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dropdown from 'react-bootstrap/Dropdown'
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { ReactComponent as Logo } from "../../logo.svg";
import { Container, Input, Label } from 'reactstrap';

export default class BuyerDash extends Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.onContactChange = this.onContactChange.bind(this);
    
    this.ontypeChange = this.ontypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onheloChange = this.onheloChange.bind(this)
    this.onpasswordChange = this.onpasswordChange.bind(this)
    this.onMnameChange = this.onMnameChange.bind(this)
    this.onShopChange = this.onShopChange.bind(this)
    this.onCtimeChange = this.onCtimeChange.bind(this)
    this.onOtimeChange = this.onOtimeChange.bind(this)
    this.onBatchChange = this.onBatchChange.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.onVieworders = this.onVieworders.bind(this)
    this.onAddmoney = this.onAddmoney.bind(this)
    this.onAddchange = this.onAddchange.bind(this)
    this.onFoodview = this.onFoodview.bind(this)

   
    
    this.state = {
      Name: localStorage.getItem("Name"),
      Email: localStorage.getItem("Email"),
      Contact_Number: localStorage.getItem("Contact_Number"),
      password: localStorage.getItem("password"),
      Age: localStorage.getItem("Age"),
      Batch_Name: localStorage.getItem("Batch_Name"),
      type: 'Buyer',
      Amount: 0,
      Add: 0,
      details:[]
      
    }

  }
  componentDidMount() {
    const Wallet = {
     Email: localStorage.getItem("Email")

  }
  console.log(Wallet)
    
    axios.post("/api/wallet/condition",Wallet)
    .then(response => {
        this.setState({
           details: response.data
        })
       
        console.log(response.data)
        
        this.setState({
          Amount : Number(this.state.details[0].Amount)
          
        })
        console.log(this.state.Amount)
    })
    .catch(err => {
      console.log('Error: '+err)
    })

  }
 
  onheloChange(e) {
    this.setState({
      helo: e.target.value
    });
  }
  onNameChange(e) {
    this.setState({
      Name: e.target.value
    });
  }
  
  onContactChange(e) {
    this.setState({
      Contact_Number: e.target.value
    });
  }
  
  onAgeChange(e) {   
    this.setState({
      Age: e.target.value
    });
  }
  ontypeChange(e) {
    this.setState({
      type: e.target.value
    });
  }
  onpasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  onMnameChange(e) {
    this.setState({
      Managers_Name: e.target.value
    });
  }
  onShopChange(e) {
    this.setState({
      Shop_Name: e.target.value
    });
  }
  onOtimeChange(e) {
    this.setState({
      Opening_Time: e.target.value
    });
  }
  onCtimeChange(e) {
    this.setState({
      Closing_Time: e.target.value
    });
  }
  onBatchChange(e){
    this.setState({
      Batch_Name: e.target.value
    })
  }
  
   onVieworders(e){
      e.preventDefault();
      window.location = "/buyer/orderdashboard"
   }
   onFoodview(e){
     e.preventDefault();
     window.location = "/buyer/fooddashboard"
   }

    onAddmoney(e){
      e.preventDefault();
      const Wallet = {
        Email: this.state.Email,
        Amount: Number(this.state.Amount)+Number(this.state.Add),
      }
      this.setState({
        Amount: Number(this.state.Amount)+Number(this.state.Add),
        Add: 0        
      })
      console.log(this.state.Amount)
      
      console.log(Wallet)
      

      axios.post("/api/wallet/update",Wallet)
      .then(response => {
        console.log("Amount Added: " + response.data )
      })
      .catch(err=> {
        console.log("Error: "+err)
      })

    }
    onAddchange(e){
      this.setState({
        Add: e.target.value
      });
    }

  onSubmit(e) {
    e.preventDefault();

    if(this.state.Age > 0){
    const Buyers = {
      Name: this.state.Name,
      Email: localStorage.getItem("Email"),
      Contact_Number: this.state.Contact_Number,
      Age: this.state.Age,
      type: 'Buyer',
      password: this.state.password,
      Batch_Name: this.state.Batch_Name

    }

    localStorage.removeItem("password")
    localStorage.setItem("password",this.state.password)
    localStorage.removeItem("Name")
    localStorage.setItem("Name",this.state.Name)
    localStorage.removeItem("Batch_Name")
    localStorage.setItem("Batch_Name",this.state.Batch_Name)
    localStorage.removeItem("Age")
    localStorage.setItem("Age",this.state.Age)
    localStorage.removeItem("Contact_Number")
    localStorage.setItem("Contact_Number",this.state.Contact_Number)

   
    
    if (this.state.type == "Buyer") {
      console.log(Buyers)
      
        axios.post("/api/buyer/update", Buyers).then(res => {
          
          console.log("updation succesful" + res.data);
        })
       
     
      this.state = {
        Name: localStorage.getItem("Name"),
        Email: localStorage.getItem("Email"),
        Contact_Number: localStorage.getItem("Contact_Number"),
        password: localStorage.getItem("password"),
        Age: localStorage.getItem("Age"),
        Batch_Name: localStorage.getItem("Batch_Name"),
        type: 'Buyer',
       
        
      }
          
    }
     

  }

  else {
    alert("Invalid Credentials!")
    window.location = "/buyer/dashboard"
  }

      
 
    
  }

  onLogout(e){
      e.preventDefault()
      localStorage.clear()
      window.location = "/login"
  }

  render() {


    return (

<Container>
    <h1>Profile</h1>
              <br/>
        <Grid container align={"center"} spacing={1}>

        <Button variant="contained" onClick={this.onVieworders} style={{margin:'10px'}}>
          All Orders
        </Button>
        <Grid item xs={20}>
       
        <Button variant="contained" onClick={this.onFoodview} style={{margin:'10px'}}>
          Food Items
        </Button>
        </Grid>
        <Grid item xs={20}>
        <TextField
          label="Amount"
          variant="outlined"
          value={this.state.Amount}
          readOnly
        />
        <TextField
          label="Add"
          variant="outlined"
          value={this.state.Add}
          onChange={this.onAddchange}
        />
                <Button variant="contained" onClick={this.onAddmoney} style={{margin:'10px'}}>
          Add money
        </Button>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={this.state.Name}
          onChange={this.onNameChange}
        />
        <Button variant="contained" onClick={this.onSubmit} style={{margin:'10px'}}>
          Edit
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={localStorage.getItem("Email")}
          readOnly
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={this.state.password}
          onChange={this.onpasswordChange}
        />
         <Button variant="contained" onClick={this.onSubmit} style={{margin:'10px'}}>
          Edit
        </Button>

      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact"
          variant="outlined"
          value={this.state.Contact_Number}
          onChange={this.onContactChange}
        />
         <Button variant="contained" onClick={this.onSubmit} style={{margin:'10px'}}>
          Edit
        </Button>

      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={this.state.Age}
          onChange={this.onAgeChange}
        />
         <Button variant="contained" onClick={this.onSubmit} style={{margin:'10px'}}>
          Edit
        </Button>

      </Grid>
     
      <Grid item xs={12}>
      <Form.Group
            value={this.state.Batch_Name}
            onChange={this.onBatchChange}
            label = "Batch"
            variant = "outlined"
            

          >
            <Form.Label>Batch Name:</Form.Label>
            <Form.Control as="select" className="w-50">
              <option value ={this.state.Batch_Name}>{this.state.Batch_Name}</option>
              <option value="UG-1">UG-1</option>

              <option value="UG-2">UG-2</option>
              <option value="UG-3">UG-3</option>
              <option value="UG-4">UG-4</option>
              <option value="UG-5">UG-5</option>


            </Form.Control>
            <Button variant="contained" onClick={this.onSubmit} style={{margin:'10px'}}>
          Edit
        </Button>
          </Form.Group>

         

      </Grid>
      <Grid item xs={12}>
        
         <Button variant="contained" onClick={this.onLogout} style={{margin:'10px'}}>
          Log out
        </Button>

      </Grid>      
     
     
     
     


      
    </Grid>

        
     </Container>

    );

  }
  }



