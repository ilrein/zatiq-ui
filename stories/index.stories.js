import React from 'react';

/* eslint-disable */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'semantic-ui-css/semantic.min.css';

import Welcome from './welcome';

import InitialLaunchModal from '../src/components/InitialLaunchModal/InitialLaunchModal';
import NewItemModal from '../src/components/NewItemModal';
import NewTagModal from '../src/components/NewTagModal';
import NewLocationModal from '../src/components/NewLocationModal';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome />);

storiesOf('InitialLaunchModal', module)
  .add('Open', () => (
    <InitialLaunchModal
      open
    />
  ));

storiesOf('NewItemModal', module)
  .add('Open', () => (
    <NewItemModal
      open
    />
  ));

storiesOf('NewTagModal', module)
  .add('Open', () => (
    <NewTagModal
      open
    />
  ));

storiesOf('NewLocationModal', module)
  .add('Open', () => (
    <NewLocationModal
      open
    />
  ));
