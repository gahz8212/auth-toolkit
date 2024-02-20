import React from 'react';
import InvoiceComponent from './InvoiceComponent';
import { useDispatch, useSelector } from 'react-redux'
import { OrderAction, OrderData } from '../../store/slices/orderSlice';
type Props = {
    selectedMonth: string
}
const InvoiceContainer: React.FC<Props> = ({ selectedMonth }) => {

    const { invoiceData } = useSelector(OrderData)
    const filteredInvoiceData = invoiceData?.filter((data) => data[selectedMonth])


    let totalResult: { [x: string]: { carton: number; weight: number; cbm: number; price: number; }; }[] = [];

    if (invoiceData) {

        const headers = Object.keys(invoiceData[0]).slice(1, 6)


        totalResult =
            headers.map(header => {
                let carton = 0;
                let weight = 0;
                let cbm = 0;
                let price = 0;
                invoiceData?.forEach(invoice => {
                    carton += invoice[header] / invoice.moq;
                    weight += invoice.weight * invoice[header] / invoice.moq;
                    cbm += invoice.cbm * invoice[header] / invoice.moq;
                    price += invoice[header] * invoice.export_price;
                }
                )
                return { [header]: { carton, weight, cbm, price } };
            })
    }



    return (
        <div>
            <InvoiceComponent invoiceData={filteredInvoiceData} selectedMonth={selectedMonth} totalResult={totalResult} />
        </div>
    );
};

export default InvoiceContainer;