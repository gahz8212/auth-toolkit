import React from 'react';
type Props = {
    topMargin: string;
    relate_view: {
        currentId: number;
        itemName: string;
        top: number;
        left: number;
        point: number;
        sum_im_price: number;
        ex_price: number
    }[] | null
}
const R_ViewComponent: React.FC<Props> = ({ topMargin, relate_view }) => {
    console.log('relate_view', relate_view)



    return (
        <div style={{ top: topMargin, position: 'relative', background: 'white', width: '800px', height: '600px' }}>

            {relate_view && relate_view.map(item => <div key={item.currentId} style={{ fontSize: '12px', position: 'absolute', top: item.top, left: item.left, border: '1px solid black', width: '50px', height: '50px', textAlign: 'center' }}>
                <div>{item.itemName}</div><div>입고가{item.sum_im_price}</div><div>Point{item.point}</div><div>출고가{item.ex_price}</div>
            </div>)
            }
        </div >
    );
};

export default R_ViewComponent;