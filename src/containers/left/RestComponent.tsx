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
const RestComponent: React.FC<Props> = ({ items }) => {
    console.log(items)
    return (
        <div className='Rest'>
            {items.map(item => <div key={item.id}>
                <div className="title">{item.itemName}</div></div>)}
        </div>
    );
};

export default RestComponent;