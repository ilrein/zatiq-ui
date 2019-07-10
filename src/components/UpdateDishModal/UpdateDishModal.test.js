import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import UpdateDishModal from './UpdateDishModal';

const wrapper = shallow(
  <UpdateDishModal
    onSubmit={() => {}}
    onClose={() => {}}
    open
    loading={false}
  />,
);

describe('UpdateDishModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
