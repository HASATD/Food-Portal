import { Component, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dropdown from 'react-bootstrap/Dropdown'
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
import Time from "react-time"
const Order = props => (
    <tr>
        <td>{props.order.Item_Name}</td>
        <td>{props.order.Price}</td>
        <td>{props.order.Quantity}</td>
        <td>{props.order.Rating}</td>
        <td>{props.order.Type}</td>
        <td>{props.order.Tags}</td>

        <td>{props.order.Addons.price}</td>
        <td>{props.order.Vendor_Email}</td>
        <td>{props.order.Managers_Name}</td>
        <td>{props.order.Status}</td>
        <td><Time value = {props.order.Placed_Time} format = "DD/MM/YYYY HH:mm:ss" /></td>


        <td>
            <Link to={"/open/" + props.order._id}>Expand</Link>
        </td>
    </tr>
)

export default class OrderDash extends Component {

    constructor(props) {
        super(props);

        this.deleteOrder = this.deleteOrder.bind(this);
        this.onGoback = this.onGoback.bind(this);
        this.onStatistics = this.onStatistics.bind(this);

        this.state = {
            orderitems: []
        }



    }

    componentDidMount() {

        const Order = {
            Vendor_Email: localStorage.getItem("Email")

        }
        console.log(Order)

        axios.post('/api/order/vendororders', Order)
            .then(response => {

                this.setState({ orderitems: response.data })
                console.log(response.data)


            })
            .catch((error) => {
                console.log(error)
            })
    }
    onGoback(e) {
        e.preventDefault();
        window.location = "/vendor/dashboard"
    }
    onStatistics(e){
        e.preventDefault()
        window.location = "/vendor/statistics"
    }

    deleteOrder(id) {
        axios.delete('/api/order/' + id)
            .then(res => console.log(res.data));

        this.setState({
            orderitems: this.state.orderitems.filter(el => el._id !== id)
        })

    }

    orderList() {
        return this.state.orderitems.map(currentorder => {
            return <Order order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id} />;
        })
    }

    render() {
        return (
            <div>
                <Grid item xs={12}>

                    <Button variant="contained" onClick={this.onGoback} style={{ margin: '10px' }}>
                        Go back
                    </Button>
                    <Button variant="contained" onClick={this.onStatistics} style={{ margin: '10px' }}>
                        Statistics
                    </Button>

                </Grid>
                <h3>Menu</h3>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Rating</th>
                            <th>Type</th>
                            <th>Tags</th>
                            <th>Addons</th>
                            <th>Vendor Email</th>
                            <th>Manager Name</th>
                            <th>Status</th>
                            <th>Placed Time</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.orderList()}
                    </tbody>
                </table>
            </div>

        )
    }
}