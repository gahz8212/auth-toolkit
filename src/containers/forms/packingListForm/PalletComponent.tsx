import { autoBatchEnhancer } from '@reduxjs/toolkit';
import React from 'react';

const PalletComponent = () => {
    return (
        <div>
            <div style={{
                width: '120px',
                height: '600px',
                background: 'yellowgreen',
                padding: '1rem',
                overflowY: 'auto'

            }}>

                <div style={{
                    width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center'
                }}>1</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>2</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>3</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>4</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>5</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>6</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>7</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>8</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>9</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>10</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>11</div>
                <div style={{ width: '80px', height: '50px', border: '3px dotted green', margin: '1rem auto', background: 'white', textAlign: 'center' }}>12</div>
            </div>
        </div >
    );
};

export default PalletComponent;