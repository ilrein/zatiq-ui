import React, { useState } from 'react';
import {
  Form,
  Button,
} from 'semantic-ui-react';
import repeat from 'ramda/src/repeat';

import PlacesAutoComplete from '../PlacesAutoComplete';

const CompanyForm = ({
  name,
  setName,

  onSubmit,
}) => {
  const [totalLocations, setTotalLocations] = useState(1);

  return (
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

        <Button.Group style={{ marginBottom: '1rem' }}>
          <Button
            icon="minus"
            disabled={totalLocations === 1}
            onClick={() => setTotalLocations(totalLocations - 1)}
          />
          <Button disabled>
            {totalLocations}
          </Button>
          <Button
            icon="plus"
            disabled={totalLocations === 10}
            onClick={() => setTotalLocations(totalLocations + 1)}
          />
        </Button.Group>

        {
          repeat(
            <div style={{ marginBottom: '1rem' }}>
              <PlacesAutoComplete
                onPlaceSelected={place => console.log(place)}
                placeholder="123 Bay St."
              />
            </div>,
            totalLocations,
          )
        }
      </Form.Field>
      <Button
        type="submit"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Form>
  )
};

export default CompanyForm;
