import React, { useState, useRef } from 'react';
type Props = {
    items: {
        id: number,
        category: string,
        partsName: string,
        descript: string,
        unit: string,
        im_price: number;
        ex_price: number;
        use: boolean,
        supplyer: string,
        Images: { url: string }[]
    }[];
    selectItem: (id: number) => void;
}
type subProps = {
    item: {
        id: number,
        category: string,
        partsName: string,
        descript: string,
        unit: string,
        im_price: number;
        ex_price: number;
        use: boolean,
        supplyer: string,
        Images: { url: string }[]
    }

}
const ImageList: React.FC<subProps> = ({ item }) => {
    return <img src={item.Images[0].url} alt={item.Images[0].url} width='100px' />
}
const CardComponent: React.FC<Props> = ({ items, selectItem }) => {
    const [selected, setSelected] = useState<number | ''>()
    const dragItem: any = useRef();
    const dragOverItem: any = useRef();
    const onDragStart = (index: number) => {
        dragItem.current = index;
    }
    const onDragEnter = (index: number) => {
        dragOverItem.current = index
    }
    const onDrop = () => {
        console.log(dragOverItem.current, dragItem.current)
        dragItem.current = null;
        dragOverItem.current = null;
    }
    return (

        <div className="item-list">
            {items.map((item, index) =>
                <div
                    key={index}
                    className={`infos ${selected === item.id ? 'selected' : ''}`}
                    onClick={() => { selectItem(item.id); setSelected(item.id) }}
                    draggable
                    onDragStart={() => { onDragStart(item.id) }}
                    onDragEnter={() => { onDragEnter(item.id) }}
                    onDragEnd={onDrop}
                >
                    <div className={`info text ${item.category}`}>
                        <div>{item.category}</div>
                        <div>{item.partsName}</div>
                        <div>{item.unit === '\\' ? '￦' : item.unit}{item.im_price}</div>
                        <div>{item.unit === '\\' ? '￦' : item.unit}{item.ex_price}</div>
                    </div>
                    <div className="info image">
                        {item.Images?.length && <ImageList item={item} />}
                    </div>
                </div>)}
        </div>
    );
};

export default CardComponent;