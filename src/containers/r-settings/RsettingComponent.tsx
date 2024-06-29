
import React from 'react';
import { useDrag } from 'react-use-gesture';
import InputFormContainer from '../forms/inputForm/InputFormContainer';
import EditFormContainer from "../forms/editForm/EditFormContainer";
import LeftComponent from './LeftComponent';
import RestComponent from './RestComponent';
import RViewComponent from '../r-view/R_ViewComponent';


type Props = {

    items: {
        id: number,
        type: string,
        category: string,
        itemName: string,
        descript: string,
        unit: string,
        im_price: number;
        sum_im_price: number;
        ex_price: number;
        use: boolean,
        supplyer: string,
        Images: { url: string }[]
    }[] | null;
    relations: { UpperId: number, LowerId: number, point: number }[] | null,
    selectItem: (id: number) => void;
    dragItem: (id: number) => void;
    onDrop: () => void;
    input: { visible: boolean; position: { x: number; y: number } };
    edit: { visible: boolean; position: { x: number; y: number } };
    relate: { visible: boolean; position: { x: number; y: number } };
    changePosition: (form: string, position: { x: number, y: number }) => void;
    openAddForm: () => void;
    dragItems: { [key: string]: string | number | boolean }[];
    addCount: (targetId: number | string | boolean, itemId: number | string | boolean) => void;
    removeCount: (targetId: number | string | boolean, itemId: number | string | boolean) => void;
    drag_on: (targetId: number, itemId: number) => void;
    // sum_input_price: number
    dragedItem: { id: number } | null;
    viewRelation: (toggle: boolean) => void;
    relate_view: {
        currentId: number;
        itemName: string,
        top: number;
        left: number;
        point: number;
        sum_im_price: number;
        ex_price: number;
    }[] | null
}

const RsettingComponent: React.FC<Props> = ({ input,
    edit, openAddForm, changePosition, items, relate, selectItem, onDrop, dragItem, dragItems, addCount, removeCount, drag_on, dragedItem, viewRelation, relate_view }) => {

    const inputPos = useDrag(params => { changePosition('input', { x: params.offset[0] + 250, y: params.offset[1] + 300 }) })
    const editPos = useDrag(params => { changePosition('edit', { x: params.offset[0] + 250, y: params.offset[1] + 300 }) })
    const relatePos = useDrag(params => { changePosition('relate', { x: params.offset[0] + 250, y: params.offset[1] + 300 }) })



    return (
        <div className='home-wraper'>
            {relate.visible && <div >
                <div {...relatePos()} style={{ color: 'white', position: 'fixed', top: relate.position.y, left: relate.position.x, zIndex: 2, textAlign: 'center', width: '300px' }}>
                    <span style={{ display: 'inline-block', width: '300px', padding: '.3rem', userSelect: 'none' }}>Relation View</span>
                </div>
                <div style={{ position: 'fixed', top: relate.position.y, left: relate.position.x, zIndex: 1 }}>

                    <RViewComponent topMargin='3rem' relate_view={relate_view} />
                </div>
            </div>}
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
                <LeftComponent items={items} dragItems={dragItems} drag_on={drag_on} addCount={addCount} removeCount={removeCount} dragedItem={dragedItem} viewRelation={viewRelation} />
                <RestComponent items={items} selectItem={selectItem} dragItem={dragItem} onDrop={onDrop} />
            </div>
        </div >
    );
};
export default RsettingComponent;