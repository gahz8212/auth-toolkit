import React from 'react';
import InvoiceComponent from './InvoiceComponent';
import { useDispatch, useSelector } from 'react-redux'
import { OrderData } from '../../../store/slices/orderSlice';
type Props = {
    selectedMonth: string
}
const InvoiceContainer: React.FC<Props> = ({ selectedMonth }) => {

    const { orderData } = useSelector(OrderData)

    //body 에 들어가는 데이터 객체    
    const filteredInvoiceData = orderData?.filter((data) => data[selectedMonth])

    // 하단 total에 들어가는 데이터 객체
    // invoiceData는 헤더만 추출하기 위해 필요
    let totalResult: { [x: string]: { carton: number; weight: number; cbm: number; price: number; }; }[] = [];
    if (orderData) {
        const headers = Object.keys(orderData[0]).slice(1, 6)

        totalResult =
            headers.map(header => {
                let carton = 0;
                let weight = 0;
                let cbm = 0;
                let price = 0;
                orderData?.forEach(invoice => {
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
            <InvoiceComponent
                invoiceData={filteredInvoiceData}
                selectedMonth={selectedMonth}
                totalResult={totalResult} />
        </div>
    );
};

export default InvoiceContainer;