import React from 'react';
type Props = {
    list: { orderNum: string, menu: string, price: number, date: string }[] | undefined;
    exportFile: (list: { orderNum: string, menu: string, price: number, date: string }[]) => void;
}
const HomeComponent: React.FC<Props> = ({ list, exportFile }) => {
    return (
        <>
            <div style={{ marginTop: '10rem' }}>
                {list?.map(item => <div key={item.orderNum}>{item.orderNum}{item.menu}{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{item.date}</div>)}
            </div>
            <button type='button' onClick={() => {
                if (list) exportFile(list)
            }}>출력</button>
        </>
    );
};
export default HomeComponent;