import React, { useState } from 'react';
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
    dragItems: { [key: string]: string | number | boolean }[];
    addCount: (id: number | string | boolean) => void;
    removeCount: (id: number | string | boolean) => void;
    drag_on: (targetId: number) => void;
}
const LeftComponent: React.FC<Props> = ({ items, dragItems, addCount, removeCount, drag_on }) => {
    const [openId, setOpenId] = useState<number[]>([])
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
                            } else {
                                setOpenId(openId.filter(ids => ids !== item.id))
                            }
                        }}>Relations</button>
                        {dragItems.filter(dragItem => dragItem.targetId === item.id).length > 0 &&
                            <div className='lowerList'>총 {dragItems.filter(dragItem => dragItem.targetId === item.id).length}건의 하위 아이템</div>}

                        <div className={`relation-list ${openId.includes(item.id) ? 'open' : 'close'} item_basket`}
                            onDragEnter={() => { drag_on(item.id) }}
                        >
                            {dragItems.filter(dragitem => dragitem.targetId === item.id).map((dragitem) =>
                                <div className="countControl" key={item.id.toString()}>
                                    <div className={`itemName ${item.category}`}>
                                        {dragitem.itemName}
                                    </div>
                                    <div className='material-symbols'>
                                        <span className="material-symbols-outlined add" style={{ fontSize: '20px' }}
                                            onClick={() => {
                                                addCount(dragitem.targetId)
                                            }}
                                        >
                                            add_circle
                                        </span>
                                        <span>{dragitem.point}</span>
                                        <span className="material-symbols-outlined remove" style={{ fontSize: '20px' }}
                                            onClick={() => { removeCount(dragitem.targetId) }}>
                                            do_not_disturb_on
                                        </span>
                                    </div>
                                </div>)}
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default LeftComponent;