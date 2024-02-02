import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const NavComponent: React.FC<Props> = ({ visible, setVisible }) => {

    return (
        <>
            <ul className={`nav ${visible ? 'visible' : ''}`}>
                <li><Link to='#'>Home</Link></li>
                <li><Link to='#'>Relation Settings</Link></li>
                <li><Link to='#'>Relation View</Link></li>
                <li><Link to='' onClick={() => { setVisible(!visible) }}>Search</Link></li>
            </ul>

        </>

    );
};

export default NavComponent;