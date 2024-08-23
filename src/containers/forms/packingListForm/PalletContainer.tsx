import React from 'react';
import PalletComponent from './PalletComponent';
import { useSelector, useDispatch } from 'react-redux'
import { OrderData, OrderAction } from '../../../store/slices/orderSlice';
type Props = {
    selectedMonth: string
}
const PalletContainer: React.FC<Props> = ({ selectedMonth }) => {
    const { palletData } = useSelector(OrderData)
    const dispatch = useDispatch();
    const settingPallet = (Pnumber: number, itemData: { item: string, CT_qty: number, quantity: number, weight: number, moq: number, cbm: number, sets: string, mode: string }) => {
        dispatch(OrderAction.settingPallet({ pNo: Pnumber, itemData }))
    }
    const addCount = (id: number, item: string) => {
        dispatch(OrderAction.addCount({ id, item }))
    }
    const removeCount = (id: number, item: string) => {
        dispatch(OrderAction.removeCount({ id, item }))

    }
    return (
        <div>
            <PalletComponent palletData={palletData} settingPallet={settingPallet}
                addCount={addCount} removeCount={removeCount} />
        </div>
    );
};

export default PalletContainer;