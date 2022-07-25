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
import {useParams} from "react-router-dom"


class EditFood extends Component {
   
    constructor(props) {
        super(props);
        this.onItemChange = this.onItemChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
        this.onAddonChange = this.onAddonChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onMnameChange = this.onMnameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.onGoback = this.onGoback.bind(this)
         
        this.state = {
            Item_Name: '',
            Price: 0,
            Rating: 0,

            Type: '',
            Tags: [],
            Addons: [{ Add_Name: "", price: 0 }],
            Email: localStorage.getItem("Email"),
            Managers_Name: localStorage.getItem("Manager_Name")


        }

    }
    componentDidMount(){
        const { id } = this.props.params;
        axios.get('/api/food/'+id)
        .then(response => {
            this.setState({
                Item_Name: response.data.Item_Name,
                Price: response.data.Price,
                Rating: response.data.Rating,
                Type: response.data.Type,
                Tags: response.data.Tags,
                Addons: response.data.Addons,
                Email: response.data.Email,
                Managers_Name: response.data.Managers_Name,
            })
            
            console.log(response.data)

        }).catch(function(error){
            console.log(error)
        })}
    
    onItemChange(e) {
        this.setState({
            Item_Name: e.target.value
        });
    }
    onPriceChange(e) {
        this.setState({
            Price: e.target.value
        });
    }
    onRatingChange(e) {
        this.setState({
            Rating: e.target.value
        });
    }
    onMnameChange(e) {
        this.setState({
            Managers_Name: e.target.value
        });
    }
    onEmailChange(e) {
        this.setState({
            Email: e.target.value
        });
    }
    onTypeChange(e) {
        this.setState({
            Type: e.target.value
        });
    }
    onTagChange(e) {
        this.setState({
            Tags: e.target.value
        });
    }
    onAddonChange(e) {
        this.setState({
            Addons: e.target.value
        })
    }

    onGoback(e){
        e.preventDefault();
        window.location = "/vendor/dashboard"
    }

    onSubmit(e) {
        e.preventDefault();

        const Food = {
            Item_Name: this.state.Item_Name,
            Price: this.state.Price,
            Rating: this.state.Rating,
            Type: this.state.Type,
            Tags: this.state.Tags,
            Addons: this.state.Addons,
            Email: localStorage.getItem("Email"),
            Managers_Name: localStorage.getItem("Manager_Name")

        }
        const { id } = this.props.params;
     
        axios.post("/api/food/update/"+id, Food).then(res => {
            console.log( res.data);
        })
    
        
       
    }


    render() {

        return (

            <container>
                <h1>Edit Exercise </h1>
                <br />
                <Grid container align={"center"} spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            label="Item Name"
                            variant="outlined"
                            value={this.state.Item_Name}
                            onChange={this.onItemChange}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            variant="outlined"
                            value={this.state.Price}
                            onChange={this.onPriceChange}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Type"
                            variant="outlined"
                            value={this.state.Type}
                            onChange={this.onTypeChange}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Tags"
                            variant="outlined"
                            value={this.state.Tags}
                            onChange={this.onTagChange}
                        />

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
                            label="Manager's Name"
                            variant="outlined"
                            value={localStorage.getItem("Manager_Name")}
                            readOnly
                        />

                    </Grid>


                    <Grid item xs={12}>

                        <Button variant="contained" onClick={this.onSubmit} style={{ margin: '10px' }}>
                            Edit
                        </Button>

                    </Grid>
                    <Grid item xs={12}>

                        <Button variant="contained" onClick={this.onGoback} style={{ margin: '10px' }}>
                            Go back
                        </Button>

                    </Grid>







                </Grid>


            </container>

        )

    }


}
export default (props) => (
    <EditFood
        {...props}
        params={useParams()}
    />
);