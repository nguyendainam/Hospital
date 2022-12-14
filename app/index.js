/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import { name as appName } from './app.json';
import RootComponent from './src/screens/index'

AppRegistry.registerComponent(appName, () => RootComponent);
