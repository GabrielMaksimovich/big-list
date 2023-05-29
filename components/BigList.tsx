import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import BigList, {BigListRenderItemInfo} from 'react-native-big-list';
import axios from 'axios';
import {Block} from './SimpleComponents/Block';
import {Image} from './SimpleComponents/Image';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const renderItem = (info: BigListRenderItemInfo<any>) => {
  const style = Array.isArray(info.style) ? info.style[0] : info.style;
  return (
    <View style={style}>
      <Image
        source={{uri: info.item.thumbnailUrl}}
        width={'100%'}
        height={'100%'}
        onLoad={() => console.log('Image loaded')}
        onError={() => console.log('Error, image has problem with loading')}
      />
    </View>
  );
};

const renderHeader = () => (
  <Block height={'80px'}>
    <Text>This is the header</Text>
  </Block>
);

const renderFooter = () => (
  <Block height={'80px'}>
    <Text>This is the footer</Text>
  </Block>
);

const BigListComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        const validData = response.data.filter(
          (item: Photo) => item.thumbnailUrl != null,
        );
        setData(validData);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <BigList
      data={data}
      renderItem={renderItem}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      itemHeight={70}
    />
  );
};

export default BigListComponent;
