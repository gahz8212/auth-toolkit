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
        sum_im_price: number;
        ex_price: number;
        use: boolean,
        supplyer: string,
        Images: { url: string }[]

    }[] | null;
    dragItems: { [key: string]: string | number | boolean }[];
    addCount: (targetId: number | string | boolean, itemId: number | string | boolean) => void;
    removeCount: (targetId: number | string | boolean, itemId: number | string | boolean) => void;
    drag_on: (targetId: number, itemId: number) => void;
    dragedItem: { id: number } | null;
    viewRelation: (toggle: boolean) => void;
    addRelateGood: (item: { [key: string]: number | {}[] }) => void;
    relations: {
        UpperId: number;
        LowerId: number;
        point: number;
    }[] | null;
    inputDragItems: (dragItems: {}[]) => void;
}
const LeftComponent: React.FC<Props> = ({ items, dragItems, addCount, removeCount, drag_on, dragedItem, viewRelation, addRelateGood, relations, inputDragItems }) => {
    const [openId, setOpenId] = useState<number[]>([])
    const [openView, setOpenView] = useState<boolean>(false)
    return (
        <div className='left'>
            <div className="items">
                {items && items.filter(item => item.type === 'SET').map(item =>
                    <div key={item.id} className='item'>
                        <div className='title'>{item.itemName}</div>

                        <div className='itemInfo'>
                            <div className="image">
                                {item.Images.length > 0 ? <img src={item.Images[0].url} alt='' ></img> :
                                    <img src="http://via.placeholder.com/170x120" alt=""></img>}
                            </div>
                            <div className='info'>
                                <div>카테고리: {item.category}</div>
                                <div>입고가: {item.unit}{item.im_price}</div>
                                <div>출고가: ${item.ex_price}</div>
                                <div>설명: {item.descript}</div>
                            </div>
                        </div>
                        <button onClick={() => {
                            if (!openId.includes(item.id)) {
                                setOpenId([...openId, item.id])
                                let newArray: {}[] = [];
                                relations?.map(relation => items.map(fitem => {
                                    if (relation.LowerId === fitem.id) {
                                        newArray.push({
                                            id: relation.LowerId, point: relation.point, targetId: relation.UpperId,
                                            itemName: fitem.itemName, type: fitem.type, category: fitem.category
                                        })
                                        return newArray;
                                    } else { return null }
                                }))
                                console.log(newArray)
                                inputDragItems(newArray)

                            } else {
                                setOpenId(openId.filter(ids => ids !== item.id))
                            }
                        }}>Relations</button>
                        <button onClick={() => { viewRelation(openView); setOpenView(!openView) }}>view Relation</button>
                        {/* <button onClick={() => { viewRelation(false) }}>close view</button> */}
                        {dragItems.filter(dragItem => dragItem.targetId === item.id).length > 0 &&
                            <div className='lowerList'>총 {dragItems.filter(dragItem => dragItem.targetId === item.id).length}건의 하위 아이템</div>}

                        <div className={`relation-list ${openId.includes(item.id) ? 'open' : 'close'} item_basket`}

                            onDragEnter={() => {
                                if (dragedItem) drag_on(item.id, dragedItem.id)
                            }}
                        >
                            {dragItems.filter(dragitem => dragitem.targetId === item.id).map((dragitem) =>
                                <div className="countControl" key={dragitem.id.toString()}>
                                    <div className={`itemName ${item.category}`}>
                                        {dragitem.itemName}
                                    </div>
                                    <div className='material-symbols'>
                                        <span className="material-symbols-outlined add" style={{ fontSize: '20px' }}
                                            onClick={() => {
                                                addCount(dragitem.targetId, dragitem.id)
                                            }}
                                        >
                                            add_circle
                                        </span>
                                        <span>{dragitem.point}</span>
                                        <span className="material-symbols-outlined remove" style={{ fontSize: '20px' }}
                                            onClick={() => { removeCount(dragitem.targetId, dragitem.id) }}>
                                            do_not_disturb_on
                                        </span>
                                    </div>
                                </div>)}
                        </div>
                        <button onClick={() => { addRelateGood({ id: item.id, dragItems }) }}>연결</button>
                    </div>)}
            </div>
        </div>
    );
};

export default LeftComponent;