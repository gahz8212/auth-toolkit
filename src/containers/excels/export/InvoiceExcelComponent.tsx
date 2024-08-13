import React from 'react';
type Props = {
    makeInvoice: () => void;
}
const InvoiceExcelComponent: React.FC<Props> = ({ makeInvoice }) => {
    return (
        <div>
            <button type='button' onClick={makeInvoice}>인보이스 출력</button>

        </div>
    );
};

export default InvoiceExcelComponent;