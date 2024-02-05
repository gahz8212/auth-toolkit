import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    page: string;
    changePage: (page: string) => void;
}
const NavComponent: React.FC<Props> = ({ visible, setVisible, page, changePage }) => {
    console.log(page)
    return (


        <ul className={`nav ${visible ? 'visible' : ''}`}>

            <li className={`${page === 'Home' ? "selected" : ''}`} onClick={() => changePage('Home')}><Link to='#'>Home</Link></li>
            <li className={`${page === 'Settings' ? "selected" : ''}`} onClick={() => changePage('Settings')}><Link to='#'>Relation Settings</Link></li>
            <li className={`${page === 'View' ? "selected" : ''}`} onClick={() => changePage('View')}><Link to='#'>Relation View</Link></li>
            <li className={`${page === 'Search' ? "selected" : ''}`} onClick={() => changePage('Search')}><Link to='' onClick={() => { setVisible(!visible) }}>Search</Link></li>
        </ul>


    );
};

export default NavComponent;