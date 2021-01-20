import React from 'react';
import './index.css';

export const Button = ({ children, type = 'submit'}) => (
    <button className="button-primary" type={type}>{children}</button>
);