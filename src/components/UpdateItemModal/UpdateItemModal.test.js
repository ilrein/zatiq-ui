import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import UpdateItemModal from './UpdateItemModal';

const wrapper = shallow(
  <UpdateItemModal
    onSubmit={() => {}}
    onClose={() => {}}
    open
    loading={false}
  />,
);

describe('UpdateItemModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
