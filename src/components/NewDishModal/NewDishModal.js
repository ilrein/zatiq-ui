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
import { dietaryCategory } from '../../data/dietaryCategory.json';
import { category } from '../../data/category.json';

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
  const [dietaryRestrictions, setDietaryCategories] = useState([]);
  const [image, setImage] = useState('');

  // dynamic variances in dish
  // things like quantity or size
  const [hasVariations, setHasVariations] = useState(false);
  const [variations, setVariations] = useState([]);

  // does it have dynamic toppings (free)
  const [hasFreeAddons, setHasFreeAddons] = useState(false);
  const [freeAddons, setFreeAddons] = useState([]);

  // does it have dynamic toppings (paid)
  const [hasPaidAddons, setHasPaidAddons] = useState(false);
  const [paidAddons, setPaidAddons] = useState([]);

  // is it a main course, appetizer, etc
  const [categoryValue, setCategoryValue] = useState('MAIN COURSE');

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
        setFreeAddons([
          ...freeAddons,
          '',
        ]);
        break;
      case 'decrement':
        if (freeAddons.length !== 1) {
          setFreeAddons(dropLast(1, freeAddons));
        }
        break;
      default:
        break;
    }
  };

  const calculatePaidAddons = (modification) => {
    switch (modification) {
      case 'increment':
        setPaidAddons([
          ...paidAddons,
          {
            [paidAddons.length]: {
              name: '',
              price: '',
            },
          },
        ]);
        break;
      case 'decrement':
        if (paidAddons.length !== 1) {
          setPaidAddons(dropLast(1, paidAddons));
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
    setVariations([]);
    setHasFreeAddons(false);
    setFreeAddons([]);
    setHasPaidAddons(false);
    setPaidAddons([]);
  };

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
            label="Category"
            required
            onChange={(event, { value }) => setCategoryValue(value)}
            fluid
            options={category}
            selection
            search
            value={categoryValue}
          />

          <Form.Dropdown
            label="Dietary Restriction (Optional)"
            onChange={(event, { value }) => setDietaryCategories(value)}
            fluid
            options={dietaryCategory}
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
                      variations.map((currentValue, index) => (
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
                                price: !isNil(variations[index].price) ? variations[index].price : '',
                              });
                              setVariations(updated);
                            }}
                            value={variations[index].name}
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
                                name: !isNil(variations[index].name) ? variations[index].name : '',
                                price: value,
                              });
                              setVariations(updated);
                            }}
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
                setHasFreeAddons(!hasFreeAddons);
                if (checked) {
                  setFreeAddons(['']);
                  return;
                }
                setFreeAddons(null);
              }}
              checked={hasFreeAddons}
            />

            {
              !isEmpty(freeAddons)
                ? (
                  <div style={{ marginTop: '1rem' }}>
                    {
                      freeAddons.map((ADDON, index) => (
                        <Form.Input
                          key={index}
                          label={`Add on #${index + 1}`}
                          placeholder="Salt & Pepper"
                          required
                          onChange={(event, { value }) => {
                            const updated = update(index, value);
                            setFreeAddons(updated);
                          }}
                        />
                      ))
                    }

                    <Button.Group style={{ marginBottom: '1rem' }}>
                      <Button
                        type="button"
                        onClick={() => calculateFreeAddons('decrement')}
                        disabled={freeAddons.length === 1}
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
                setHasPaidAddons(!hasPaidAddons);
                if (checked) {
                  setPaidAddons([{}]);
                  return;
                }
                setPaidAddons([]);
              }}
              checked={hasPaidAddons}
            />
          
            {
              hasPaidAddons
                ? (
                  paidAddons.map((currentValue, index) => (
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
                              price: !isNil(paidAddons[index].price) ? paidAddons[index].price : '',
                            });
                            setPaidAddons(updated);
                          }}
                          value={paidAddons[index].name}
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
                              name: !isNil(paidAddons[index].name) ? paidAddons[index].name : '',
                              price: value,
                            });
                            setPaidAddons(updated);
                          }}
                          value={paidAddons[index].price}
                        />
                      </Form.Group>
                    </>
                  ))
                )
                : null
            }

            {
              hasPaidAddons
                ? (
                  <Button.Group>
                    <Button
                      type="button"
                      onClick={() => calculatePaidAddons('decrement')}
                      disabled={paidAddons.length === 1}
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

              const newDishParams = {
                name,
                description,
                price,
                variations,
                image,
                category: categoryValue,
                dietaryRestrictions,
                freeAddons,
                paidAddons,
              };
              
              await onSubmit(newDishParams);

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
                hasFreeAddons
                && freeAddons
                  .map(addon => isEmpty(addon) || isNil(addon))
                  .some(v => v === true)
              )

              // if paid addons are present
              // but any of the values are nil
              || (
                hasPaidAddons
                && paidAddons
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

NewDishModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewDishModal;
