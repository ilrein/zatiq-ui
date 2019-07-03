import React from 'react';
import {
  Form,
} from 'semantic-ui-react';

const DynamicSizeFormInput = () => (
  <Form.Group widths="equal">
    <Form.Input
      label="Size"
      placeholder="Small"
    />
    <Form.Input
      label="Price"
      placeholder="10.99"
    />
  </Form.Group>
);

export default DynamicSizeFormInput;
