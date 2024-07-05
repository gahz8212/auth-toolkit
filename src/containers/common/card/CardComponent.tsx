import React, { useState } from 'react';
type Props = {
    items: {
        id: number,
        type: string,
        category: string,
        itemName: string,
        descript: string,
        unit: string,
        sum_im_price: number;
        im_price: number;
        ex_price: number;
        use: boolean,
        supplyer: string,
        Images: { url: string }[],
        Good: { groupName: string },
        left: number,
        top: number,
        point: number

    }[] | null;
    selectItem: (id: number) => void;
    dragItem: (id: number) => void;
    onDrop: () => void;
    viewMode: boolean;


}

const CardComponent: React.FC<Props> = ({ items, selectItem, dragItem, onDrop, viewMode }) => {
    console.log('viewMode', viewMode)
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
        <>
            {viewMode ? <div className="item-list"
                style={{ position: 'relative' }}>
                {items?.map((item, index) =>
                    <div
                        key={index}
                        className={`infos 
                    ${selected === item.id ? 'selected' : ''} 
                    ${shows.includes(item.id) ? 'back' : ""}
                    ${check.includes(item.id) ? 'check' : ""}
                    ${item.type === 'SET' ? 'SET' : item.type === 'ASSY' ? 'ASSY' : 'PARTS'}
                    ${viewMode === true ? 'absolute' : 'relative'}`
                        }
                        style={{ position: 'absolute', left: item.left * 1.5, top: item.top * 1.7 }}
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

                            <div>{item.id}</div>
                            {/* <div>{item.category}</div> */}
                            <div>{item.itemName}</div>
                            {/* {item.type !== 'SET' && <div>{item.unit === '\\' ? '￦' : item.unit}{item.im_price}</div>} */}
                            {item.type !== 'SET' &&
                                <>
                                    <div>입고가:{item.unit === '\\' ? '￦' : item.unit}{item.im_price}</div>
                                    <div>포인트:{item.point}</div>
                                </>}
                            <div>총입고가:\{item.sum_im_price}</div>

                            {item.ex_price && <div>수출가:${item.ex_price}</div>}

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
            </div> :
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

                                <div>{item.id}</div>
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
                </div >}</>
    );
};

export default CardComponent;