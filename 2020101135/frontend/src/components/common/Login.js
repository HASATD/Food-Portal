import React, { Component } from 'react';
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Container, Input, Label } from 'reactstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onpasswordChange = this.onpasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Email: "",
            password: "",
            type: "none",
            error: "no"
        }
    }

    onEmailChange(e) {
        this.setState(
            { Email: e.target.value }
        );
    }
    onpasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            Email: this.state.Email,
            password: this.state.password
        }

        console.log(user);
        axios.post('/api/login', user)
            .then(res => {

                if (res.data === "Error: user not found") {
                    alert("Wrong credentials! Try again")
                    window.location = '/login'

                }
                else {
                    console.log("login successful!")
                    console.log(res.data)
                    if (res.data.type === "Vendor") {
                        localStorage.setItem("type", "Vendor")
                        localStorage.setItem("Email", this.state.Email)
                        localStorage.setItem("password",this.state.password)
                        localStorage.setItem("Shop_Name",res.data.Shop_Name)
                        localStorage.setItem("Contact_Number",res.data.Contact_Number)
                        localStorage.setItem("Manager_Name",res.data.Managers_Name)
                        localStorage.setItem("Open_Time",res.data.Opening_Time)
                        localStorage.setItem("Close_Time",res.data.Closing_Time)
                        window.location = '/vendor/dashboard'
                    }
                    else if (res.data.type === "Buyer") {
                        localStorage.setItem("type", "Buyer")
                        localStorage.setItem("Email", this.state.Email)
                        localStorage.setItem("password", this.state.password)
                        localStorage.setItem("Batch_Name",res.data.Batch_Name)
                        localStorage.setItem("Contact_Number",res.data.Contact_Number)
                        localStorage.setItem("Name",res.data.Name)
                        localStorage.setItem("Age",res.data.Age)


                        window.location = '/buyer/dashboard'

                    }

                }

            })
            .catch(err => console.log('Error' + err))

        this.setState = {
            Email: '',
            password: ''
        }


    }




    render() {
        return (
            <Container >
                <h1>Login</h1>
                <Link to="/register" className="btn-link" ><Button color="success">Register</Button></Link>
                <br />
                <br />


                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <Label>Email: </Label>
                        <Input type="Email" className="from-control" value={this.state.Email} onChange={this.onEmailChange} />
                    </div>
                    <br />
                    <div className="form-group">
                        <Label>Password: </Label>
                        <Input type="password" className="from-control" value={this.state.password} onChange={this.onpasswordChange} />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <Input type="submit" value="Login" className="btn btn-outline-primary"></Input>
                    </div>
                </Form>
            </Container>
        )
    }
}
