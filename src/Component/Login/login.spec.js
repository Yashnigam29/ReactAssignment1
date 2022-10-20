import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from'./login';

test('renders form properly', () =>{
    render(<BrowserRouter><Login /></BrowserRouter>);

    const heading =screen.getByRole('heading', { name: /You have Signed Up successfully./i });
    const heading2 =screen.getByRole('heading', { name: /Welcome to Login Page/i });

   expect(heading).toBeInTheDocument();
   expect(heading2).toBeInTheDocument();

  
})

