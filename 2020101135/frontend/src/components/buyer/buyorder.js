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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Time from "react-time"



class BuyOrder extends Component {

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

        this.onQuantityChange = this.onQuantityChange.bind(this)
        this.onBuy = this.onBuy.bind(this)



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
            Quantity: 1,
            Buyer_Email: '',
            Total_Completed: 0,
            stage: 0,
            Placed_Time: new Date(),
            Total_Cost: 0,
            Amount: 0,
            details: []
        }
        console.log(this.state.Amount)
    }

    componentDidMount() {
        const { id } = this.props.params;
        axios.get('/api/food/' + id)
            .then(response => {
                this.setState({
                    Item_Name: response.data.Item_Name,
                    Price: response.data.Price,
                    Rating: response.data.Rating,
                    Type: response.data.Type,
                    Tags: response.data.Tags,
                    Addons: response.data.Addons,
                    Vendor_Email: response.data.Email,
                    Managers_Name: response.data.Managers_Name,
                    Buyer_Email: localStorage.getItem("Email"),


                })

                console.log(response.data)



            }).catch(function (error) {
                console.log(error)
            })
        const Wallet = {
            Email: localStorage.getItem("Email")
        }

        axios.post("/api/wallet/condition", Wallet)
            .then(response => {
                this.setState({
                    details: response.data,

                })
                console.log(this.state.details[0].Amount)


                this.setState({
                    Amount: this.state.details[0].Amount
                })
                console.log(this.state.Amount)

            })
            .catch(err => {
                console.log("Error : " + err)
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
        window.location = "/buyer/dashboard"
    }
    onQuantityChange(e) {
        this.setState({
            Quantity: e.target.value
        })
    }

    onBuy(e) {
        e.preventDefault();
        const Wallet = {
            Email: this.state.Buyer_Email,
            Amount: Number(this.state.Amount) - ((Number(this.state.Quantity)) * Number(this.state.Price)),
        }



        this.setState({
            Amount: Number(this.state.Amount) - ((Number(this.state.Quantity)) * Number(this.state.Price))
        }, () => {
            console.log(this.state.Amount)
        })
        console.log(this.state.Price)
        const { id } = this.props.params;

        console.log(Wallet.Amount)

        if (Wallet.Amount >= 0) {
            axios.post("/api/wallet/update", Wallet).then(res => {
                console.log(res.data)
            }
            ).catch(err => {
                console.log("error: " + err)
            })
        }
        else {

            alert("Insufficient Amount")
            window.location = "/view/" + id



        }
        if (Wallet.Amount >= 0) {



            const Order = {
                Item_Name: this.state.Item_Name,
                Price: this.state.Price,
                Rating: this.state.Rating,
                Type: this.state.Type,
                Tags: this.state.Tags,
                Addons: this.state.Addons,
                Vendor_Email: this.state.Vendor_Email,
                Managers_Name: this.state.Managers_Name,
                Status: 'PLACED',
                Buyer_Email: this.state.Buyer_Email,
                Quantity: this.state.Quantity,
                Total_Completed: this.state.Total_Completed,
                Placed_Time: new Date()
            }
            this.setState({
                Status: "PLACED",
                Placed_Time: new Date()

            })
            
            this.setState({
                Placed_Time: new Date()
            })
            console.log(Order)

            axios.post("/api/order/add", Order)
                .then(response => {
                    console.log(response.data)
                })
                .catch(err => {
                    console.log('Error: ' + err)
                })


        }
    }








    render() {
        let content;
        if (this.state.Status === "") {
            content = <Grid container align={"center"} spacing={1}>
                <Grid item xs={12}>

                    <Button variant="contained" onClick={this.onBuy} style={{ margin: '10px' }}>
                        Buy
                    </Button>

                </Grid>

            </Grid>



        }



        return (

            <container>
                <h1> Food Item </h1>
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
                            label="Rating"
                            variant="outlined"
                            value={this.state.Rating}
                            readOnly
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            value={this.state.Quantity}
                            onChange={this.onQuantityChange}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <Time
                            value={this.state.Placed_Time}
                            format = "DD/MM/YYYY HH:mm:ss"
                        
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
    <BuyOrder
        {...props}
        params={useParams()}
    />
);