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
import { useParams } from "react-router-dom"


class SingleOrder extends Component {

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
       
        this.onGoback = this.onGoback.bind(this)
        this.onStatusChange = this.onStatusChange.bind(this)
        this.onPickup = this.onPickup.bind(this)
        this.onratebutton = this.onratebutton.bind(this)
        


        this.state = {
            Item_Name: '',
            Price: 0,
            Rating: 0,

            Type: '',
            Tags: [],
            Addons: [{ Add_Name: "", price: 0 }],
            Vendor_Email: '',
            Managers_Name: '',
            Status: '',
            Quantity: 0,
            Buyer_Email: '',
            Total_Completed: 0,
            stage: 0,
            Placed_Time: '',
            Total_Sold: 0,
            Sold_Details: [],
            Avg_Rating: 0,
            Food_Details: [],
            All_Addons: [],
            Order_Rating: 0,
        }

    }
    componentDidMount() {
        const { id } = this.props.params;
        axios.get('/api/order/' + id)
            .then(response => {
                this.setState({
                    Item_Name: response.data.Item_Name,
                    Price: response.data.Price,
                    Rating: response.data.Rating,
                    Type: response.data.Type,
                    Tags: response.data.Tags,
                    Addons: response.data.Addons,
                    Vendor_Email: response.data.Vendor_Email,
                    Managers_Name: response.data.Managers_Name,
                    Status: response.data.Status,
                    Buyer_Email: response.data.Buyer_Email,
                    Quantity: response.data.Quantity,
                    Total_Completed: response.data.Total_Completed,
                    Placed_Time: response.data.Placed_Time,
                    Order_Rating: response.data.Rating
                    
                },()=> {
                    const Total = {
                        Email : this.state.Vendor_Email,
                        Item_Name: this.state.Item_Name,
                    }
                    axios.post('/api/total/condition',Total)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                           Sold_Details: res.data                             
                        },()=>{
                            this.setState({
                                Total_Sold: this.state.Sold_Details[0].Total_Sold,
                                
                            },()=>{
                                console.log("Total Sold: "+this.state.Total_Sold)
                            })

                        })
                    })


                    const Food = {
                        Email : this.state.Vendor_Email,
                        Item_Name: this.state.Item_Name
                    }
                    axios.post('/api/food/oneitem',Food)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            Food_Details: res.data
                        },() => {
                            this.setState({
                                Avg_Rating: this.state.Food_Details[0].Rating,
                                All_Addons: this.state.Food_Details[0].Addons
                            },() => {
                                console.log("Average Rating: "+ this.state.Avg_Rating)
                            })
                        })
                    })
                })

                console.log(response.data)

            }).catch(function (error) {
                console.log(error)
            })
    }

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
    onStatusChange(e) {
        this.setState({
            Status: e.target.value,
        })
    }

    onGoback(e) {
        e.preventDefault();
        window.location = "/buyer/orderdashboard"
    }

    onratebutton(e){
        e.preventDefault();

        const Food = {
            Item_Name: this.state.Item_Name,
            Price: this.state.Price,
            Tags: this.state.Tags,
            Type: this.state.Type,
            Addons: this.state.All_Addons,
            Rating: ((Number(this.state.Avg_Rating)*(Number(this.state.Total_Sold)-1)) + (Number(this.state.Rating)))/(Number(this.state.Total_Sold)),
            Email: this.state.Vendor_Email,
            Managers_Name: this.state.Managers_Name
        }
        console.log('mana food'+Food)
        axios.post('/api/food/update',Food)
         .then(res => {
             console.log(res.data)
         })
         .catch(err => {
             console.log('Error: '+ err)
         })

         const Order = {

            Item_Name: this.state.Item_Name,
            Price: this.state.Price,
            Rating: this.state.Rating,
            Type: this.state.Type,
            Tags: this.state.Tags,
            Addons: this.state.Addons,
            Vendor_Email: this.state.Vendor_Email,
            Managers_Name: this.state.Managers_Name,
            Status: 'COMPLETED',
            Buyer_Email: this.state.Buyer_Email,
            Quantity: this.state.Quantity,
            Total_Completed: this.state.Total_Completed,
            Placed_Time: this.state.Placed_Time


        }
        this.setState({
            Order_Rating: this.state.Rating
        })
        const { id } = this.props.params;

        axios.post("/api/order/update/" + id, Order).then(res => {
            console.log(res.data);
        })

    }
     

    
    onPickup(e) {
        e.preventDefault();


        const Order = {

            Item_Name: this.state.Item_Name,
            Price: this.state.Price,
            Rating: this.state.Rating,
            Type: this.state.Type,
            Tags: this.state.Tags,
            Addons: this.state.Addons,
            Vendor_Email: this.state.Vendor_Email,
            Managers_Name: this.state.Managers_Name,
            Status: 'COMPLETED',
            Buyer_Email: this.state.Buyer_Email,
            Quantity: this.state.Quantity,
            Total_Completed: this.state.Total_Completed,
            Placed_Time: this.state.Placed_Time


        }
        this.setState({Status: 'COMPLETED'})
        const { id } = this.props.params;

        axios.post("/api/order/update/" + id, Order).then(res => {
            console.log(res.data);
        })

        const Total = {
            Email: this.state.Vendor_Email,
            Item_Name: this.state.Item_Name,
            Total_Sold: Number(this.state.Total_Sold) + 1
        }
     
      
        console.log("Details as follows: " + Total)
        

        axios.post("/api/total/update",Total)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log('Error: ' + err)
        })

          this.setState({
              Total_Sold: Number(this.state.Total_Sold) + 1
          })


    }


    render() {
        let content;
        let ratecontent;
        if(Number(this.state.Order_Rating) == 0){
            ratecontent = <span>
                <Grid item xs={12}>
                        <TextField
                            label="Rating"
                            variant="outlined"
                            value={this.state.Rating}
                            onChange={this.onRatingChange}
                            
                        />
                        </Grid>

                    <Button variant="contained" onClick={this.onratebutton} style={{ margin: '10px' }}>
                             Rate
                        </Button>      



            </span>
        }
        if(this.state.Status === "COMPLETED"){
            content = <span>
               <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            value={this.state.Status}
                            readOnly
                        />

                    </Grid>     

                    {ratecontent}           
                    
            </span>
        }
        else if(this.state.Status === "REJECTED"){
           content = <span>
                <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            value={this.state.Status}
                            readOnly
                        />

                    </Grid>                    
                    
           </span>

        
       
        }
        else if(this.state.Status === "PLACED"){
            content = <span>
                 <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            value={this.state.Status}
                            readOnly
                        />

                    </Grid>

                    
            </span>
        }
        else if(this.state.Status === "ACCEPTED"){
            content = <span>
                 <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            value={this.state.Status}
                            readOnly
                        />

                    </Grid>

                    
                   
            </span>
        }
        else if(this.state.Status === "COOKING"){
            content = <span>
                 <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            value={this.state.Status}
                            readOnly
                        />

                    </Grid>
              
                    
            </span>
        }
        else if(this.state.Status === "READY FOR PICKUP"){
            content = <span>
                 <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            value={this.state.Status}
                            readOnly
                        />

                    </Grid>

                    
                    
                    <Grid item xs={12}>

                        <Button variant="contained" onClick={this.onPickup} style={{ margin: '10px' }}>
                             Pick Up
                        </Button>

                    </Grid>
            </span>
        }
        return (

            <container>
                <h1> Order </h1>
                <br />
                <Grid container align={"center"} spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            label="Item Name"
                            variant="outlined"
                            value={this.state.Item_Name}
                            readOnly
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            variant="outlined"
                            value={this.state.Price}
                           readOnly
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Type"
                            variant="outlined"
                            value={this.state.Type}
                            readOnly
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Tags"
                            variant="outlined"
                            value={this.state.Tags}
                            readOnly
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            value={this.state.Quantity}
                            readOnly
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Rating"
                            variant="outlined"
                            value={this.state.Rating}
                            readOnly
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Placed Time"
                            variant="outlined"
                            value={this.state.Placed_Time}
                            readOnly
                        />

                    </Grid>
                   
                  
                     {content}



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
    <SingleOrder
        {...props}
        params={useParams()}
    />
);