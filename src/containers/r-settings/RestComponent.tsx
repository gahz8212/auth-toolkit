import React from 'react';
import CardComponent from '../common/card/CardComponent';
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
    }[];
    selectItem: (id: number) => void;
    dragItem: (id: number) => void;
    onDrop: () => void;


}
const RestComponent: React.FC<Props> = ({ items, selectItem, dragItem, onDrop }) => {
    const parts = items.filter(item => item.type !== 'SET')
    return (

        <div className="right">

            <CardComponent items={parts} selectItem={selectItem}
                dragItem={dragItem}
                onDrop={onDrop} />
        </div>

    );
};

export default RestComponent;