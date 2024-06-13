import React from 'react';

const R_ViewComponent = () => {
    const arrayItems: { id: number, top: number, left: number }[] = [
        { id: 3, top: 100, left: 100 },
        { id: 4, top: 200, left: 100 },
        { id: 6, top: 300, left: 100 },
        { id: 7, top: 300, left: 200 },
        { id: 5, top: 200, left: 300 },
    ]
    const relations = [
        { u: 3, l: 4 },
        { u: 3, l: 5 },
        { u: 4, l: 6 },
        { u: 4, l: 7 },
        { u: 4, l: 8 },
        // { u: 7, l: 9 },
        // { u: 7, l: 10 },
    ]
    let array: { id: number, top: number, left: number, }[] = [];

    let firstNumber = 0
    let maxLeft = 0;
    const findChild = (id: number, top: number, left: number) => {
        const children = relations.filter(rel => rel.u === id).map(rel => rel.l)
        maxLeft = left > maxLeft ? left : maxLeft;

        array.push({ id: id, top: top, left: left })
        if (children.length === 0) return;

        for (let index = 0; index < children.length; index++) {
            if (id === firstNumber) {
                left = maxLeft + 1 * 100
            }
            findChild(children[index], top + 100, left + index * 100)
        }

    }
    const createGraph = (id: number) => {
        firstNumber = id
        findChild(id, 100, 100);
    }
    createGraph(3)
    // console.log(array)

    return (
        <div style={{ top: '10rem', position: 'relative' }}>
            {array.map(item => <div key={item.id} style={{ position: 'absolute', top: item.top, left: item.left, border: '1px solid black', width: '50px', height: '50px', textAlign: 'center' }}>{item.id}</div>)}
        </div>
    );
};

export default R_ViewComponent;