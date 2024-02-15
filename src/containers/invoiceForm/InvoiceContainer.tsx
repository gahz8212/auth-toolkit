import React from 'react';
import InvoiceComponent from './InvoiceComponent';
import { useDispatch, useSelector } from 'react-redux'
import { OrderAction, OrderData } from '../../store/slices/orderSlice';

const InvoiceContainer = () => {
    const dispatch = useDispatch();
    const { invoiceData } = useSelector(OrderData)


    return (
        <div>
            <InvoiceComponent invoiceData={invoiceData}/>
        </div>
    );
};

export default InvoiceContainer;