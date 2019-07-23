/* eslint-disable react/no-array-index-key */
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
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatUSD from 'format-usd';

// Ramda utils for calculating variations
import dropLast from 'ramda/src/dropLast';
import update from 'ramda/src/update';
import isEmpty from 'ramda/src/isEmpty';
import isNil from 'ramda/src/isNil';

import Dropzone from '../Dropzone';

// options
import { options } from '../../data/dietaryCategory.json';

const SpreadHeader = styled(Header)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const UpdateDishModal = ({
  onSubmit,
  open,
  loading,
  onClose,
  dish,
  image,
}) => {
  // original values
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(Object.values(dish.price)[0]);

  // picture is used to hold state for a modified new image
  const [picture, setPicture] = useState(undefined);

  // array of strings
  const [dietaryCategories, setDietaryCategories] = useState(dish.dietaryCategories);

  // dynamic variances in dish
  // things like quantity or size
  const [hasVariations, setHasVariations] = useState(dish.variations.length > 0);
  const [variations, setVariations] = useState(dish.variations);

  // does it have freeAddons
  const [
    hasAdditionalFreeAddons,
    setHasAdditionalFreeToppings,
  ] = useState(dish.freeAddons.length > 0);
  const [additionalFreeAddons, setAdditionalFreeAddons] = useState(dish.freeAddons);

  // does it have dynamic toppings (paid)
  const [
    hasAdditionalPaidAddons,
    setHasAdditionalPaidToppings,
  ] = useState(dish.paidAddons.length > 0);
  const [additionalPaidAddons, setAdditionalPaidAddons] = useState(dish.paidAddons);

  const calculateTotalVariations = (modification) => {
    switch (modification) {
      case 'increment':
        setVariations([
          ...variations,
          {
            [variations.length]: {
              name: '',
              price: '',
            },
          },
        ]);
        break;
      case 'decrement':
        if (variations.length !== 1) {
          setVariations(dropLast(1, variations));
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

  // console.log(variations);

  return (
    <Modal
      open={open}
      size="small"
    >
      <SpreadHeader>
        <>Update Dish</>

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
            value={name}
            onChange={(event, { value }) => setName(value)}
          />

          <div className="field">
            <label>
              Image
            </label>
            {
              image
                && picture === undefined
                ? (
                  <>
                    <Image src={image} />

                    <Button
                      icon="remove"
                      onClick={() => setPicture(null)}
                    />
                  </>
                )
                : null
            }

            {
              picture === null
                ? (
                  <Dropzone
                    handleDrop={PIC => setPicture(PIC)}
                    defaultDropMessage="Modify dish image, or leave blank to omit one."
                  />
                )
                : null
            }

            {
              picture !== null
                && picture !== undefined
                ? (
                  <>
                    <Image src={picture.preview} />

                    <Button
                      icon="remove"
                      onClick={() => setPicture(null)}
                    />
                  </>
                )
                : null
            }

            {
              dish.image === null
                && picture === undefined
                ? (
                  <Dropzone
                    handleDrop={PIC => setPicture(PIC)}
                    defaultDropMessage="Modify dish image, or leave blank to omit one."
                  />
                )
                : null
            }
          </div>

          <Form.TextArea
            label="Description (Optional)"
            value={description}
            onChange={(event, { value }) => setDescription(value)}
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
            value={dietaryCategories}
          />

          <Segment color="black">
            {
              hasVariations
                ? (
                  <>
                    {
                      variations.map((currentValue, index) => (
                        <Form.Group
                          widths="equal"
                          key={index}
                        >
                          <Form.Input
                            required
                            label="Variation"
                            placeholder="Small"
                            onChange={(event, { value }) => {
                              const updated = update(index, {
                                name: value,
                                price: !isNil(variations[index].price) ? variations[index].price : '',
                              });
                              setVariations(updated);
                            }}
                            value={variations[index].name}
                          />
                          <Form.Input
                            required
                            label="Price"
                            placeholder="10.99"
                            type="number"
                            min="0.00"
                            max="100.00"
                            step="0.01"
                            onChange={(event, { value }) => {
                              const updated = update(index, {
                                name: !isNil(variations[index].name) ? variations[index].name : '',
                                price: value,
                              });
                              setVariations(updated);
                            }}
                            value={
                              variations[index].price
                                ? variations[index].price.$numberDecimal
                                : ''
                            }
                          />
                        </Form.Group>
                      ))
                    }

                    <Button.Group style={{ marginBottom: '1rem' }}>
                      <Button
                        type="button"
                        onClick={() => calculateTotalVariations('decrement')}
                        disabled={variations.length === 1}
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
                  setVariations([{}]);
                  return;
                }
                setVariations([]);
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
                          value={ADDON}
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
                          value={
                            additionalPaidAddons[index].price
                              ? additionalPaidAddons[index].price.$numberDecimal
                              : ''
                          }
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
            onClick={(e) => {
              e.preventDefault();

              onSubmit(
                name,
                description,
                price,
                picture,
                dietaryCategories,
                variations,
                additionalFreeAddons,
                additionalPaidAddons,
              );
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
                && variations
                  .map(
                    v => isEmpty(v)
                    || isNil(v.name)
                    || isEmpty(v.name)
                    || isNil(v.price)
                    || isEmpty(v.price),
                  )
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
                  .map(
                    addon => isEmpty(addon)
                      || isNil(addon.name)
                      || isEmpty(addon.name)
                      || isNil(addon.price)
                      || isEmpty(addon.price),
                  )
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

UpdateDishModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dish: PropTypes.shape().isRequired,
  image: PropTypes.string,
};

UpdateDishModal.defaultProps = {
  image: '',
};

export default UpdateDishModal;
