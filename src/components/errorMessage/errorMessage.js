import React from 'react';
import './errorMessage.scss';

export const ErrorMessage = ({ children }) => (
    <p className="error-message">
        {children}
    </p>
)
