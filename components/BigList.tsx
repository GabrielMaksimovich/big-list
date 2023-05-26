import React from 'react';
import {View, Text } from 'react-native';
import BigList, {BigListRenderItemInfo} from 'react-native-big-list';

const data = Array.from({length: 10000}, (_, i) => `Item ${i}`);

const renderItem = (info: BigListRenderItemInfo<string>) => {
  const style = Array.isArray(info.style) ? info.style[0] : info.style;
  return (
    <View style={style}>
      <Text>{info.item}</Text>
    </View>
  );
};

const renderHeader = () => (
  <View style={{height: 90}}>
    <Text>This is the header</Text>
  </View>
);

const renderFooter = () => (
  <View style={{height: 100}}>
    <Text>This is the footer</Text>
  </View>
);

const BigListComponent = () => {
  return (
    <BigList
      data={data}
      renderItem={renderItem}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      itemHeight={50}
    />
  );
};

export default BigListComponent;
