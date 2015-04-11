'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  Platform,
} from 'react-native';

const isIOS = Platform.OS === 'ios';

import colors from '../colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    width: 30,
    height: 30,
  },
  text: {
    opacity: .6,
  },
});

export default class LoadingIndicator extends Component {
  constructor(props){
    super(props);
    this.state = {
      opacity: 0,
    };
  }
  componentDidMount(){
    this._timer = setTimeout(() => {
      this.setState({
        opacity: 1,
      });
    }, 900); // less than 1 second
  }
  componentWillUnmount(){
    clearTimeout(this._timer);
  }
  render(){
    return (
      <View style={[styles.container, {opacity: this.state.opacity}]}>
        {isIOS ? (
          <View>
            <ActivityIndicatorIOS animating={true} style={styles.spinner}/>
            <Text style={styles.text}>Loading&hellip;</Text>
          </View>
        ) : (
          <ProgressBarAndroid color={colors.disabledColor} indeterminate={true} />
        )}
      </View>
    );
  }
}
