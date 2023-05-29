import React, {useEffect, useState} from 'react';
import BigList, {BigListRenderItemInfo} from 'react-native-big-list';
import axios from 'axios';
import {Block} from './SimpleComponents/Block';
import {Image} from './SimpleComponents/Image';
import {Text} from './SimpleComponents/Text';

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
    <Block style={style}>
      <Image
        width={'200%'}
        height={'50%'}
        resizeMode={'cover'}
        source={{uri: info.item.thumbnailUrl}}
        onLoad={() => console.log('Image loaded')}
        onError={() => console.log('Error, image has problem with loading')}
      />
    </Block>
  );
};

const renderHeader = () => (
  <Block height={'80px'}>
    <Text color={'black'}>This is the header</Text>
  </Block>
);

const renderFooter = () => (
  <Block height={'80px'}>
    <Text>This is the footer</Text>
  </Block>
);

const BigListComponent = React.memo(() => {
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
    <Block flex={1} justifyContent={'center'} alignItems={'center'}>
      <BigList
        data={data}
        renderItem={renderItem}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
        itemHeight={70}
      />
    </Block>
  );
});

export default BigListComponent;
