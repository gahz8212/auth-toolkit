import React from 'react';
type Props = {
    relate_view: {
        currentId: number;
        itemName: string;
        top: number;
        left: number;
        point: number;
        sum_im_price: number;
        ex_price: number;
    }[] | null
}
const RelationComponent: React.FC<Props> = ({ relate_view }) => {
    console.log(relate_view)
    return (<div style={{
        padding: '3rem', position: 'relative', backgroundColor: 'yellow'
        , width: '300px', height: '300px'
    }}>
        {relate_view && relate_view.map(view => <div
            key={view.currentId}
            style={{
                marginTop: '1rem',
                position: 'absolute',
                top: view.top * 0.8,
                left: view.left * 1.2,
                border: '1px solid black',
                // width: '150px'
            }}
        >{view.itemName}</div>)}
    </div>)

};

export default RelationComponent;