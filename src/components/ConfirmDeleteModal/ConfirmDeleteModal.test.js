import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line

import ConfirmDeleteModal from './ConfirmDeleteModal';

const wrapper = shallow(
  <ConfirmDeleteModal
    onSubmit={() => {}}
    onClose={() => {}}
    open
    loading={false}
  />,
);

describe('ConfirmDeleteModal', () => {
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
