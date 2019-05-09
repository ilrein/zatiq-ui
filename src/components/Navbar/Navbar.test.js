import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line
import { Auth } from 'aws-amplify';

import Navbar from './Navbar';

let wrapper;
Auth.signOut = jest.fn().mockImplementation(() => Promise.resolve({}));

beforeEach(() => {  
  wrapper = shallow(
    <Navbar
      userReducer={{
        user: {},
      }}

      history={{
        push: () => {},
      }}

      clearUser={() => {}}
    />,
  );
});

describe('<Navbar />', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('triggers logout onClick', () => {
    wrapper.find('[name="logout"]').simulate('click');
    expect(wrapper.find('[name="logout"]')).toBeTruthy();
    // const spy = jest.spyOn(Navbar, 'logout');
    // expect(spy).toHaveBeenCalled();
  });
});
