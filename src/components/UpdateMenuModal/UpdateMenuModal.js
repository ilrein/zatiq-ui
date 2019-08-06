/* eslint-disable react/no-array-index-key */
// Core
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// ramda
import contains from 'ramda/src/contains';

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const UpdateMenuModal = ({
  open,
  onSubmit,
  loading,
  onClose,
  dishes,
  menu,
}) => {
  const mapFullDishList = values => values.docs.map(doc => ({
    key: doc._id,
    value: doc,
    text: doc.name,
  }));

  // base states
  const [options, setOptions] = useState([]);
  const [name, setName] = useState('');
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setOptions(mapFullDishList(dishes));
    setName(menu.name);
    setStartTime(menu.startTime);
    setEndTime(menu.endTime);

    const preSelected = [];
    mapFullDishList(dishes).map((DISH) => { // eslint-disable-line
      if (contains(DISH.value, menu.dishes)) {
        preSelected.push(DISH.value);
      }
    });
    setSelectedDishes(preSelected);
  }, [menu]);

  // const reduced = dishes.docs.filter(DISH => !contains(DISH, menu.dishes));

  // console.log(selectedDishes, options);

  return (
    <Modal
      open={open}
      size="small"
      className="fade-in"
    >
      <SpreadHeader>
        <>Update Menu</>

        <Icon
          name="close"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
      </SpreadHeader>
      <Modal.Content>
        <Form>
          <Form.Input
            label="Name"
            placeholder="Lunch"
            onChange={(event, { value }) => setName(value)}
            value={name}
            required
          />

          <Form.Dropdown
            fluid
            required
            selection
            search
            multiple
            label={`Dishes (${dishes.totalDocs})`}
            options={options}
            onChange={(event, { value }) => setSelectedDishes(value)}
            value={selectedDishes}
          />

          <Form.Group widths="equal">
            <Form.Input
              onChange={(event, { value }) => setStartTime(value)}
              label="Start Time"
              fluid
              required
              type="time"
              value={startTime}
            />

            <Form.Input
              onChange={(event, { value }) => setEndTime(value)}
              label="End Time"
              fluid
              required
              type="time"
              value={endTime}
            />
          </Form.Group>

          <Button
            primary
            type="submit"
            onClick={async (e) => {
              e.preventDefault();

              const newMenuParams = {
                name,
                dishes: selectedDishes,
                startTime,
                endTime,
              };
              
              await onSubmit(newMenuParams);
            }}
            style={{ marginTop: '1rem' }}
            loading={loading}
            disabled={
              // if name is empty
              name === ''

              // if no dishes are found
              || selectedDishes.length === 0

              // if the times aren't set
              || startTime === ''
              || endTime === ''
            }
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

UpdateMenuModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dishes: PropTypes.shape(),
  menu: PropTypes.shape().isRequired,
};

UpdateMenuModal.defaultProps = {
  dishes: {
    docs: [],
    totalDocs: 0,
  },
};

export default UpdateMenuModal;
