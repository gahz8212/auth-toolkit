import React, { useState } from 'react';

const HomeComponent = () => {
    const [list, setList] = useState<{ name: string, amount: number }[]>([])
    return (<div>
        <div
            style={{
                margin: '10rem auto', width: '70px', height: '80px', fontSize: '100px',
            }}
            draggable
            onDragStart={e => {

                const img = new Image();
                img.src = './images/knight.png'
                e.dataTransfer.setDragImage(img, 100, 100)
                e.dataTransfer.setData('item', JSON.stringify({ name: 'horse', amount: 1 }))
            }}
            onDragEnd={e => { console.log('dragEnd') }}
        // onDragStart={e => { } }
        // onDragStart={ e => { }}
        // onDragStart={e => { } }
        >🦓</div>
        <div
            style={{ width: '300px', height: '300px', border: '3px dotted black', margin: '0 auto' }}
            draggable

            onDragEnter={e => { }}
            onDragOver={(e) => {
                e.preventDefault()
                e.currentTarget.style.background = "pink"
            }}
            onDrop={e => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move'
                e.currentTarget.style.background = ''
                const name = JSON.parse(e.dataTransfer.getData('item'));
                const item = name.name
                const amount = name.amount;
                let names = list.map(lis => lis.name)

                if (!names.includes(item)) {

                    setList([...list, { name: item, amount }])
                }
                // alert(JSON.parse(name).name)

            }}
            onDragLeave={e => { e.currentTarget.style.background = '' }}>
            {list.map(li => <div>{li.name}{li.amount}</div>)}

        </div>
    </div>)
};

export default HomeComponent;