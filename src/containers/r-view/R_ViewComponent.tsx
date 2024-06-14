import React from 'react';

const R_ViewComponent = () => {
    const relations = [

        { u: 3, l: 5, p: 2 },
        { u: 3, l: 6, p: 3 },
        { u: 6, l: 7, p: 2 },
        { u: 6, l: 8, p: 4 },
        { u: 6, l: 14, p: 2 },
        { u: 9, l: 13, p: 1 },
        { u: 6, l: 9, p: 2 },
        { u: 9, l: 10, p: 3 },
        // { u: 9, l: 12 ,p:4},
        // { u: 5, l: 22,p:2 },
        // { u: 5, l: 20 ,p:3},
        // { u: 3, l: 4 ,p:6},
        // { u: 9, l: 11,p:3 },
        // { u: 5, l: 21,p:2 },
    ]
    let assyPrice = [{ id: 3, totalPrice: 19 }, { id: 6, totalPrice: 10 }, { id: 9, totalPrice: 4 }]
    let array: { id: number, top: number, left: number, price: number, totalPrice: number }[] = [];
    let lastLeft = 0;
    let totalPrice = 0;
    const findChild = (id: number, top: number, left: number, price: number) => {
        const children = relations.filter(rel => rel.u === id).map(rel => ({ lower: rel.l, price: rel.p }))
        if (lastLeft >= left) {
            left = lastLeft + 60;
        }
        // const totalPrice = assyPrice.filter(assy => assy.id === id).map(assy => ({id:assy.id,totalPrice:assy.totalPrice}))
        // console.log('totalPrice:', totalPrice)

        array.push({ id: id, top: top, left: left, price: price, totalPrice: 0 })

        if (children.length === 0) {
            lastLeft = left > lastLeft ? left : lastLeft;

            return;
        }

        for (let index = 0; index < children.length; index++) {
            findChild(children[index].lower, top + 100, left + index * 60, children[index].price)
        }

    }
    const createGraph = (id: number) => {

        findChild(id, 0, 100, 0);
    }
    createGraph(3)
    console.log(totalPrice)

    return (
        <div style={{ top: '10rem', position: 'relative' }}>
            {array.map(item => <div key={item.id} style={{ fontSize: '9px', position: 'absolute', top: item.top, left: item.left, border: '1px solid black', width: '50px', height: '50px', textAlign: 'center' }}>
                <div>{item.id}</div><div>입고가:{item.totalPrice}</div><div>출고가{item.price}</div>
            </div>)
            }
        </div >
    );
};

export default R_ViewComponent;