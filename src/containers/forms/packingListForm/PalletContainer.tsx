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
    const settingPallet = (Pnumber: number, itemData: { item: string, amount: number }) => {
        dispatch(OrderAction.settingPallet({ pNo: Pnumber, itemData }))
    }
    return (
        <div>
            <PalletComponent palletData={palletData} settingPallet={settingPallet} />
        </div>
    );
};

export default PalletContainer;