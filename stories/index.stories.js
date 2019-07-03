import React from 'react';

/* eslint-disable */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'semantic-ui-css/semantic.min.css';

import Welcome from './welcome';

import InitialLaunchModal from '../src/components/InitialLaunchModal/InitialLaunchModal';
import NewDishModal from '../src/components/NewDishModal';
import DynamicSizeModal from '../src/components/DynamicSizeModal';
import DynamicIngredientModal from '../src/components/DynamicIngredientModal';
import NewTagModal from '../src/components/NewTagModal';

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

storiesOf('DynamicSizeModal', module)
  .add('Open', () => (
    <DynamicSizeModal
      open
    />
  ));

storiesOf('DynamicIngredientModal', module)
  .add('Open', () => (
    <DynamicIngredientModal
      open
    />
  ));

storiesOf('NewTagModal', module)
  .add('Open', () => (
    <NewTagModal
      open
    />
  ));
