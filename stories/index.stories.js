import React from 'react';

/* eslint-disable */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'semantic-ui-css/semantic.min.css';

import Welcome from './welcome';

import InitialLaunchModal from '../src/components/InitialLaunchModal/InitialLaunchModal';
import NewDishModal from '../src/components/NewDishModal';
import DynamicVariationFormInput from '../src/components/DynamicVariationFormInput';
import DynamicIngredientModal from '../src/components/DynamicIngredientModal';
import ImageContainer from '../src/containers/ImageContainer';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome />);

storiesOf('InitialLaunchModal', module)
  .add('Open', () => (
    <InitialLaunchModal
      open
    />
  ));

storiesOf('NewDishModal', module)
  .add('Open', () => (
    <NewDishModal
      open
    />
  ));

storiesOf('DynamicVariationFormInput', module)
  .add('Open', () => (
    <DynamicVariationFormInput
      open
    />
  ));

storiesOf('DynamicIngredientModal', module)
  .add('Open', () => (
    <DynamicIngredientModal
      open
    />
  ));

storiesOf('ImageContainer', module)
  .add('Without imageKey', () => (
    <ImageContainer />
  ));
