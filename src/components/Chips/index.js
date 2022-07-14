import React from 'react'
import { View } from 'react-native'
import styles from './style'

import Item from '../ChipItem'

class Chips extends React.Component {

  render() {
    let { items, onPress, selectedItem } = this.props;

    return (
      <View style={styles.container}>
        {items.map((item, index) =>
          <Item item={item} 
          key={index} 
          label={item} 
          onPress={onPress} 
          selected={selectedItem == item} />
        )}
      </View>
    )
  }
}

export default Chips
