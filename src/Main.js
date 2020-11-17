import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderTable from './OrderTable';

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
    
    return (
        <>
        <OrderTable orders={orders} />       
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
        <label htmlFor="description">Description : </label>
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
        </>
    );
}

export default Main;