import React from 'react';
import PalletComponent from './PalletComponent';
type Props = {

    selectedMonth: string
}
const PalletContainer: React.FC<Props> = ({ selectedMonth }) => {
    return (
        <div>
            <PalletComponent />
        </div>
    );
};

export default PalletContainer;