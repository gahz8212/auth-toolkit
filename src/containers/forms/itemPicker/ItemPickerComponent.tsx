import React from 'react';
type Props = {
    inputRepairs: (picked: {}) => void;
    repairs: {
        id: number;
        itemName: string;
        unit: string,
        im_price: number,
        ex_price: number;
        quantity: number;
        CT_qty: number;
        weight: number;
        cbm: number;
    }[] | null
}
const ItemPickerComponent: React.FC<Props> = ({ inputRepairs, repairs }) => {
    return (
        <div className='wrap-picker'>
            <div className='title'>아이템 수집</div>
            <div className='header'>
                <div>품명</div>
                <div>입고단가</div>
                <div>수출단가</div>

            </div>
            <div className="itemList"
                onDragOver={e => { e.preventDefault() }}
                onDrop={e => {
                    e.preventDefault();
                    const pickedItem = JSON.parse(e.dataTransfer.getData('pickedItem'))
                    if (pickedItem) {
                        inputRepairs(pickedItem)
                    }
                }}


            >
                {repairs && repairs.map(repair => <div key={repair.itemName} className='pickedList'>
                    <div>{repair.itemName}</div>
                    <div>{repair.unit}{repair.im_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    <div>${repair.ex_price}</div>
                    <div>
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </div>
                </div>)}

            </div>
            <div className="controls">

                <button type="button">초기화</button>
                <button type="button">입력</button>
            </div>
            <div className="bar-btn">
                <button>X</button>
            </div>
        </div>
    );
};

export default ItemPickerComponent;