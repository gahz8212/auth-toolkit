import React from 'react';
type Props = {
    children: React.ReactNode;
}
const LeftComponent: React.FC<Props> = ({ children }) => {
    return (
        <div className='left'>
            <div className="item">
                {children}
            </div>
        </div>
    );
};

export default LeftComponent;