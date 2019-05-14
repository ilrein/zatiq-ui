import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import NewTagModal from './NewTagModal';

const wrapper = shallow(
  <NewTagModal />,
);

describe('NewTagModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
