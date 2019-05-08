import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import Company from '.';

it('renders without crashing', () => {
  shallow(<Company />);
});
