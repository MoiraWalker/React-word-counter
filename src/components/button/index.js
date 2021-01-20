import React from 'react';
import './index.css';

export const Button = ({ children, className, onClick, type = 'submit'}) => (
    <button className={className} type={type} onClick={onClick}>{children}</button>
);
