import React,{Component } from "react";
import {StyleSheet, View, Text, Button } from "react-native";
import actions from "../action";
import { connect } from "react-redux";

class TrendingPage extends Component {
    
    render() {
      const {navigation} = this.props;
        return (
            <View style={styles.constainer}>
                <Text style={styles.welcome}>TrendingPage</Text>
                <Button 
                  title={'修改主题'}
                  onPress={() => this.props.onThemeChange('red')}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent:  'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(null, mapDispatchToProps)(TrendingPage);