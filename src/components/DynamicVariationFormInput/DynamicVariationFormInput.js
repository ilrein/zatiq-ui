import React from 'react';
import {
  Form,
} from 'semantic-ui-react';

const DynamicVariationFormInput = () => (
  <Form.Group widths="equal">
    <Form.Input
      label="Variation"
      placeholder="Small"
    />
    <Form.Input
      label="Price"
      placeholder="10.99"
    />
  </Form.Group>
);

export default DynamicVariationFormInput;
