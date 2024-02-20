import { table } from 'console';
import React from 'react';
type Props = {
    invoiceData: any[] | undefined;
    totalResult: { [x: string]: { carton: number; weight: number; cbm: number; price: number; }; }[]
    selectedMonth: string
}
const InvoiceComponent: React.FC<Props> = ({ invoiceData, selectedMonth, totalResult }) => {
    const datas = (
        invoiceData?.map(data => <tr className='invoice-rows'>
            <td className='invoice-item'>{data.name}</td>


            {data[selectedMonth] && <td className='invoice-count'>{data[selectedMonth].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}
            {data[selectedMonth] && <td className='invoice-weight'>{data.weight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}
            {data[selectedMonth] && <td className='invoice-cbm'>{data.cbm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}


            {data.export_price && <td className='invoice-price'>${data.export_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}

        </tr>)
    )
    const footer = (totalResult?.map(result => <tr className='invoice-total'>
        {result[selectedMonth] && <th>TOTAL</th>}
        {result[selectedMonth] && <th>{result[selectedMonth].carton}C/T</th>}
        {result[selectedMonth] && <th>{result[selectedMonth].weight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}Kg</th>}
        {result[selectedMonth] && <th>{result[selectedMonth].cbm.toFixed(1)}CBM</th>}
        {result[selectedMonth] && <th>${result[selectedMonth].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</th>}
    </tr>))
    return (
        <div className='invoice-container'>

            <table>
                <thead>
                    <th>Item</th>
                    <th>수량</th>
                    <th>무게</th>
                    <th>CBM</th>
                    <th>수출가격</th>
                </thead>
                <tbody>
                    {React.Children.toArray(datas)}
                </tbody>
                <tfoot>

                    {React.Children.toArray(footer)}
                </tfoot>
            </table>
        </div>
        // <div className='invoice-container'>
        //     {invoiceData?.map(data => <div className='invoice-rows'>
        //         <div className='invoice-item'>{data.Item}</div>


        //         {data[selectedMonth] && <div className='invoice-count'>{data[selectedMonth].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}
        //         {data[selectedMonth] && <div className='invoice-weight'>{data.weight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}
        //         {data[selectedMonth] && <div className='invoice-cbm'>{data.cbm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}


        //         {data.price && <div className='invoice-price'>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}

        //     </div>)}
        // </div>
    );
};

export default InvoiceComponent;

