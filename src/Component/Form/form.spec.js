import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Form ,{ validateAllFeilds } from'./form';
import user from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../../Store/store';

beforeEach(()=>{
    render(<Provider store={store}><BrowserRouter><Form /></BrowserRouter></Provider>);
})

test('renders form properly', () =>{
    const heading =screen.getByRole('heading', { name: /Sign Up/i });
    const signupwithGoogle= screen.getByText(/Sign Up with Google/i);
    const signupwithfb= screen.getByText(/Sign Up with Facebook/i);
   const nameLabel= screen.getByText(/Name:/i);
   const emailLabel= screen.getByText(/Email:/i);
   const passwordLabel= screen.getByText(/Password:/i);
   const checkboxContent= screen.getByText(/I've read and agree with terms of Service and our privacy Policy/i);

   expect(heading).toBeInTheDocument();
   expect(signupwithGoogle).toBeInTheDocument();
   expect(signupwithfb).toBeInTheDocument();
   expect(nameLabel).toBeInTheDocument();
   expect(emailLabel).toBeInTheDocument();
   expect(passwordLabel).toBeInTheDocument();
   expect(checkboxContent).toBeInTheDocument();
})

test('renders form with 1 button', async() =>{
    const buttonlist=await screen.findAllByRole("button");
    expect(buttonlist).toHaveLength(1);
})

test("email input feild should accept email",() =>{
    const email=screen.getByTestId("email-input");
    user.type(email , "yash");
    expect(email.value).not.toMatch("yash@gmail.com");
})

test("passwPasswordord input feild should have type password",() =>{
    const password= screen.getByTestId("password-input");
    expect(password).toHaveAttribute("type", "password");
})

test("should be able to submit the form",() =>{
    const submitbtn=screen.getByTestId("submit")
    const Name=screen.getByTestId("name-input");
    const Email=screen.getByTestId("email-input");
    const Password=screen.getByTestId("password-input");
    user.type(Name, "yash");
    user.type(Email, "yash@gmail.com");
    user.type(Password, "12345");

    user.click(submitbtn);
    expect(Name.value).toMatch("");
    expect(Email.value).toMatch("");
    expect(Password.value).toMatch("");

})