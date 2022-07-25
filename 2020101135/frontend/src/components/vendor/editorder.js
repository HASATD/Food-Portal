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
import emailjs from "emailjs-com"
import Time from "react-time"



class EditOrder extends Component {
    _isMounted = false;

  

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
        this.onReject = this.onReject.bind(this)
        this.onGoback = this.onGoback.bind(this)
        this.onStatusChange = this.onStatusChange.bind(this)
        this.onPlaced = this.onPlaced.bind(this)
        this.onAccepted = this.onAccepted.bind(this)
        this.onCooking = this.onCooking.bind(this)
        this.onPickup = this.onPickup.bind(this)



        this.state = {
            Item_Name: '',
            Price: 0,
            Rating: 0,

            Type: '',
            Tags: [],
            Addons: [{ Add_Name: "", price: 0 }],
            Vendor_Email: localStorage.getItem("Email"),
            Managers_Name: localStorage.getItem("Manager_Name"),
            Status: '',
            Quantity: 0,
            Buyer_Email: '',
            Total_Completed: 0,
            stage: 0,
            Placed_Time: new Date(),
            Amount: 0,
            details: [],
            ongoing: 0,

        }

    }
     
   

    componentDidMount() {

        this._isMounted = true;
        const { id } = this.props.params;
        axios.get('/api/order/' + id)
            .then(response => {
                
              if(this._isMounted){
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
                    Placed_Time: response.data.Placed_Time

                })
            }
                localStorage.setItem("Buyer_Email", this.state.Buyer_Email)



            }).catch(function (error) {
                console.log(error)
            })
        const Wallet = {
            Email: localStorage.getItem("Buyer_Email")
        }

        axios.post("/api/wallet/condition", Wallet)
            .then(response => {
                console.log('lafoot data' + response.data)
                if(this._isMounted){
                this.setState({
                    details: response.data,

                }, () => {
                    if(this._isMounted){
                    this.setState({
                        Amount: this.state.details[0].Amount
                    },() => {
                        console.log(this.state.Amount)
                    })
                }
                    console.log(this.state.details[0].Amount)
                   

                })}


            })
            .catch(err => {
                console.log("Error : " + err)
            })

            const Order = {
                Vendor_Email: localStorage.getItem("Email")
            }

             axios.post('/api/order/ongoing',Order)
             .then(res => {
                 console.log(res.data)
                 if(this._isMounted){
                 this.setState({
                     ongoing: res.data
                 })
             }})


    }

    componentWillUnmount() {
        this._isMounted = false;
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
        window.location = "/vendor/orderdashboard"
    }


    onReject(e) {
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
            Status: 'REJECTED',
            Buyer_Email: this.state.Buyer_Email,
            Quantity: this.state.Quantity,
            Total_Completed: this.state.Total_Completed,
            Placed_Time: this.state.Placed_Time


        }


        this.setState({ Status: 'REJECTED' })
        const { id } = this.props.params;
        console.log(id)

        axios.post("/api/order/update/" + id, Order).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log("bokka ra reay:" + err)
        })

        const Wallet = {
            Email: this.state.Buyer_Email,
            Amount: Number(this.state.Amount) + Number(this.state.Price),
        }
        this.setState({
            Amount: Number(this.state.Amount) + Number(this.state.Price)
        })
        axios.post("/api/wallet/update", Wallet).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log("error: " + err)
        })

        const Emailjs = {
            name: this.state.Managers_Name,
            email: this.state.Vendor_Email,
            message: 'Your order is rejected'
        }
        emailjs.send('service_v28fo78', 'template_rag8ykl', Emailjs,'user_WCB9EHYNLrtXc72b6wSqZ')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });



    }
    onPlaced(e) {
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
            Status: 'ACCEPTED',
            Buyer_Email: this.state.Buyer_Email,
            Quantity: this.state.Quantity,
            Total_Completed: this.state.Total_Completed,
            Placed_Time: this.state.Placed_Time



        }
        console.log("number ra reay: "+ this.state.ongoing)
       
        if(Number(this.state.ongoing) < 10) {
        this.setState({ Status: 'ACCEPTED' })
        const { id } = this.props.params;
      
        axios.post("/api/order/update/" + id, Order).then(res => {
            console.log(res.data);
        })

        const Emailjs = {
            name: this.state.Managers_Name,
            email: this.state.Vendor_Email,
            message: 'Your order is accepted!Thankyou for ordering'
        }
        emailjs.send('service_v28fo78', 'template_rag8ykl', Emailjs,'user_WCB9EHYNLrtXc72b6wSqZ')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    }

    else {
        alert("Too many Orders!")
        window.location = "/vendor/orderdashboard"
    }


  


    }
    onAccepted(e) {
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
            Status: 'COOKING',
            Buyer_Email: this.state.Buyer_Email,
            Quantity: this.state.Quantity,
            Total_Completed: this.state.Total_Completed,
            Placed_Time: this.state.Placed_Time


        }
        this.setState({ Status: 'COOKING' })
        const { id } = this.props.params;

        axios.post("/api/order/update/" + id, Order).then(res => {
            console.log(res.data);
        })



    }

    onCooking(e) {
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
            Status: 'READY FOR PICKUP',
            Buyer_Email: this.state.Buyer_Email,
            Quantity: this.state.Quantity,
            Total_Completed: this.state.Total_Completed,
            Placed_Time: this.state.Placed_Time


        }
        this.setState({ Status: 'READY FOR PICKUP' })
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
        this.setState({ Status: 'COMPLETED' })
        const { id } = this.props.params;

        axios.post("/api/order/update/" + id, Order).then(res => {
            console.log(res.data);
        })



    }


    render() {
        let content;
        let smallcontent;
        if (this.state.Rating === 0) {
            smallcontent = <span>
                <Grid item xs={12}>
                    <TextField
                        label="Status"
                        variant="outlined"
                        value={this.state.Rating}
                        onChange={this.onRatingChange}
                    />

                </Grid>
            </span>
        }
        if (this.state.Status === "COMPLETED") {
            content = <span>
                <Grid item xs={12}>
                    <TextField
                        label="Status"
                        variant="outlined"
                        value={this.state.Status}
                        readOnly
                    />

                </Grid>
                {smallcontent}
            </span>
        }
        else if (this.state.Status === "REJECTED") {
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
        else if (this.state.Status === "PLACED") {
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

                    <Button variant="contained" onClick={this.onReject} style={{ margin: '10px' }}>
                        Reject
                    </Button>

                </Grid>
                <Grid item xs={12}>

                    <Button variant="contained" onClick={this.onPlaced} style={{ margin: '10px' }}>
                        Move to Next Stage
                    </Button>

                </Grid>
            </span>
        }
        else if (this.state.Status === "ACCEPTED") {
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

                    <Button variant="contained" onClick={this.onReject} style={{ margin: '10px' }}>
                        Reject
                    </Button>

                </Grid>
                <Grid item xs={12}>

                    <Button variant="contained" onClick={this.onAccepted} style={{ margin: '10px' }}>
                        Move to Next Stage
                    </Button>

                </Grid>
            </span>
        }
        else if (this.state.Status === "COOKING") {
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

                    <Button variant="contained" onClick={this.onReject} style={{ margin: '10px' }}>
                        Reject
                    </Button>

                </Grid>
                <Grid item xs={12}>

                    <Button variant="contained" onClick={this.onCooking} style={{ margin: '10px' }}>
                        Move to Next Stage
                    </Button>

                </Grid>
            </span>
        }
        else if (this.state.Status === "READY FOR PICKUP") {
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

                    <Button variant="contained" onClick={this.onReject} style={{ margin: '10px' }}>
                        Reject
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
                        <Time value = {this.state.Placed_Time} format = "DD/MM/YYYY HH:mm:ss" />

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
    <EditOrder
        {...props}
        params={useParams()}
    />
);