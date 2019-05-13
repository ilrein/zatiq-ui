import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import NewItem from './NewItem';

const wrapper = shallow(
  <NewItem />,
);

describe('NewItem', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
