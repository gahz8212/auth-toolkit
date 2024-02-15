import React from 'react';
type Props = {
    invoiceData: any[] | null
}
const InvoiceComponent: React.FC<Props> = ({ invoiceData }) => {
    return (
        <div className='invoice-container'>
            {invoiceData?.map(data => <div className='invoice-rows'>
                <div className='invoice-item'>{data.Item}</div>
                <div className='invoice-count'>{data.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                <div className='invoice-price'>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                <div className='invoice-amount'>{data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>)}
        </div>
    );
};

export default InvoiceComponent;

{/* //Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") */ }