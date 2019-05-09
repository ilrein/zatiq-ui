import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import NewUserWelcome from './NewUserWelcome';

describe('NewUserWelcome', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NewUserWelcome />);
  
    expect(wrapper).toBeTruthy();
  });
});
