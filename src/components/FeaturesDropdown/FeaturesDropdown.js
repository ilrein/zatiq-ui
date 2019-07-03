import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { options } from './options.json';

const FeaturesDropdown = ({ ...restProps }) => (
  <Dropdown
    fluid
    options={options}
    selection
    search
    multiple
    {...restProps}
  />
);

export default FeaturesDropdown;
