import React, { useState } from 'react';
type Props = {
    items: {
        id: number,
        category: string,
        itemName: string,
        groupName: string,
        descript: string,
        unit: string,
        im_price: number;
        ex_price: number;
        use: boolean,
        supplyer: string,
        // Images: { url: string }[]
    }[];
    selectItem: (id: number) => void;
    dragItem: (id: number) => void;
    onDrop: () => void;
    itemImageList: { ItemId: number, url: string, GoodName: string }[];
}
type subProps = {
    url: string;

}
const ImageList: React.FC<subProps> = ({ url }) => {
    return <img src={url} alt={url} width='100px' />
}
const CardComponent: React.FC<Props> = ({ items, selectItem, itemImageList, dragItem, onDrop }) => {
    const [selected, setSelected] = useState<number | ''>()
    const [image, setImage] = useState<string[]>([])
    const [shows, setShows] = useState<number[]>([])
    const onDragStart = (index: number) => {

        dragItem(index);

    }


    const onItemHover = (itemId: number | string) => {

        if (typeof itemId === 'number') {
            setImage(itemImageList.filter(image => image.ItemId === itemId).map(image => image.url))
        } else if (typeof itemId === 'string') {
            setImage(itemImageList.filter(image => image.GoodName === itemId).map(image => image.url))

        }
    }
    const showBack = (id: number) => {
        if (!shows.includes(id)) {
            setShows([id, ...shows])
        }


    }
    const removeBack=(id:number)=>{
       setShows(shows.filter(show=>show!==id))
    }
    return (

        <div className="item-list">
            {items.map((item, index) =>
                <div
                    key={index}
                    className={`infos ${selected === item.id ? 'selected' : ''} ${shows.includes(item.id) ? 'back' : ""}`}
                    draggable
                    onDragStart={() => { onDragStart(item.id) }}
                    onDragEnd={onDrop}
                    onMouseEnter={() => {
                        if (item.groupName) {
                            onItemHover(item.groupName)
                        } else {
                            onItemHover(item.id)
                        }
                    }
                    }
                    onMouseLeave={() => setImage([])}
                >
                    <div className={`info text ${item.category} `}>



                        <div className="edit">
                            <span className="material-symbols-outlined edit" onClick={() => { selectItem(item.id); setSelected(item.id) }}>
                                Edit
                            </span>
                        </div>
                        <div className="redo">
                            <span className="material-symbols-outlined redo" onClick={() => { showBack(item.id) }}>
                                Redo
                            </span>
                        </div>


                        <div>{item.category}</div>
                        <div>{item.itemName}</div>
                        <div>{item.unit === '\\' ? '￦' : item.unit}{item.im_price}</div>
                        <div>{item.unit === '\\' ? '￦' : item.unit}{item.ex_price}</div>

                    </div>
                    <div className={`info image  ${item.category} `}>
                        <div className="undo">
                            <span className="material-symbols-outlined undo" onClick={() => { removeBack(item.id) }}>
                                Undo
                            </span>
                        </div>
                        {
                            image && <ImageList url={image[0]} />}
                    </div>
                </div>)}
        </div>
    );
};

export default CardComponent;