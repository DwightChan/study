import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class PopularItem extends Component {
  render() {
    const {item} = this.props;
    if (!item || !item.owner) return null;
    let favoriteButton = <TouchableOpacity
      style={{padding: 6}}
      onPress={() => {

      }}
      underlayColor={'transparent'}
    >
      <FontAwesome
        name={'star-o'}
        size={26}
        style={{color: 'red'}}
      />
    </TouchableOpacity>
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
      >
        <View sytle={styles.cell_container}>
          <Text style={styles.title}>
            {item.full_name}
          </Text>
          <Text style={styles.description}>
            {item.description}
          </Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Author:</Text>
              <Image 
                style={{height: 22, width: 22}}
                source={{uri: item.owner.avatar_url}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Start:</Text>
              <Text>{item.stargazers_count}</Text>
            </View>
            {favoriteButton}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
};

const styles = StyleSheet.create({
  cell_container: {
    padding: 10,
    // backgroundColor: 'white',
    backgroundColor: '#11aa00',
    borderColor: 'black',
    marginLeft: 5,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    // marginBottom: 2,
    // marginLeft: 5,
    margin: 5,
    color: '#212121',
    // shadowOpacity: 0.5,
    // shadowColor: "#333",
    // shadowOffset: 1,
  },
  description: {
      fontSize: 14,
      marginBottom: 2,
      marginLeft: 5,
      color: '#757575',
  }
});