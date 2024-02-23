import React, { useState, useRef } from 'react';
import { OrderAction, OrderData } from '../../store/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
const RsettingComponent = () => {
    const dispatch = useDispatch();
    const { orderData } = useSelector(OrderData)
    const dragItem: any = useRef();
    const dragOverItem: any = useRef();
    let sourceKey: string = ''
    let targetKey: string = ''
    let row;
    if (orderData) {

        const keys = Object.keys(orderData[0]).slice(1, 4)
        console.log(keys)
        const dragStart = (index: any, column: number) => {
            dragItem.current = index
            sourceKey = keys[column]

        }
        const dragEnter = (index: any, column: number) => {
            dragOverItem.current = index
            targetKey = keys[column]
        }
        const drop = () => {
            const copyList: { [key: string]: string | number }[] = Array.from(orderData)
            console.log(copyList === orderData)

            let targetValue = copyList[dragOverItem.current][targetKey]
            console.log(targetValue)
            // copyList[dragOverItem.current][targetKey] = copyList[dragItem.current][sourceKey]
           

            // dragItem.current = null;
            // dragOverItem.current = null;
            // setList(copyList)
        }
        row = orderData?.map((el, index, row) => <div
            style={{ display: 'flex' }}>
            <div style={{ width: '100px', textAlign: 'center' }}>{el.id}</div>
            <div style={{ width: '100px', textAlign: 'center' }}>{el.model}</div>

            <div style={{ width: '50px', textAlign: 'center' }}
                draggable
                onDragStart={() => dragStart(index, 0)}
                onDragEnter={() => dragEnter(index, 0)}
                onDragEnd={drop}>{el.Feb}</div>

            <div style={{ width: '50px', textAlign: 'center' }}
                draggable
                onDragStart={() => dragStart(index, 1)}
                onDragEnter={() => dragEnter(index, 1)}
                onDragEnd={drop}>{el.Mar}</div>
            <div style={{ width: '50px', textAlign: 'center' }}
                draggable
                onDragStart={() => dragStart(index, 2)}
                onDragEnter={() => dragEnter(index, 2)}
                onDragEnd={drop}>{el.April}</div>
        </div>)
    }
    return (
        <div className='table-wrapper'>
            <div style={{ width: '350px' }}>
                <div>
                    <div style={{ display: 'flex' }} >
                        <div style={{ width: '100px', textAlign: 'center' }}>id</div>
                        <div style={{ width: '100px', textAlign: 'center' }}>model</div>
                        <div style={{ width: '50px', textAlign: 'center' }}>feb</div>
                        <div style={{ width: '50px', textAlign: 'center' }}>march</div>
                        <div style={{ width: '50px', textAlign: 'center' }}>april</div>
                    </div>
                </div>
                <div>
                    {React.Children.toArray(row)}
                </div>

            </div>
        </div >
    );
};

export default RsettingComponent;