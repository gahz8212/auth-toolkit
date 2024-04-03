import React from 'react';
import PackingComponent from './PackingComponent';
import { useDispatch, useSelector } from 'react-redux'
import { OrderData } from '../../../store/slices/orderSlice';
type Props = {

    selectedMonth: string
}
const PackingContainer: React.FC<Props> = ({ selectedMonth }) => {
    const { orderData } = useSelector(OrderData)
    const filteredPackingData = orderData?.filter((data) => data[selectedMonth])
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
                    price += invoice[header] * invoice.ex_price;
                }
                )
                return { [header]: { carton, weight, cbm, price } };
            })
    }
    return (
        <div>
            <PackingComponent
                selectedMonth={selectedMonth}
                packingData={filteredPackingData}
                totalResult={totalResult} />
        </div>
    );
};

export default PackingContainer;