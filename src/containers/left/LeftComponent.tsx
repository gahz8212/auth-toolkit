import React from 'react';
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
    return (
        <div className='left'>
            <div className="item">
                {items && items.map(item =>
                    <div key={item.id}>
                        <div>{item.itemName}</div>
                        {item.Images && <img src="/cat1.jpg" alt="" />}
                    </div>)}
            </div>
        </div>
    );
};

export default LeftComponent;