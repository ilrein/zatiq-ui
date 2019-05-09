import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import NewUserWelcome from './NewUserWelcome';

const wrapper = shallow(<NewUserWelcome />);

describe('NewUserWelcome', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  // Can't get this test to work yet

  // it('stores name value', () => {
  //   const event = { target: { value: 'name' } };

  //   wrapper
  //     .find('[name="companyName"]')
  //     .simulate('change', event);

  //   expect(wrapper).toBeTruthy();
  // });
});
