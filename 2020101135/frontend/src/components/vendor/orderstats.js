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

const Total = props => (
    <tr>
      <td>{props.order.Item_Name}</td>
      <td>{props.order.Total_Sold}</td>
     
    </tr>
  )

export default class StatsDash extends Component{

    constructor(props){
        super(props);

        this.deleteTotal = this.deleteTotal.bind(this);
        this.onGoback = this.onGoback.bind(this);

        this.state = {
            orderitems:[],
            Placed: 0,
            Completed: 0,
            Pending:0,
        }



    }
    
    componentDidMount(){
       
        
        
        axios.get('/api/total/top5')
        .then(response => {
            
            this.setState({orderitems: response.data},() => {
                console.log(response.data)
            })               
             
            
        })
        .catch((error) => {
            console.log(error)
        })

 const Order = {
     Vendor_Email: localStorage.getItem("Email")
 }
        axios.post('/api/order/placed',Order)
        .then(res => {
            console.log("mana result" + res.data)
            this.setState({
                Placed: res.data
            })
        }).catch(err => {console.log("Error: "+ err)})

        axios.post('/api/order/completed',Order)
        .then(res => {
            console.log("mana result" + res.data)
            this.setState({
                Completed: res.data
            })
        }).catch(err => {console.log("Error: "+ err)})

        axios.post('/api/order/pending',Order)
        .then(res => {
            console.log("mana result" + res.data)
            this.setState({
                Pending: res.data
            })
        }).catch(err => {console.log("Error: "+ err)})
      

    }


    onGoback(e){
        e.preventDefault();
        window.location = "/vendor/orderdashboard"
    }

    deleteTotal(id){
        axios.delete('/api/order/'+id)
        .then(res => console.log(res.data));

        this.setState({
            orderitems: this.state.orderitems.filter(el => el._id !==id)
        })
        
    }

    orderList() {
        return this.state.orderitems.map(currentorder => {
          return <Total order={currentorder} deleteTotal={this.deleteTotal} key={currentorder._id}/>;
        })
      }

    render(){
        return( 
            <div>
<Grid item xs={12}>

<Button variant="contained" onClick={this.onGoback} style={{ margin: '10px' }}>
    Go back
</Button>

</Grid>
            <h3>Statistics</h3>

            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Item Name</th>
                  <th>Total Sold</th>
                                   
                </tr>
              </thead>
              <tbody>
                { this.orderList() }
              </tbody>
            </table>


            <p>Orders Placed: {this.state.Placed}</p>
            <p>Orders Completed: {this.state.Completed}</p>
            <p>Orders Pending: {this.state.Pending}</p>
                      </div>

                      

        )
    }
}