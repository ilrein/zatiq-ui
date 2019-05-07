import React from 'react';
import {
  Form,
  Button,
} from 'semantic-ui-react';

import PlacesAutoComplete from '../PlacesAutoComplete';

const CompanyForm = ({
  name,
  setName,

  onSubmit,
}) => (
  <Form>
    <Form.Field>
      <label>
        Name
      </label>
      <input
        placeholder="Company name"
        value={name}
        onChange={(event, { value }) => setName(value)}
      />
    </Form.Field>
    <Form.Field>
      <label>
        Location(s)
      </label>
      <PlacesAutoComplete
        onPlaceSelected={place => console.log(place)}
        placeholder="123 Bay St."
      />
    </Form.Field>
    <Button
      type="submit"
      onClick={onSubmit}
    >
      Submit
    </Button>
  </Form>
);

export default CompanyForm;
