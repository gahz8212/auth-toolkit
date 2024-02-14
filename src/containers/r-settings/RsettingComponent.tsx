import React, { useState, useRef } from 'react';

const RsettingComponent = () => {
    const dragItem: any = useRef();
    const dragOverItem: any = useRef();
    let sourceKey: string = ''
    let targetKey: string = ''
    const [list, setList] = useState<{ [key: string]: number | string }[]>([
        { id: 1, model: 'kim', feb: 50, march: 100, april: 30 },
        { id: 2, model: 'choi', feb: 43, march: 90, april: 20 },
        { id: 3, model: 'lee', feb: 33, march: 80, april: 50 },
        { id: 4, model: 'park', feb: 13, march: 70, april: 70 },
        { id: 5, model: 'lim', feb: 23, march: 60, april: 30 },
    ])
    const keys = Object.keys(list[0])
    const dragStart = (index: any, column: number) => {
        dragItem.current = index
        sourceKey = keys[column]
    }
    const dragEnter = (index: any, column: number) => {
        dragOverItem.current = index
        targetKey = keys[column]
    }
    const drop = () => {
        const copyList: { [key: string]: string | number }[] = [...list];

        let targetValue;
        const result = window.confirm("값을 교환합니까?");
        if (result) {
            targetValue = copyList[dragOverItem.current][targetKey]
        } else {
            targetValue = 0
        }
        copyList[dragOverItem.current][targetKey] = copyList[dragItem.current][sourceKey]
        copyList[dragItem.current][sourceKey] = targetValue

        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyList)
    }
    const row = list.map((el, index, row) => <tr
    >
        <td>{el.id}</td>
        <td>{el.model}</td>

        <td draggable
            onDragStart={() => dragStart(index, 2)}
            onDragEnter={() => dragEnter(index, 2)}
            onDragEnd={drop}>{el.feb}</td>

        <td draggable
            onDragStart={() => dragStart(index, 3)}
            onDragEnter={() => dragEnter(index, 3)}
            onDragEnd={drop}>{el.march}</td>
        <td draggable
            onDragStart={() => dragStart(index, 4)}
            onDragEnter={() => dragEnter(index, 4)}
            onDragEnd={drop}>{el.april}</td>
    </tr>)
    return (
        <div className='table-wrapper'>
            <table >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>model</th>
                        <th>feb</th>
                        <th>march</th>
                        <th>april</th>
                    </tr>
                </thead>
                <tbody>
                    {React.Children.toArray(row)}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
};

export default RsettingComponent;