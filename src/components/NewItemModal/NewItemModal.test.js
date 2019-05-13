import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import NewItemModal from './NewItemModal';

const wrapper = shallow(
  <NewItemModal />,
);

describe('NewItemModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
