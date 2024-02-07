import React, { useState } from 'react';
import ExportComponent from './ExportComponent';
const ExportContainer = () => {
    const [model, setModel] = useState<string>('model')
    return (
        <ExportComponent model={model} setModel={setModel} />
    );
};

export default ExportContainer;