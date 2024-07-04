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
        sum_im_price: number;
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
const RestComponent: React.FC<Props> = ({ items, selectItem, dragItem, onDrop, viewMode }) => {
    if (items) {
        let parts;
        if (viewMode) {
            parts = items
        } else {
            parts = items.filter(item => item.type !== 'SET')
        }
        return (

            <div className="right">

                <CardComponent items={parts} selectItem={selectItem}
                    dragItem={dragItem}
                    onDrop={onDrop} viewMode={viewMode} />
            </div>

        );
    } else
        return null
};

export default RestComponent;