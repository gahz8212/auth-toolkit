import React from 'react';
import { useDrag } from 'react-use-gesture';
import InputFormContainer from '../forms/inputForm/InputFormContainer';
import EditFormContainer from "../forms/editForm/EditFormContainer";
import CardContainer from '../common/card/CardContainer';

type Props = {

    input: { visible: boolean; position: { x: number; y: number } };
    edit: { visible: boolean; position: { x: number; y: number } };
    changePosition: (form: string, position: { x: number, y: number }) => void;
    openAddForm: () => void;

}

const HomeComponent: React.FC<Props> = ({ input, edit, openAddForm, changePosition }) => {

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
            <div style={{ height: '90px' }}></div>


            <div style={{ position: 'fixed', zIndex: 2, margin: '0 5rem' }}>
                <div style={{ display: 'flex', position: 'fixed', boxSizing: 'border-box' }}>
                    <div className="left">
                        <div className="model_name"
                            style={{
                                width: '200px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'yellow', borderTop: '1px solid black', borderLeft: '1px solid black', borderBottom: '1px solid black',
                            }}>H2O</div>
                    </div>
                    <div className="right" style={{ display: 'flex', flexWrap: 'wrap', width: '1100px', height: '120px', background: 'white' }}>
                        <div className="model_number" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', background: 'yellow' }}>1820</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', background: 'yellow' }}>PLUS_선택+만들기</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black' }}>결합물 생성</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black' }}>결합물 생성</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeft: '1px solid black' }}>PAC</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black' }}>결합물 생성</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>결합물 생성</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>결합물 생성</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>결합물 생성</div>
                        <div className="model_option" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>결합물 생성</div>
                    </div>
                </div>
                <div style={{ height: '120px' }}></div>
                <div style={{ height: '200px', width: '200px', textAlign: 'center', border: '1px solid gray' }}>aaa</div>
                <div style={{ height: '200px', width: '200px', textAlign: 'center', border: '1px solid gray' }}>bbb</div>
                <div style={{ height: '200px', width: '200px', textAlign: 'center', border: '1px solid gray' }}>ccc</div>
            </div>

            <CardContainer />

            <span onClick={openAddForm} className="material-symbols-outlined write">
                edit_document
            </span>
        </div >
    );
};
export default HomeComponent;