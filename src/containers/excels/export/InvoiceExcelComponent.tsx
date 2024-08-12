import React from 'react';
type Props = {
    makeInvoice: () => void;
}
const InvoiceExcelComponent: React.FC<Props> = ({ makeInvoice }) => {
    return (
        <div>
            <button type='button' onClick={makeInvoice}>인보이스</button>
            <button type='button'>카톤 리스트</button>
            <button type='button'>파레트 리스트</button>
        </div>
    );
};

export default InvoiceExcelComponent;