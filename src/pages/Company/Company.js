import React, { useState } from 'react';
import {
  Form,
  Button,
} from 'semantic-ui-react';

const Company = () => {
  const [name, setName] = useState('');

  const onSubmit = () => {
    console.log('submit');
  };

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
      <Button
        type="submit"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Form>
  );
};

export default Company;
