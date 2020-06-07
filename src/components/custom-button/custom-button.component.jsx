import React from 'react';
import './custom-button.style.scss';

const CustomButton=({children, isGoogleSignIn, inverted, ...otherProps})=>(
    <button className={`${isGoogleSignIn?'google-signIn':''} ${inverted?'inverted':''} custom-button`} {...otherProps}>

        {children}

    </button>

)

export default CustomButton;