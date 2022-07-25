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

const Food = props => (
    <tr>
      <td>{props.food.Item_Name}</td>
      <td>{props.food.Price}</td>
      <td>{props.food.Rating}</td>
      <td>{props.food.Type}</td>
      <td>{props.food.Tags}</td>
      
      <td>{props.food.Addons.price}</td>
      <td>{props.food.Email}</td>
      <td>{props.food.Managers_Name}</td>
      
      <td>
        <Link to={"/edit/"+props.food._id}>edit</Link> | <a href="#" onClick={() => { props.deleteFood(props.food._id) }}>delete</a>
      </td>
    </tr>
  )

export default class FoodDash extends Component{

    constructor(props){
        super(props);

        this.deleteFood = this.deleteFood.bind(this);
        this.onGoback = this.onGoback.bind(this);

        this.state = {
            fooditems:[]
        }



    }
    
    componentDidMount(){
       
        const Food = {
            Email: localStorage.getItem("Email")

        }
        console.log(Food)
        
        axios.post('/api/food/condition',Food)
        .then(response => {
            
            this.setState({fooditems: response.data})        
             console.log(response.data)
             
            
        })
        .catch((error) => {
            console.log(error)
        })
    }
    onGoback(e){
        e.preventDefault();
        window.location = "/vendor/dashboard"
    }

    deleteFood(id){
        axios.delete('/api/food/'+id)
        .then(res => console.log(res.data));

        this.setState({
            fooditems: this.state.fooditems.filter(el => el._id !==id)
        })
        
    }

    foodList() {
        return this.state.fooditems.map(currentfood => {
          return <Food food={currentfood} deleteFood={this.deleteFood} key={currentfood._id}/>;
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
            <h3>Menu</h3>

            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Type</th>
                  <th>Tags</th>
                  <th>Addons</th>
                  <th>Email</th>
                  <th>Manager Name</th>
                </tr>
              </thead>
              <tbody>
                { this.foodList() }
              </tbody>
            </table>
                      </div>

        )
    }
}