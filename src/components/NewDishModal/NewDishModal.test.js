import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import NewDishModal from './NewDishModal';

const wrapper = shallow(
  <NewDishModal />,
);

describe('NewDishModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
