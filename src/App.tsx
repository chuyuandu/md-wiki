import React from 'react';
import { Layout } from 'antd';
import Axios from 'axios';
import Header from './components/header';
import Sider from './components/sider';
import Content from './components/content';
import store from './mobx/global';
import './App.css';
import getConfig from './components/method'
// import { autorun, computed } from 'mobx';

// Axios.defaults.headers..Authorization = basicAuth('304320930@qq.com', 'dcy6100407149')

function initial() {
  const config = getConfig();
  if(config) {
    store.updateConfig(config)
  }
}

function App() {
  initial();
  return (
    <Layout>
      <Layout.Header style={{
        backgroundColor: '#efefef'
      }}>
        <Header  store={store}/>
      </Layout.Header>
      
        <Layout>
          <Layout.Sider width="300" style={{
            backgroundColor: '#fff',
            borderRight: '1px solid #d8d5d5'
          }}>
            <Sider  store={store}/>
          </Layout.Sider>
          <Layout.Content style={{
            backgroundColor: '#fff',
            padding: '8px'
          }}>
            <Content store={store}/>
          </Layout.Content>
        </Layout>
    </Layout>
  );
}

export default App;