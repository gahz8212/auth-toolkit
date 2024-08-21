
import React, { useRef } from 'react';
type Props = {
    palletData: {
        [key: number]: { [key: string]: string | number; }[]
    }

    settingPallet: (Pnumber: number, itemData: { item: string, amount: number }) => void

}
type Items = {
    items: {
        [key: string]: string | number;
    }[];

}
const PalletItems: React.FC<Items> = ({ items }) => {

    return <div>
        {items.map(item => <div>{item.item}</div>)}
    </div>
}
const PalletComponent: React.FC<Props> = ({ palletData, settingPallet }) => {

    // const dragItem = useRef<number>(0);
    const dragOverItem = useRef<number>(0);
    const dragItemEnter = (index: number) => {
        dragOverItem.current = index
        console.log('dragOverItem.current', dragOverItem.current)
        settingPallet(dragOverItem.current, { item: 'test', amount: 10 })
    }
    const values = Object.values(palletData)
    // console.log('values', values)
    if (!palletData) { return null }
    return (
        <div>
            <div style={{
                width: '500px',
                height: '600px',
                background: 'yellowgreen',
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexWrap: 'wrap',

            }}>
                {values.map((data, index) => <div
                    key={index}
                    draggable
                    onDragEnter={() => { dragItemEnter(index) }}
                    style={{
                        width: '200px', height: '100px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center'
                    }}
                >
                    <div >
                        {index + 1}
                    </div>
                    <PalletItems items={data} />
                </div>)}

            </div>
            {/* <button type='button' onClick={settingPallet}>설정</button> */}
        </div>
    );

}
export default PalletComponent;