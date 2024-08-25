import React from 'react';
type Props = {
    makeCartonPacking: (type: string) => void;
}
const InvoiceExcelComponent: React.FC<Props> = ({ makeCartonPacking }) => {
    return (
        <div>

            <button type='button' onClick={() => { makeCartonPacking('CT') }}>카톤 리스트</button>
            <button type='button' onClick={() => { makeCartonPacking('PT') }}>파레트 리스트</button>
        </div>
    );
};

export default InvoiceExcelComponent;