import React from 'react';
import './Navigation.css';

const Navigation= ({onRouteChange, isSignedIn}) => {
   
        if(isSignedIn){
            return(
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p onClick={()=>onRouteChange('Signout')} className='link dim pointer signout'>Sign Out</p>
        </nav>
        );
        } else{
         return(
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>onRouteChange('Signin')} className='link dim pointer signin' >Sign In</p>
                <p onClick={()=>onRouteChange('register')} className='link dim pointer register1'>Register</p>

            </nav>
           
         );

        }
        
    
}

export default Navigation;