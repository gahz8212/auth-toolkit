import React, { useState } from 'react';
import { useDrag } from 'react-use-gesture';
import NavComponent from '../common/navigate/NavComponent';
import InputFormContainer from '../inputForm/InputFormContainer';
import EditFormContainer from "../editForm/EditFormContainer";
import SearchContainer from '../search/SearchContainer';
type Props = {
    items: {
        id: number,
        category: string,
        name: string,
        descript: string,
        unit: string,
        price: number,
        count: number,
        use: boolean,
        supplyer: string,
        Images: { url: string }[]
    }[];
    selectItem: (id: number) => void;
    input: { visible: boolean; position: { x: number; y: number } };
    edit: { visible: boolean; position: { x: number; y: number } };
    search: { visible: boolean; position: { x: number; y: number } };
    changePosition: (form: string, position: { x: number, y: number }) => void;
    openAddForm: () => void;
    // datas: any[] | null
}
type subProps = {
    item: {
        id: number,
        category: string,
        name: string,
        descript: string,
        unit: string,
        price: number,
        count: number,
        use: boolean,
        supplyer: string,
        Images: { url: string }[]
    }

}
const ImageList: React.FC<subProps> = ({ item }) => {
    return <img src={item.Images[0].url} alt={item.Images[0].url} width='100px' />
}
const HomeComponent: React.FC<Props> = ({ items, selectItem, input, edit, search, openAddForm, changePosition }) => {
    // console.log(edit)
    const [selected, setSelected] = useState<number | ''>()
    const inputPos = useDrag(params => { changePosition('input', { x: params.offset[0] + 100, y: params.offset[1] + 150 }) })
    const editPos = useDrag(params => { changePosition('edit', { x: params.offset[0] + 100, y: params.offset[1] + 150 }) })

    const [visible, setVisible] = useState<boolean>()
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
            <div className="item-list">
                {items.map((item, index) =>
                    <div key={index} className={`infos ${selected === item.id ? 'selected' : ''}`} onClick={() => { selectItem(item.id); setSelected(item.id) }}>
                        <div className={`info text ${item.category}`}>
                            <div>{item.category}</div>
                            <div>{item.name}</div>
                            <div>{item.unit === '\\' ? '￦' : item.unit}{item.price}</div>
                        </div>
                        <div className="info image">
                            {item.Images?.length && <ImageList item={item} />}
                            {/* {item.Images && <img src={item.Images[0].url} alt={item.Images[0].url} width='100px' />} */}
                        </div>
                    </div>)}
            </div>
            <span onClick={openAddForm} className="material-symbols-outlined write">
                edit_document
            </span>
        </div >
    );
};
export default HomeComponent;