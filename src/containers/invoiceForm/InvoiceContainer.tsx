import React from 'react';
import InvoiceComponent from './InvoiceComponent';
import { useDispatch, useSelector } from 'react-redux'
import { OrderAction, OrderData } from '../../store/slices/orderSlice';
type Props = {
    selectedMonth: string
}
const InvoiceContainer: React.FC<Props> = ({ selectedMonth }) => {
    const dispatch = useDispatch();
    const { invoiceData } = useSelector(OrderData)
    const filteredInvoiceData = invoiceData?.filter((data) => data[selectedMonth])
    console.log(selectedMonth)


    return (
        <div>
            <InvoiceComponent invoiceData={filteredInvoiceData} selectedMonth={selectedMonth}/>
        </div>
    );
};

export default InvoiceContainer;