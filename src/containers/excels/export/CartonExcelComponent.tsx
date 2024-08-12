import React from 'react';
type Props = {
    makeCartonPacking: () => void;
}
const InvoiceExcelComponent: React.FC<Props> = ({ makeCartonPacking }) => {
    return (
        <div>

            <button type='button' onClick={makeCartonPacking}>카톤 리스트</button>
            <button type='button'>파레트 리스트</button>
        </div>
    );
};

export default InvoiceExcelComponent;