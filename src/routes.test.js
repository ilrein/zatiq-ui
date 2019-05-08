import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import App from './routes';

it('renders without crashing', () => {
  shallow(<App />);
});
