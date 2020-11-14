import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Orders from './Orders';
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

const Main = () => {
    const [orders, setOrders] = useState([]);
    const [customer, setCustomer] = useState('');
    const [adress, setAdress] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        api.get('/').then(res => {
            console.log(res);
            setOrders(res.data.Items);
            console.log(orders)
        });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (customer && phone) {
            const newOrder = { customer, adress, description, phone, status:'created', id:'123'};
            console.log(newOrder);
            api.post(
                '/', {
                    key1: customer,
                    key2: adress,
                    key3: description,
                    key4: phone,
                }
                ).then (response => {
                    console.log('Saved');
                    setOrders((orders)=>{
                        return [...orders, newOrder];
                    });
                    setCustomer('');
                    setAdress('');
                    setDescription('');
                    setPhone('');
                });
        } else {
            console.log('empty values');
        };
    };
    
    return <>
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
            {orders.map((order) => {
                const { id, customer, adress, description, phone, status } = order
                return  <TableRow key={id}>
                        <TableCell component="th" scope="row">{customer}</TableCell>
                        <TableCell align="right">{adress}</TableCell>
                        <TableCell align="right">{description}</TableCell>
                        <TableCell align="right">{phone}</TableCell>
                        <TableCell align="right">{status}</TableCell>
                        </TableRow>
            })}
            </TableBody>
        </Table>
    </TableContainer>
    <h1>Create Order</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="customer">Customer : </label>
        <input
            type="text"
            name="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
        />
        <label htmlFor="adress">Adress : </label>
        <input
            type="text"
            name="adress"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
        />
        <label htmlFor="description">Description` : </label>
        <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="phone">Phone : </label>
        <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
        />  
    <button type="submit">Send</button>
    </form>
    </>;
}

export default Main;