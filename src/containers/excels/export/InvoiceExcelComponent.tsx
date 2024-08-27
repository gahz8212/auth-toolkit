import React from 'react';
type Props = {
    makeInvoice: () => void;
}
const InvoiceExcelComponent: React.FC<Props> = ({ makeInvoice }) => {
    return (
        <div>

            <input type="checkbox" name="" id="invoice" checked={true} />
            <label htmlFor="invoice">인보이스</label>
            <input type="checkbox" name="" id="carton" />
            <label htmlFor="carton">CT_packing</label>
            <input type="checkbox" name="" id="pallet" />
            <label htmlFor="pallet">PT_packing</label>
            <div>
                <button type='button' onClick={makeInvoice}>출력</button>
            </div>

        </div>
    );
};

export default InvoiceExcelComponent;