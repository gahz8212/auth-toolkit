import React from 'react';
type Props = {
    makeCartonPacking: (type: string) => void;

}
const CartonExcelComponent: React.FC<Props> = ({ makeCartonPacking }) => {
    return (
        <div>
            <input type="checkbox" name="" id="invoice" />
            <label htmlFor="invoice">인보이스</label>
            <input type="checkbox" name="" id="carton" checked={true} />
            <label htmlFor="carton">CT_packing</label>
            <input type="checkbox" name="" id="pallet" />
            <label htmlFor="pallet">PT_packing</label>
            <div>

                <button type='button' onClick={() => { makeCartonPacking('CT') }}>카톤 리스트</button>
                <button type='button' onClick={() => { makeCartonPacking('PT') }}>파레트 리스트</button>
            </div>

        </div>
    );
};

export default CartonExcelComponent;