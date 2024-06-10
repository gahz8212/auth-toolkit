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
}
const LeftComponent: React.FC<Props> = ({ items }) => {
    const [openId, setOpenId] = useState<number[]>([])
    return (
        <div className='left'>
            <div className="items">
                {items && items.map(item =>
                    <div key={item.id} className='item'>
                        <div className='title'>{item.itemName}</div>

                        <div className='itemInfo'>
                            <div className="image">
                                {item.Images.length > 0 ? <img src={item.Images[0].url} alt='' ></img> :
                                    <img src="http://via.placeholder.com/170x120" alt=""></img>}
                            </div>
                            <div className='info'>
                                <div>카테고리: {item.category}</div>
                                <div>입고가: \{item.im_price}</div>
                                <div>출고가: {item.unit}{item.ex_price}</div>
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
                        <div className={`relation-list ${openId.includes(item.id) ? 'open' : 'close'}`}></div>
                    </div>)}
            </div>
        </div>
    );
};

export default LeftComponent;