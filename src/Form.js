import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const api = axios.create({
    baseURL: 'https://egm1k4zcb4.execute-api.us-east-2.amazonaws.com/default/CreateOrders'
})

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      customer: '',
      adress: '',
      description: '',
      phone: '',
      status: '',
      id: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /*state = { 
      orders: [],
  };*/
  componentDidMount(){
    api.get('/') .then(res => {
      console.log(res);
      this.setState({ orders: res.data.Items });
      console.log(this.state.orders)
    });
  }


  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { customer, adress, description, phone } = this.state;
    const newOrder = {
        customer: `${customer}`,
        adress: `${adress}`,
        description: `${description}`,
        phone: `${phone}`,
        status: 'Created',
        id: '123'
      }
    console.log(newOrder);
    await api.post(
      '/',
      { key1: `${customer}`,
        key2: `${adress}`,
        key3: `${description}`,
        key4: `${phone}`,
      }
    ).then(response => {
      console.log('Saved');
      this.setState(prevState=>({
        orders: [newOrder, ...prevState.orders]
      }))
      });
  };
  

  render() {
    return (
    <>
    <TableContainer component={Paper}>
      <Table className='maintable' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell align="right">Adress</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.orders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                {order.customer}
              </TableCell>
              <TableCell align="right">{order.adress}</TableCell>
              <TableCell align="right">{order.description}</TableCell>
              <TableCell align="right">{order.phone}</TableCell>
              <TableCell align="right">{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <h1>Create Order</h1>
    <form onSubmit={this.handleSubmit}>
      <label>Customer:</label>
        <input  type="text"  name="customer"  onChange={this.handleChange} value={this.state.customer} />
      <label>Adress:</label>
        <input type="text" name="adress" onChange={this.handleChange} value={this.state.adress} />
      <label>Description:</label>
        <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
      <label>Phone:</label>
        <input type="text" name="phone" onChange={this.handleChange} value={this.state.phone} />

      <button type="submit">Send</button>
    </form> 
    </>
  );
};  
}