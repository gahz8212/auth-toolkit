import React, { useState } from 'react';
type Props = {
    items: {
        id: number,
        type: string,
        category: string,
        itemName: string,
        descript: string,
        unit: string,
        im_price: number;
        ex_price: number;
        use: boolean,
        supplyer: string,
        Images: { url: string }[]
    }[] | null;
    selectItem: (id: number) => void;
    dragItem: (id: number) => void;
    onDrop: () => void;

}

const CardComponent: React.FC<Props> = ({ items, selectItem, dragItem, onDrop }) => {

    const [selected, setSelected] = useState<number | ''>()
    const [shows, setShows] = useState<number[]>([])
    const [check, setCheck] = useState<number[]>([])
    const onDragStart = (index: number) => {
        dragItem(index);
    }

    const showBack = (id: number) => {
        if (!shows.includes(id)) {
            setShows([id, ...shows])
        }
    }
    const removeBack = (id: number) => {
        setShows(shows.filter(show => show !== id))
    }
    const checkedItem = (id: number) => {
        if (!check.includes(id)) {
            setCheck([id, ...check])
        }
        else {
            setCheck(check.filter(check => check !== id))
        }
    }
    return (

        <div className="item-list">
            {items?.map((item, index) =>
                <div
                    key={index}
                    className={`infos 
                    ${selected === item.id ? 'selected' : ''} 
                    ${shows.includes(item.id) ? 'back' : ""}
                    ${check.includes(item.id) ? 'check' : ""}
                    ${item.type === 'SET' ? 'SET' : item.type === 'ASSY' ? 'ASSY' : 'PARTS'}`

                    }
                    draggable
                    onDragStart={() => { onDragStart(item.id) }}
                    onDragEnd={onDrop}

                >
                    <div className={`info text ${item.category} `}>
                        <div className="footer">

                            <div className="edit">
                                <span className="material-symbols-outlined edit" onClick={() => { selectItem(item.id); setSelected(item.id) }}>
                                    Edit
                                </span>
                            </div>
                            <div className="check">
                                <span className="material-symbols-outlined check" onClick={() => { checkedItem(item.id) }}>
                                    Check
                                </span>
                            </div>
                            <div className="redo">
                                <span className="material-symbols-outlined redo" onClick={() => { showBack(item.id) }}>
                                    Redo
                                </span>
                            </div>
                        </div>

                        <div>{item.category}</div>
                        <div>{item.itemName}</div>
                        <div>{item.unit === '\\' ? '￦' : item.unit}{item.im_price}</div>
                        <div>${item.ex_price}</div>

                    </div>
                    <div className={`info image  ${item.category} `}>
                        <div className="undo">
                            <span className="material-symbols-outlined undo" onClick={() => { removeBack(item.id) }}>
                                Undo
                            </span>
                        </div>
                        {item.Images && item.Images.length > 0 && <img src={item.Images[0].url} alt='' width="100%"></img>}

                    </div>
                </div>)}
        </div>
    );
};

export default CardComponent;