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
import isEmpty from 'ramda/src/isEmpty';
import isNil from 'ramda/src/isNil';

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
  const [variationData, setVariationData] = useState([]);

  // does it have dynamic toppings (free)
  const [hasAdditionalFreeAddons, setHasAdditionalFreeToppings] = useState(false);
  const [additionalFreeAddons, setAdditionalFreeAddons] = useState(null);

  // does it have dynamic toppings (paid)
  const [hasAdditionalPaidAddons, setHasAdditionalPaidToppings] = useState(false);
  const [additionalPaidAddons, setAdditionalPaidAddons] = useState([]);

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

  const calculateFreeAddons = (modification) => {
    switch (modification) {
      case 'increment':
        setAdditionalFreeAddons([
          ...additionalFreeAddons,
          '',
        ]);
        break;
      case 'decrement':
        if (additionalFreeAddons.length !== 1) {
          setAdditionalFreeAddons(dropLast(1, additionalFreeAddons));
        }
        break;
      default:
        break;
    }
  };

  const calculatePaidAddons = (modification) => {
    switch (modification) {
      case 'increment':
        setAdditionalPaidAddons([
          ...additionalPaidAddons,
          {
            [additionalPaidAddons.length]: {
              name: '',
              price: '',
            },
          },
        ]);
        break;
      case 'decrement':
        if (additionalPaidAddons.length !== 1) {
          setAdditionalPaidAddons(dropLast(1, additionalPaidAddons));
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

  console.log(additionalPaidAddons);

  return (
    <Modal
      open={open}
      size="small"
      className="fade-in"
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

          <Form.TextArea
            label="Description (Optional)"
            placeholder="Sweet and sour..."
            onChange={(event, { value }) => setDescription(value)}
            value={description}
          />

          <Form.Dropdown
            label="Dietary Category (Optional)"
            onChange={(event, { value }) => setDietaryCategories(value)}
            fluid
            options={options}
            selection
            search
            placeholder="Dairy Free"
            multiple
          />

          <Segment color="black">
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
                                price: !isNil(variationData[index].price) ? variationData[index].price : '',
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
                                name: !isNil(variationData[index].name) ? variationData[index].name : '',
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
              onChange={(event, { checked }) => {
                setHasVariations(!hasVariations);
                if (checked) {
                  setVariationData([{}]);
                  return;
                }
                setVariationData([]);
              }}
              checked={hasVariations}
            />
          </Segment>

          <Segment color="black">
            <Checkbox
              toggle
              label="Has optional free add-ons (such as toppings)"
              onChange={(event, { checked }) => {
                setHasAdditionalFreeToppings(!hasAdditionalFreeAddons);
                if (checked) {
                  setAdditionalFreeAddons(['']);
                  return;
                }
                setAdditionalFreeAddons(null);
              }}
              checked={hasAdditionalFreeAddons}
            />

            {
              !isNil(additionalFreeAddons)
                ? (
                  <div style={{ marginTop: '1rem' }}>
                    {
                      additionalFreeAddons.map((ADDON, index) => (
                        <Form.Input
                          key={index}
                          label={`Add on #${index + 1}`}
                          placeholder="Salt & Pepper"
                          required
                          onChange={(event, { value }) => {
                            const updated = update(index, value);
                            setAdditionalFreeAddons(updated);
                          }}
                        />
                      ))
                    }

                    <Button.Group style={{ marginBottom: '1rem' }}>
                      <Button
                        type="button"
                        onClick={() => calculateFreeAddons('decrement')}
                        disabled={additionalFreeAddons.length === 1}
                      >
                        <Icon name="minus" />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => calculateFreeAddons('increment')}
                      >
                        <Icon name="plus" />
                      </Button>
                    </Button.Group>
                  </div>
                )
                : null
            }
          </Segment>

          <Segment color="black">
            <Checkbox
              toggle
              label="Has optional paid add-ons"
              onChange={(event, { checked }) => {
                setHasAdditionalPaidToppings(!hasAdditionalPaidAddons);
                if (checked) {
                  setAdditionalPaidAddons([{}]);
                  return;
                }
                setAdditionalPaidAddons([]);
              }}
              checked={hasAdditionalPaidAddons}
            />
          
            {
              hasAdditionalPaidAddons
                ? (
                  additionalPaidAddons.map((currentValue, index) => (
                    <>
                      <Form.Group
                        style={{ marginTop: '1rem' }}
                        widths="equal"
                        key={index}
                      >
                        <Form.Input
                          label={`Paid Addon ${index + 1}`}
                          placeholder="Mozzarella Cheese"
                          onChange={(event, { value }) => {
                            const updated = update(index, {
                              name: value,
                              price: !isNil(additionalPaidAddons[index].price) ? additionalPaidAddons[index].price : '',
                            });
                            setAdditionalPaidAddons(updated);
                          }}
                          value={additionalPaidAddons[index].name}
                        />
                        <Form.Input
                          label="Price"
                          placeholder="1.99"
                          type="number"
                          min="0.00"
                          max="100.00"
                          step="0.01"
                          onChange={(event, { value }) => {
                            const updated = update(index, {
                              name: !isNil(additionalPaidAddons[index].name) ? additionalPaidAddons[index].name : '',
                              price: value,
                            });
                            setAdditionalPaidAddons(updated);
                          }}
                          value={additionalPaidAddons[index].price}
                        />
                      </Form.Group>
                    </>
                  ))
                )
                : null
            }

            {
              hasAdditionalPaidAddons
                ? (
                  <Button.Group>
                    <Button
                      type="button"
                      onClick={() => calculatePaidAddons('decrement')}
                      disabled={additionalPaidAddons.length === 1}
                    >
                      <Icon name="minus" />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => calculatePaidAddons('increment')}
                    >
                      <Icon name="plus" />
                    </Button>
                  </Button.Group>
                )
                : null
            }
          </Segment>

          <Button
            primary
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              
              await onSubmit(
                name,
                description,
                price,
                variationData,
                image,
                dietaryCategories,
                additionalFreeAddons,
                additionalPaidAddons,
              );

              resetState();
            }}
            style={{ marginTop: '1rem' }}
            loading={loading}
            disabled={
              // if name is empty
              name === ''

              // if price is empty while no variations exist
              || (
                price === ''
                && !hasVariations
              )

              // if variations exists
              // but any of the values are nil
              || (
                hasVariations
                && variationData
                  .map(v => isEmpty(v) || isNil(v.name) || isEmpty(v.name) || isNil(v.price) || isEmpty(v.price))
                  .some(v => v === true)
              )

              // if free addons are present
              // but any of the values are nil
              || (
                hasAdditionalFreeAddons
                && additionalFreeAddons
                  .map(addon => isEmpty(addon) || isNil(addon))
                  .some(v => v === true)
              )

              // if paid addons are present
              // but any of the values are nil
              || (
                hasAdditionalPaidAddons
                && additionalPaidAddons
                  .map(addon => isEmpty(addon) || isNil(addon.name) || isEmpty(addon.name) || isNil(addon.price) || isEmpty(addon.price))
                  .some(addon => addon === true)
              )
            }
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
