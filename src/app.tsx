import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '@/store';
import './app.css';

const store = configureStore();

export default class App extends Component {
  componentDidMount() {
    console.log(`App launch ${process.env.NODE_ENV}`);
    wx.cloud.init({
      env: 'test-piwwe',
    });
  }

  onShow(options: any) {
    console.log('onShow', options);
    console.log(process.env.REMAX_APP_API);
  }
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
