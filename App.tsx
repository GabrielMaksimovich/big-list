/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import BigList from './components/BigList';
import {Block} from './components/SimpleComponents/Block';

function App(): JSX.Element {
  return (
    <Block flex={1}>
      <BigList />
    </Block>
  );
}

export default App;
