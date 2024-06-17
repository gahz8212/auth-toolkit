import React from 'react';

const R_ViewComponent = () => {
    const relations = [
        { u: 3, l: 4, ip: 1, ep: 5 },
        { u: 3, l: 5, ip: 1, ep: 5 },
        { u: 5, l: 21, ip: 1, ep: 5 },
        { u: 21, l: 22, ip: 1, ep: 5 },
        { u: 21, l: 6, ip: 1, ep: 5 },
        { u: 21, l: 7, ip: 1, ep: 5 },
        { u: 3, l: 8, ip: 1, ep: 5 },
        { u: 3, l: 13, ip: 1, ep: 5 },
        { u: 13, l: 9, ip: 1, ep: 5 },
        { u: 8, l: 14, ip: 1, ep: 5 },
        { u: 7, l: 10, ip: 1, ep: 5 },
        { u: 5, l: 20 ,ip:1,ep:5},
        { u: 9, l: 12, ip: 1, ep: 5 },
        { u: 9, l: 11, ip: 1, ep: 5 },
    ]

    let array: { id: number, top: number, left: number, im_price: number, ex_price: number }[] = [];
    let lastLeft = 0;
    let history: number[] = []
    let itemId = 0;
    const findChild = (id: number, top: number, left: number, im_price: number, ex_price: number) => {
        const children = relations.filter(rel => rel.u === id).map(rel => ({ lower: rel.l, im_price: rel.ip, ex_price: rel.ep }))
        children.sort((a,b)=>relations.filter(rel=>rel.u===a.lower).length-relations.filter(rel=>rel.u===b.lower).length)
        // chidren들의 자식들 갯수로 sort()를 했으면 좋겠다.
        if (lastLeft >= left) {
            left = lastLeft + 60;
        }

        const newItem = { id: id, top: top, left: left, im_price: im_price, ex_price: ex_price }
        array.push(newItem)
        if (history.length > 0) {
            history.forEach(his => array.forEach(arr => arr.id === his ? arr.im_price += newItem.im_price : 0))
        }
        if (children.length === 0) {
            lastLeft = left > lastLeft ? left + 50 : lastLeft;
            return;
        }
        for (let index = 0; index < children.length; index++) {
            if (children[index].lower === 5 || children[index].lower === 8 || children[index].lower === 13 || children[index].lower === 4) history = []
            if (!history.includes(id)) { history.push(id) }
 
            findChild(children[index].lower, top + 60, left + index * 60, children[index].im_price, children[index].ex_price)
        }

    }
    const createGraph = (id: number) => {
        itemId = id
        findChild(id, 0, 60, 0, 0);
    }
    createGraph(3)


    return (
        <div style={{ top: '10rem', position: 'relative' }}>
            {array.map(item => <div key={item.id} style={{ fontSize: '12px', position: 'absolute', top: item.top, left: item.left, border: '1px solid black', width: '50px', height: '50px', textAlign: 'center' }}>
                <div>{item.id}</div><div>입고가{item.im_price}</div>
            </div>)
            }
        </div >
    );
};

export default R_ViewComponent;