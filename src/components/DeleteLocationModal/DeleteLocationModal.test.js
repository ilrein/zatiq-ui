import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import DeleteLocationModal from './DeleteLocationModal';

const wrapper = shallow(
  <DeleteLocationModal
    onSubmit={() => {}}
    onClose={() => {}}
    open
    loading={false}
  />,
);

describe('DeleteLocationModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
