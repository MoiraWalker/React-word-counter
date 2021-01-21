import React from 'react';
import './button.scss';

export const Button = ({ children, className, onClick, type = 'submit'}) => (
    <button className={className} type={type} onClick={onClick}>{children}</button>
);
