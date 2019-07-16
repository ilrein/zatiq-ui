/* eslint-disable react/no-array-index-key */
// Core
import React, { useState } from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
  Form,
  Image,
  Segment,
  Checkbox,
  // Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Ramda utils for calculating variations
import dropLast from 'ramda/src/dropLast';
import update from 'ramda/src/update';

// Components
import Dropzone from '../Dropzone';

// options
import { options } from '../../data/dietaryCategory.json';

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const NewDishModal = ({
  onSubmit,
  open,
  loading,
  onClose,
  // serversideErrors,
}) => {
  // base states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [dietaryCategories, setDietaryCategories] = useState([]);
  const [image, setImage] = useState('');

  // dynamic variances in dish
  // things like quantity or size
  const [hasVariations, setHasVariations] = useState(false);
  const [variationData, setVariationData] = useState([{}]);
  // const [dynamicSizeModalIsOpen, setDynamicSizeModalIsOpen] = useState(false);
  // const [sizes, setSizes] = useState([]);

  const calculateTotalVariations = (modification) => {
    switch (modification) {
      case 'increment':
        setVariationData([
          ...variationData,
          {
            [variationData.length]: {
              name: '',
              price: '',
            },
          },
        ]);
        break;
      case 'decrement':
        if (variationData.length !== 1) {
          setVariationData(dropLast(1, variationData));
        }
        break;
      default:
        break;
    }
  };

  const resetState = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setDietaryCategories([]);
    setHasVariations(false);
    setVariationData([{}]);
  };

  return (
    <Modal
      open={open}
      size="small"
    >
      <SpreadHeader>
        <>New Dish</>

        <Icon
          name="close"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
      </SpreadHeader>
      <Modal.Content>
        {/* {
          Message ?
        } */}
        <Form>
          <Form.Input
            label="Name"
            placeholder="Cheeseburger"
            onChange={(event, { value }) => setName(value)}
            value={name}
            required
          />

          <Form.TextArea
            label="Description"
            placeholder="Sweet and sour..."
            onChange={(event, { value }) => setDescription(value)}
            value={description}
          />

          <Segment color="orange">
            {
              hasVariations
                ? (
                  <>
                    {
                      variationData.map((currentValue, index) => (
                        <Form.Group
                          widths="equal"
                          key={index}
                        >
                          <Form.Input
                            label="Variation"
                            placeholder="Small"
                            onChange={(event, { value }) => {
                              const updated = update(index, {
                                name: value,
                                price: variationData[index].value,
                              });
                              setVariationData(updated);
                            }}
                            value={variationData[index].name}
                          />
                          <Form.Input
                            label="Price"
                            placeholder="10.99"
                            type="number"
                            min="0.00"
                            max="100.00"
                            step="0.01"
                            onChange={(event, { value }) => {
                              const updated = update(index, {
                                name: variationData[index].name,
                                price: value,
                              });
                              setVariationData(updated);
                            }}
                          />
                        </Form.Group>
                      ))
                    }

                    <Button.Group style={{ marginBottom: '1rem' }}>
                      <Button
                        type="button"
                        onClick={() => calculateTotalVariations('decrement')}
                        disabled={variationData.length === 1}
                      >
                        <Icon name="minus" />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => calculateTotalVariations('increment')}
                      >
                        <Icon name="plus" />
                      </Button>
                    </Button.Group>
                    <br />
                  </>
                )
                : (
                  <Form.Input
                    label="Base Price"
                    placeholder="12.99"
                    onChange={(event, { value }) => setPrice(value)}
                    value={price}
                    required
                    type="number"
                    min="0.00"
                    max="100.00"
                    step="0.01"
                  />
                )
            }
            <Checkbox
              toggle
              label="Has Price Variations (such as size or quantity)"
              onChange={() => setHasVariations(!hasVariations)}
              checked={hasVariations}
            />
          </Segment>

          <div className="field">
            <label>
              Image (Optional)
            </label>
            {
              image
                ? (
                  <>
                    <Image src={image.preview} />

                    <Button
                      icon="remove"
                      onClick={() => setImage(null)}
                    />
                  </>
                )
                : (
                  <Dropzone
                    handleDrop={picture => setImage(picture)}
                    defaultDropMessage="Optional dish image. Click or drag to upload."
                  />
                )
            }
          </div>

          <Form.Dropdown
            label="Dietary Category"
            onChange={(event, { value }) => setDietaryCategories(value)}
            fluid
            options={options}
            selection
            search
            placeholder="Dairy Free"
            multiple
          />

          <Button
            primary
            type="submit"
            onClick={() => {
              onSubmit(
                name,
                description,
                price,
                variationData,
                image,
                dietaryCategories,
              );
              resetState();
            }}
            style={{ marginTop: '1rem' }}
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

NewDishModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewDishModal;
