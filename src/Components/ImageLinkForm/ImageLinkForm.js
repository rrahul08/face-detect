import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm= ({onInputChange, onButtonSubmit}) => {
    
    

    return (
        <div >
            
            <h1 className='head'>Face Detect+</h1>
            <div className='pack'>
            <p style={{ fontSize:'75px'}} className='f3 para '>
                Wanna detect faces .
            </p>
            <p style={{ fontSize:'75px'}} className='f3 paragraph'>
                Give a try
            </p>
       
            <div className='center'>
                <div className='container center'>
                    
                
                    <input className='input-field' type='tex' placeholder='paste your link here ...' onChange={onInputChange}/>
                    <button className='detect-button dim grow' 
                    onClick={onButtonSubmit}
                    >Detect</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;