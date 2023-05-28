import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import BigList, {BigListRenderItemInfo} from 'react-native-big-list';
import axios from 'axios';

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
        style={{width: '100%', height: '100%'}}
      />
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
      itemHeight={100}
    />
  );
};

export default BigListComponent;
