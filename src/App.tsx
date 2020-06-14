import React, { useEffect, useState } from 'react';
import { Layout, Affix } from 'antd';
// import Axios from 'axios';
import Header from './components/header';
import Sider from './components/sider';
import Content from './components/content';
import store from './mobx/global';
import './App.css';
import {getConfig, getDefaultBranch} from './components/method'
// import { autorun, computed } from 'mobx';

// Axios.defaults.headers..Authorization = basicAuth('304320930@qq.com', 'dcy6100407149')

function initial() {
  // store.setBranch(getDefaultBranch());
  const config = getConfig();
  if(config) {
    store.updateConfig(config)
  }
}


function getHeight() {
  return window.innerHeight - 64;
}

function App() {
  const [siderHeight, setSiderHeight] = useState(getHeight());

  function resize (){
    setSiderHeight(getHeight())
  }
  useEffect(function addLister() {
    window.addEventListener('resize', resize, false);

    return function removeListener() {
      window.removeEventListener('resize', resize)
    }
  }, [])
  initial();
  return (
    <Layout>
      <Affix>
      <Layout.Header style={{
        backgroundColor: '#efefef'
      }}>
        <Header  store={store}/>
      </Layout.Header>
      </Affix>
        <Layout>
          <Affix offsetTop={64}>
          <Layout.Sider width="300" style={{
            backgroundColor: '#fff',
            borderRight: '1px solid #d8d5d5',
            overflow: 'auto',
            height: siderHeight,
            padding: '8px'
          }}>
            <Sider  store={store}/>
          </Layout.Sider>
          </Affix>
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