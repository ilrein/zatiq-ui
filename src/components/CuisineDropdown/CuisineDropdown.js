import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { options } from './options.json';

const CuisineDropdown = ({ ...restProps }) => (
  <Dropdown
    fluid
    options={options}
    selection
    placeholder="Italian"
    {...restProps}
  />
);

export default CuisineDropdown;
