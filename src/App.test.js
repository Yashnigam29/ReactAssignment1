import { render } from '@testing-library/react';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import Form from './Component/Form/form';
import Login from './Component/Login/login';
import { Provider } from 'react-redux';
import { store } from './Store/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
    <Router>
     <Form />
     <Login />
    </Router>
    </Provider>,
  );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
