import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const OrderTable = ({orders}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Adress</Th>
          <Th>Customer</Th>
          <Th>Description</Th>
          <Th>Phone</Th>
          <Th>Status</Th>
          
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => {
        const { id, customer, adress, description, phone, status } = order
        return  <Tr key={id}>
                <Td component="th" scope="row">{customer}</Td>
                <Td>{adress}</Td>
                <Td>{description}</Td>
                <Td>{phone}</Td>
                <Td>{status}</Td>
                </Tr>
        })}
        </Tbody>
    </Table>
  );
}

export default OrderTable;