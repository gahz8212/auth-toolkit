
import React, { useState } from 'react';
import { select_modelname } from '../../../lib/utils/parseModelName'
type Props = {
    palletData: {
        [key: number]: { [key: string]: string | number; }[]
    }
    settingPallet: (Pnumber: number, itemData: { item: string, CT_qty: number, quantity: number, weight: number, moq: number, cbm: number, sets: string, mode: string }) => void
    addCount: (id: number, item: string, value: number) => void;
    removeCount: (id: number, item: string) => void;
    onInputPallet: () => void
    removeItem: (id: number, item: string) => void
    resetPallet: () => void
}
type Items = {
    items: {
        [key: string]: string | number;
    }[];
    addCount: (id: number, item: string, value: number) => void;
    removeCount: (id: number, item: string) => void;
    removeItem: (id: number, item: string) => void;
    index: number;
    resetPallet: () => void
}
const PalletItems: React.FC<Items> = ({ items, addCount, removeCount, index, removeItem, resetPallet }) => {
    const [inter, setInter] = useState<NodeJS.Timeout | undefined>(undefined)

    function inCrease(id: number, item: string, value: number) {
        setInter(
            setInterval(() => {
                addCount(id, item, value)
            }, 100)

        )
    }
    function deCrease(id: number, item: string) {
        setInter(setInterval(() => {
            removeCount(id, item)
        }, 100))
    }
    return <div>
        {items.map(item => item.item && <div
            className='elem-pallet'
            draggable
            onDragStart={(e) => {
                const img = new Image();
                img.src = './images/package.png'
                e.dataTransfer.setDragImage(img, 50, 50)
                e.dataTransfer.setData('item', JSON.stringify({
                    name: item.item,
                    CT_qty: item.CT_qty,
                    quantity: item.quantity,
                    weight: item.weight,
                    moq: item.moq,
                    cbm: item.cbm,
                    sets: item.sets,
                    mode: 'copy'
                }))
                clearInterval(inter)
            }}
        >
            <span className='modelName'>
                {typeof item.item === 'string' &&
                    select_modelname(item.item)
                }
            </span>
            <div className='material-symbols' >
                <span className="material-symbols-outlined add"
                    onClick={() => {
                        if (typeof item.item === 'string' && typeof item.CT_qty === 'number')
                            addCount(index, item.item, item.CT_qty)
                    }}
                    onMouseDown={() => {
                        if (typeof item.item === 'string' && typeof item.CT_qty === 'number')
                            inCrease(index, item.item, item.CT_qty)
                    }}
                    onMouseUp={() => {
                        clearInterval(inter)
                    }}
                >
                    add_circle
                </span>
                <span className='CT_qty'>{item.CT_qty}</span>
                <span className="material-symbols-outlined remove"

                    onClick={() => {
                        if (typeof item.item === 'string') {

                            removeCount(index, item.item)
                        }
                        if (item.CT_qty === 1) {

                            // eslint-disable-next-line no-restricted-globals
                            let result = confirm('이 품목을 삭제합니까?')
                            if (result) {
                                if (typeof item.item === 'string') {
                                    removeItem(index, item.item)
                                }
                            }
                        }
                    }
                    }
                    onMouseDown={() => {
                        if (item && typeof item.item === 'string') {
                            deCrease(index, item.item)
                        }
                    }}
                    onMouseUp={() => {
                        clearInterval(inter)
                    }}
                >
                    do_not_disturb_on
                </span>
            </div>
        </div>)
        }
    </div >
}
const PalletComponent: React.FC<Props> = ({ palletData, settingPallet, addCount, removeCount, onInputPallet, removeItem, resetPallet }) => {

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
            <div className='wrap-pallet'
            >
                {values.map((data, index) => <div
                    className='outline-pallet'

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
                >
                    <div style={{ position: 'absolute', left: index < 9 ? "40%" : "30%", fontSize: '80px', opacity: '.1', userSelect: 'none' }}>
                        {index + 1}
                    </div>
                    <PalletItems items={data} addCount={addCount} removeCount={removeCount} index={index} removeItem={removeItem} resetPallet={resetPallet} />
                </div>)}
            </div>
            <button onClick={resetPallet}>초기화</button>
            <button onClick={onInputPallet}>입력</button>
        </div>
    );
}
export default PalletComponent;