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
import { Container, Input, Label } from 'reactstrap';

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
        <Link to={"/view/"+props.food._id}>order</Link> 
      </td>
    </tr>
  )

export default class BuyerFoodDash extends Component{

    constructor(props){
        super(props);

        this.deleteFood = this.deleteFood.bind(this);
        this.onGoback = this.onGoback.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this)
        this.onChecked = this.onChecked.bind(this)
        this.onNonVeg = this.onNonVeg.bind(this)
        
        this.onHighPrice = this.onHighPrice.bind(this)
        this.onLowPrice = this.onLowPrice.bind(this)
        this.onHighRating = this.onHighRating.bind(this)
        this.onLowRating = this.onLowRating.bind(this)


        this.state = {
            fooditems:[],
            Search_Item: '',
            isChecked: false,
            isNonChecked: false,           

        }



    }
    
    componentDidMount(){
       
             
        axios.get('/api/food/')
        .then(response => {
            
            this.setState({fooditems: response.data})        
             console.log(response.data)
             
            
        })
        .catch((error) => {
            console.log(error)
        })

        

    }

   onHighPrice(e){
     e.preventDefault();
     axios.get('/api/food/highprice')
     .then(res => {
       console.log(res.data)
       this.setState({
         fooditems: res.data
       })
     })
     .catch(err => console.log(err))
   }

   onLowPrice(e){
     e.preventDefault();
     axios.get('/api/food/lowprice')
     .then(res => {
       console.log(res.data)
       this.setState({
         fooditems: res.data
       })
     })
     .catch(err => console.log(err))

   }
   onHighRating(e){
     e.preventDefault();
     axios.get('/api/food/highrate')
     .then(res => {
       console.log(res.data)
       this.setState({
         fooditems: res.data
       })
     })
     .catch(err => console.log(err))
   }

   onLowRating(e){
     e.preventDefault();
     axios.get('/api/food/lowrate')
     .then(res => {
       console.log(res.data)
       this.setState({
         fooditems: res.data
       })
     })
     .catch(err => console.log(err))
   }

    onChecked(e){
      e.preventDefault()
      this.setState({
        isChecked: !(this.state.isChecked)
      },() => {
        console.log(this.state.isChecked)
         
        const Food = {
          Type: 'Veg'
        }

       if(this.state.isChecked == true){
          
          axios.post('/api/food/type',Food)
          .then(res => {
            console.log(res.data)

            this.setState({
              fooditems: res.data
            })
          })
          .catch(err => console.log(err))
        
       }
       else {

        axios.get('/api/food/')
        .then(response => {
            
            this.setState({fooditems: response.data})        
             console.log(response.data)
             
            
        })
        .catch((error) => {
            console.log(error)
        })

       }


       

      })
    }
    onNonVeg(e){
      e.preventDefault()
      this.setState({
        isNonChecked: !(this.state.isNonChecked)
      },() => {
        console.log(this.state.isNonChecked)
         
        const Food = {
          Type: 'Non Veg'
        }

       if(this.state.isNonChecked== true){
          
          axios.post('/api/food/type',Food)
          .then(res => {
            console.log(res.data)

            this.setState({
              fooditems: res.data
            })
          })
          .catch(err => console.log(err))
        
       }
       else {

        axios.get('/api/food/')
        .then(response => {
            
            this.setState({fooditems: response.data})        
             console.log(response.data)
             
            
        })
        .catch((error) => {
            console.log(error)
        })

       }


       

      })
    }

    onGoback(e){
        e.preventDefault();
        window.location = "/buyer/dashboard"
    }
   
    onChangeSearch(e){
      this.setState({
        Search_Item: e.target.value
      })
    }
     
    onSearch(e){
      e.preventDefault();
      
      const Food = {
        Item_Name: this.state.Search_Item
      }
       
      axios.post('/api/food/fooditem',Food)
      .then(res => {
        this.setState({
           fooditems: res.data
        })
        console.log('kavalsina food' + res.data)
      })
      .catch(err => console.log('Error : '+ err))

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

<Grid item xs={12}>

<Button variant="contained" onClick={this.onHighPrice} style={{ margin: '10px' }}>
   Price High to Low
</Button>

<Button variant="contained" onClick={this.onLowPrice} style={{ margin: '10px' }}>
   Price Low to High
</Button>

</Grid>
<Grid item xs={12}>

<Button variant="contained" onClick={this.onHighRating} style={{ margin: '10px' }}>
   Rating High to Low
</Button>

<Button variant="contained" onClick={this.onLowRating} style={{ margin: '10px' }}>
   Rating Low to High
</Button>

</Grid>


<Grid item xs={12}>

<Input 
type="checkbox" 
className="from-control" 
checked = {this.state.isChecked}
onChange={this.onChecked}
/> Veg


<Input 
type="checkbox" 
className="from-control" 
checked = {this.state.isNonChecked}
onChange={this.onNonVeg}
/> Non Veg


</Grid>

<Grid item xs={12}>

<TextField
          label="Food Item"
          variant="outlined"
          value={this.state.Search_Item}
          onChange={this.onChangeSearch}
        />


<Button variant="contained" onClick={this.onSearch} style={{ margin: '10px' }}>
     Search
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