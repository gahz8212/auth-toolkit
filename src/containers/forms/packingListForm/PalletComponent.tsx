
import React from 'react';
import { select_modelname } from '../../../lib/utils/parseModelName'
type Props = {
    palletData: {
        [key: number]: { [key: string]: string | number; }[]
    }
    settingPallet: (Pnumber: number, itemData: { item: string, CT_qty: number, quantity: number, weight: number, moq: number, cbm: number, sets: string, mode: string }) => void
    addCount: (id: number, item: string) => void;
    removeCount: (id: number, item: string) => void
}
type Items = {
    items: {
        [key: string]: string | number;
    }[];
    addCount: (id: number, item: string) => void;
    removeCount: (id: number, item: string) => void;
    index: number;
}
const PalletItems: React.FC<Items> = ({ items, addCount, removeCount, index }) => {

    return <div>
        {items.map(item => item.item && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 15 }}>
            <span style={{ display: 'flex', width: '85%', }}>
                {typeof item.item === 'string' &&
                    select_modelname(item.item)
                }
            </span>
            <div className='material-symbols' style={{ width: '40%', display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined add" style={{ fontSize: '20px' }}
                    onClick={() => {
                        if (typeof item.item === 'string')
                            addCount(index, item.item)
                    }}
                >
                    add_circle
                </span>
                <span style={{ display: 'inline-block', width: '25px' }}>{item.CT_qty}</span>
                <span className="material-symbols-outlined remove" style={{ fontSize: '20px' }}

                    onClick={() => {
                        if (typeof item.item === 'string')
                            removeCount(index, item.item)
                    }}
                >
                    do_not_disturb_on
                </span>
            </div>
        </div>)
        }
    </div >
}
const PalletComponent: React.FC<Props> = ({ palletData, settingPallet, addCount, removeCount }) => {

    const drop = (index: number, itemName: { name: string, CT_qty: number, quantity: number, weight: number, moq: number, cbm: number, sets: string, mode: string }) => {
        settingPallet(index, {
            item: itemName.name,
            CT_qty: itemName.CT_qty, quantity: itemName.quantity, weight: itemName.weight,
            moq: itemName.moq, cbm: itemName.cbm, sets: itemName.sets, mode: itemName.mode
        })
    }
    const values = Object.values(palletData)

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
                    // draggable

                    onDragLeave={(e) => { e.currentTarget.style.background = "white" }}
                    onDragOver={(e) => {
                        e.preventDefault();


                        e.currentTarget.style.background = "pink"


                    }}
                    onDrop={(e) => {
                        // e.preventDefault()
                        const { name, CT_qty, quantity, weight, moq, cbm, sets, mode } = JSON.parse(e.dataTransfer.getData('item'))
                        e.currentTarget.style.background = "white"
                        drop(index, { name, CT_qty, quantity, weight, moq, cbm, sets, mode })
                    }}
                    style={{
                        position: 'relative', overflowY: 'auto',
                        width: '230px', height: '100px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center'
                    }}
                >
                    <div style={{ position: 'absolute', left: '40%', fontSize: '80px', opacity: '.1' }}>
                        {index + 1}
                    </div>
                    <PalletItems items={data} addCount={addCount} removeCount={removeCount} index={index} />
                </div>)}

            </div>

        </div>
    );

}
export default PalletComponent;