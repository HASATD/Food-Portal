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

export default class VendorDash extends Component {
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
    this.onFoodview = this.onFoodview.bind(this)
    this.onFoodcreateview = this.onFoodcreateview.bind(this)
    this.onOrderview = this.onOrderview.bind(this)

   
    
    this.state = {
      type:  localStorage.getItem("type"),
      Email:  localStorage.getItem("Email"),
       password: localStorage.getItem("password"),
       Shop_Name: localStorage.getItem("Shop_Name"),
       Contact_Number: localStorage.getItem("Contact_Number"),
       Managers_Name: localStorage.getItem("Manager_Name"),
       Opening_Time: localStorage.getItem("Open_Time"),
       Closing_Time: localStorage.getItem("Close_Time")

    }

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

  onSubmit(e) {
    e.preventDefault();
    const Vendors = {
        type:  "Vendor",
        Email:  localStorage.getItem("Email"),
         password: this.state.password,
         Shop_Name: this.state.Shop_Name,
         Contact_Number: this.state.Contact_Number,
         Managers_Name: this.state.Managers_Name,
         Opening_Time:this.state.Opening_Time,
         Closing_Time: this.state.Closing_Time

    }

    localStorage.removeItem("password")
    localStorage.setItem("password",this.state.password)
    localStorage.removeItem("Manager_Name")
    localStorage.setItem("Manager_Name",this.state.Managers_Name)
    localStorage.removeItem("Contact_Number")
    localStorage.setItem("Contact_Number",this.state.Contact_Number)
    localStorage.removeItem("Shop_Name")
    localStorage.setItem("Shop_Name",this.state.Shop_Name)
    localStorage.removeItem("Open_Time")
    localStorage.setItem("Open_Time",this.state.Opening_Time)
    localStorage.removeItem("Close_Time")
    localStorage.setItem("Close_Time",this.state.Closing_Time)


   
    
    if (this.state.type == "Vendor") {
      console.log(Vendors)
      
        axios.post("/api/vendor/update", Vendors).then(res => {
          
          console.log("updation succesful" + res.data);
        })
       
     
      this.state = {
        type:  localStorage.getItem("type"),
      Email:  localStorage.getItem("Email"),
       password: localStorage.getItem("password"),
       Shop_Name: localStorage.getItem("Shop_Name"),
       Contact_Number: localStorage.getItem("Contact_Number"),
       Managers_Name: localStorage.getItem("Manager_Name"),
       Opening_Time: localStorage.getItem("Open_Time"),
       Closing_Time: localStorage.getItem("Close_Time")
       
        
      }
          
    }

    
   // window.location ""
  
    
 
    
  }

  onLogout(e){
      e.preventDefault()
      localStorage.clear()
      window.location = "/login"
  }

  onFoodview(e){
    e.preventDefault()
    window.location = "/vendor/fooddashboard"
  }
  onFoodcreateview(e){
    e.preventDefault()
    window.location = "/vendor/createfood"
  }
  onOrderview(e){
    e.preventDefault()
    window.location = "/vendor/orderdashboard"
  }


  render() {


    return (

<container>
    <h1>Profile</h1>
              <br/>
        <Grid container align={"center"} spacing={1}>
        <Grid item xs={12}>
        
        <Button variant="contained" onClick={this.onFoodview} style={{margin:'10px'}}>
         Food Items
       </Button>
       <Button variant="contained" onClick={this.onFoodcreateview} style={{margin:'10px'}}>
         Create Food Item
       </Button>
       <Button variant="contained" onClick={this.onOrderview} style={{margin:'10px'}}>
         All Orders
       </Button>  


     </Grid>  
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={this.state.Managers_Name}
          onChange={this.onMnameChange}
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
          label="Shop Name"
          variant="outlined"
          value={this.state.Shop_Name}
          onChange={this.onShopChange}
        />
         <Button variant="contained" onClick={this.onSubmit} style={{margin:'10px'}}>
          Edit
        </Button>

      </Grid>
     
      <Grid item xs={12}>
        <TextField
          label="Open Time"
          variant="outlined"
          value={this.state.Opening_Time}
          onChange={this.onOtimeChange}
        />
         <Button variant="contained" onClick={this.onSubmit} style={{margin:'10px'}}>
          Edit
        </Button>

      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Close Time"
          variant="outlined"
          value={this.state.Closing_Time}
          onChange={this.onCtimeChange}
        />
         <Button variant="contained" onClick={this.onSubmit} style={{margin:'10px'}}>
          Edit
        </Button>

      </Grid>

      <Grid item xs={12}>
        
         <Button variant="contained" onClick={this.onLogout} style={{margin:'10px'}}>
          Log out
        </Button>

      </Grid>      
     
     
     
     


      
    </Grid>

        
     </container>

    );

  }
  }



