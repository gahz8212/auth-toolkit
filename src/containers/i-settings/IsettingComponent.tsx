import React from 'react';
import { useDrag } from 'react-use-gesture';
import InputFormContainer from '../forms/inputForm/InputFormContainer';
import EditFormContainer from "../forms/editForm/EditFormContainer";
import CardContainer from '../common/card/CardContainer';
import RelationContainer from '../forms/relationForm/RelationContainer';

type Props = {

    input: { visible: boolean; position: { x: number; y: number } };
    edit: { visible: boolean; position: { x: number; y: number } };
    relate: { visible: boolean; position: { x: number; y: number } };
    changePosition: (form: string, position: { x: number, y: number }) => void;
    openAddForm: () => void;



}

const IsettingComponent: React.FC<Props> = ({ input, edit, relate, openAddForm, changePosition }) => {


    const inputPos = useDrag(params => { changePosition('input', { x: params.offset[0] + 250, y: params.offset[1] + 300 }) })
    const editPos = useDrag(params => { changePosition('edit', { x: params.offset[0] + 250, y: params.offset[1] + 300 }) })
    // const relatePos = useDrag(params => { changePosition('relate', { x: params.offset[0] + xy.x, y: params.offset[1] + xy.y }) })



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
            {relate.visible && <div style={{ position: 'fixed', top: relate.position.y + 40, left: relate.position.x - 130, zIndex: 1 }}>
                {/* <div {...relatePos()} style={{ color: 'black', position: 'fixed', top: relate.position.y, left: relate.position.x, zIndex: 2, textAlign: 'center', width: '300px' }}>
                    <span style={{ color: 'black', display: 'inline-block', width: '300px', padding: '.3rem', userSelect: 'none' }}>하위 아이템</span>
                </div>
                <div style={{ , top: relate.position.y, left: relate.position.x, zIndex: 1 }}>
                </div> */}
                <RelationContainer />
            </div>}
            <CardContainer />
            <div style={{ height: '90px' }}></div>
            <span onClick={openAddForm} className="material-symbols-outlined write">
                edit_document
            </span>
        </div >
    );
};
export default IsettingComponent;