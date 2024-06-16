import React from 'react';

const R_ViewComponent = () => {
    const relations = [

        { u: 3, l: 5, ip: 2, ep: 5 },
        { u: 3, l: 6, ip: 0, ep: 5 },
        { u: 6, l: 7, ip: 2, ep: 5 },
        { u: 6, l: 8, ip: 4, ep: 5 },
        { u: 6, l: 14, ip: 2, ep: 5 },
        { u: 9, l: 13, ip: 1, ep: 5 },
        { u: 6, l: 9, ip: 0, ep: 5 },
        { u: 9, l: 10, ip: 3, ep: 5 },
        // { u: 9, l: 12 ,ip:4,ep:5},
        // { u: 5, l: 22,ip:2,ep:5 },
        // { u: 5, l: 20 ,ip:3,ep:5},
        // { u: 3, l: 4 ,ip:6,ep:5},
        // { u: 9, l: 11,ip:3 ,ep:5},
        // { u: 5, l: 21,ip:2,ep:5 },
    ]

    let array: { id: number, top: number, left: number, im_price: number, ex_price: number }[] = [];
    let lastLeft = 0;

    const findChild = (id: number, top: number, left: number, im_price: number, ex_price: number) => {
        const children = relations.filter(rel => rel.u === id).map(rel => ({ lower: rel.l, im_price: rel.ip, ex_price: rel.ep }))
        if (lastLeft >= left) {
            left = lastLeft + 60;
        }

        const newItem = { id: id, top: top, left: left, im_price: im_price, ex_price: ex_price }
        array.push(newItem)

        if (children.length === 0) {
            lastLeft = left > lastLeft ? left : lastLeft;
            return;
        }

        for (let index = 0; index < children.length; index++) {
            newItem.im_price += children[index].im_price;
            // array.filter(arr => arr.id === id)[0].im_price = newItem.im_price
            findChild(children[index].lower, top + 100, left + index * 60, children[index].im_price, children[index].ex_price)
        }

    }
    const createGraph = (id: number) => {

        findChild(id, 0, 100, 0, 0);
    }
    createGraph(3)


    return (
        <div style={{ top: '10rem', position: 'relative' }}>
            {array.map(item => <div key={item.id} style={{ fontSize: '11px', position: 'absolute', top: item.top, left: item.left, border: '1px solid black', width: '50px', height: '50px', textAlign: 'center' }}>
                <div>{item.id}</div><div>입고가{item.im_price}</div><div>출고가{item.ex_price}</div>
            </div>)
            }
        </div >
    );
};

export default R_ViewComponent;