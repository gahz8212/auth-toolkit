
import React from 'react';
import { useDrag } from 'react-use-gesture';
import InputFormContainer from '../forms/inputForm/InputFormContainer';
import EditFormContainer from "../forms/editForm/EditFormContainer";
import LeftComponent from './LeftComponent';
import RestComponent from './RestComponent';


type Props = {

    items: {
        id: number,
        type: string,
        category: string,
        itemName: string,
        groupName: string,
        descript: string,
        unit: string,
        im_price: number;
        ex_price: number;
        use: boolean,
        supplyer: string,
        Images: { url: string }[]
    }[];
    selectItem: (id: number) => void;
    dragItem: (id: number) => void;
    onDrop: () => void;
    input: { visible: boolean; position: { x: number; y: number } };
    edit: { visible: boolean; position: { x: number; y: number } };
    changePosition: (form: string, position: { x: number, y: number }) => void;
    openAddForm: () => void;
    dragItems: { [key: string]: string | number | boolean }[];
    addCount: (targetId: number | string | boolean, itemId: number | string | boolean) => void;
    removeCount: (targetId: number | string | boolean, itemId: number | string | boolean) => void;
    drag_on: (targetId: number) => void;
    // sum_input_price: number

}

const RsettingComponent: React.FC<Props> = ({ input, edit, openAddForm, changePosition, items, selectItem, onDrop, dragItem, dragItems, addCount, removeCount, drag_on }) => {

    const inputPos = useDrag(params => { changePosition('input', { x: params.offset[0] + 250, y: params.offset[1] + 300 }) })
    const editPos = useDrag(params => { changePosition('edit', { x: params.offset[0] + 250, y: params.offset[1] + 300 }) })



    return (
        <div className='home-wraper'>
            {input.visible && <div >
                <div {...inputPos()} style={{ color: 'white', position: 'fixed', top: input.position.y, left: input.position.x, zIndex: 2, textAlign: 'center', width: '300px' }}>
                    <span style={{ display: 'inline-block', width: '300px', padding: '.3rem', userSelect: 'none' }}>아이템 입력</span>
                </div>
                <div style={{ position: 'fixed', top: input.position.y, left: input.position.x, zIndex: 1 }}>

                    <InputFormContainer />
                </div>
            </div>}
            {edit.visible && <div>
                <div {...editPos()} style={{ color: 'white', position: 'fixed', top: edit.position.y, left: edit.position.x, zIndex: 2, textAlign: 'center', width: '300px' }}>
                    <span style={{ display: 'inline-block', width: '300px', padding: '.3rem', userSelect: 'none' }}>아이템 수정</span>
                </div>
                <div style={{ position: 'fixed', top: edit.position.y, left: edit.position.x, zIndex: 1 }}>
                    <EditFormContainer />
                </div>
            </div>}
            <div className="rsettingComponent">
                <LeftComponent items={items} dragItems={dragItems} drag_on={drag_on} addCount={addCount} removeCount={removeCount} />
                <RestComponent items={items} selectItem={selectItem} dragItem={dragItem} onDrop={onDrop} />
            </div>
        </div >
    );
};
export default RsettingComponent;