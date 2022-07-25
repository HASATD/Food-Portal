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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.onContactChange = this.onContactChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.ontypeChange = this.ontypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onheloChange = this.onheloChange.bind(this)
    this.onpasswordChange = this.onpasswordChange.bind(this)
    this.onMnameChange = this.onMnameChange.bind(this)
    this.onShopChange = this.onShopChange.bind(this)
    this.onCtimeChange = this.onCtimeChange.bind(this)
    this.onOtimeChange = this.onOtimeChange.bind(this)
    this.onBatchChange = this.onBatchChange.bind(this)

    this.state = {
      Name: '',
      Email: '',
      Contact_Number: '',
      password: '',
      Age: 0,
      Batch_Name: '',
      type: 'Vendor',
      Managers_Name: '',
      Shop_Name: '',
      Opening_Time: '',
      Closing_Time: ''
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
  onEmailChange(e) {
    this.setState({
      Email: e.target.value
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
    const Buyers = {
      Name: this.state.Name,
      Email: this.state.Email,
      Contact_Number: this.state.Contact_Number,
      Age: this.state.Age,
      type: this.state.type,
      password: this.state.password,
      Batch_Name: this.state.Batch_Name

    }
    const Vendors = {
      Closing_Time: this.state.Closing_Time,
      Opening_Time: this.state.Opening_Time,
      Managers_Name: this.state.Managers_Name,
      Email: this.state.Email,
      Contact_Number: this.state.Contact_Number,
      type: this.state.type,
      password: this.state.password,
      Shop_Name: this.state.Shop_Name

    }

       
    if (this.state.type == "Buyer") {
      if(this.state.Age > 0){
      console.log(Buyers)
      if (!this.state.Name || !this.state.Email || !this.state.Contact_Number || !this.state.Age || !this.state.type || !this.state.password) {
        alert("fill all the fields")
      }
      else {
        axios.post("/api/buyer/register", Buyers).then(res => {
          if (res.data.status === "Already registered") alert("This Email has already been registered");
          console.log("registration succesful" + res.data);
        })

      }
     
      //window.location = "/login"  
    }
    else {
      alert("check credentials")
      this.setState({
        Age : 0
      })
    }
    }
   

    else {
      console.log(Vendors)
      if(!this.state.Managers_Name || !this.state.Shop_Name || !this.state.Email || !this.state.password || !this.state.Contact_Number || !this.state.Opening_Time || !this.state.Closing_Time)
      alert("fill out all the details")
      else {
      axios.post("/api/vendor/register", Vendors).then(res => {
              if (res.data.status==="Already registered") alert("This Email has already been registered");
              console.log("registration succesful" + res.data);
    
    }
    )}
    
   
  }
    
 
    
  }

  render() {


    return (


      <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', margin: '10px' }}>

        <br />
        <br />

        <Form onSubmit={this.onSubmit}>

          <Form.Group
            value={this.state.type}
            onChange={this.ontypeChange}

          >
            <Form.Label>Type:</Form.Label>
            <Form.Control as="select">
              <option value="Vendor">Vendor</option>

              <option value="Buyer">Buyer</option>
            </Form.Control>
          </Form.Group>

          <br />
          {this.state.type == "Vendor" ? (
            <div>
              <br />
              <div className="form-group">
                <label>VendorName: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.Managers_Name}
                  onChange={this.onMnameChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Email: </label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.Email}
                  onChange={this.onEmailChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Password: </label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onpasswordChange}
                  required
                />
              </div>

              <br />
              <div className="form-group">
                <label>Contact_Number: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.Contact_Number}
                  onChange={this.onContactChange}
                  required
                />
              </div>

              <br />
              <div className="form-group">
                <label>Opening Time: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.Opening_Time}
                  onChange={this.onOtimeChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Closing Time: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.Closing_Time}
                  onChange={this.onCtimeChange}
                  required
                />
              </div>
              <br />
              <br />
              <div className="form-group">
                <label>Shop Name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.Shop_Name}
                  onChange={this.onShopChange}
                  required
                />
              </div>
              <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                <input type="submit" value="Register" className="btn btn-primary" />
              </div>
            </div>
          )

            : (
              <div>
                <br />
                <div className="form-group">
                  <label>BuyerName: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Name}
                    onChange={this.onNameChange}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Email: </label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.Email}
                    onChange={this.onEmailChange}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Password: </label>
                  <input
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onpasswordChange}
                    required
                  />
                </div>

                <br />
                <div className="form-group">
                  <label>Contact Number: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Contact_Number}
                    onChange={this.onContactChange}
                    required
                  />

                </div>
                <br />
                <div className="form-group">
                  <label>Age: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Age}
                    onChange={this.onAgeChange}
                    required
                  />
                </div>
                <br />
                <br />
                <Form.Group
            value={this.state.Batch_Name}
            onChange={this.onBatchChange}

          >
            <Form.Label>Batch Name:</Form.Label>
            <Form.Control as="select">
              <option value="UG-1">UG-1</option>

              <option value="UG-2">UG-2</option>
              <option value="UG-3">UG-3</option>
              <option value="UG-4">UG-4</option>
              <option value="UG-5">UG-5</option>


            </Form.Control>
          </Form.Group>
          <br/>
          <br/>

                <div className="form-group">
                  <input type="submit" value="Register" className="btn btn-primary" />
                </div>
              </div>
            )}

        </Form>

      </div>

    );

  }
}



