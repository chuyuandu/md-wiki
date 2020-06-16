import React, { useEffect, useState } from 'react';
import { Layout, Affix, Tooltip, Space, Modal } from 'antd';
// import Axios from 'axios';
import Header from './components/header';
import Sider from './components/sider';
import Content from './components/content';
import store from './mobx/global';
import './App.css';
import {getConfig} from './components/method'
import { QuestionCircleTwoTone } from '@ant-design/icons';
// import { autorun, computed } from 'mobx';
import help from './help';
import Markdown from 'react-markdown';

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

  function showHelp() {
    Modal.info({
      width: 650,
      centered: true,
      icon: null,
      okText: '知道了',
      content: <div style={{height: window.innerHeight - 150, overflow: 'auto'}}>
        <Markdown
        source = {help}
        escapeHtml = {true}
        >
        </Markdown>
      </div>
    })
  }
  useEffect(function addLister() {
    window.addEventListener('resize', resize, false);
    initial();

    return function removeListener() {
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <Layout>
      <Affix>
      <Layout.Header style={{
        backgroundColor: '#efefef'
      }}>
        <Header  store={store}/>
        
        <Space style={{position: 'absolute', right: '16px', top: '5px'}}>
        {/* <a href='https://gitee.com/chuyuandu/WIKI-API' target="_blank">
          <img src='https://gitee.com/chuyuandu/WIKI-API/widgets/widget_6.svg' alt='Fork me on Gitee'></img>
        </a> */}

        <Tooltip title="查看帮助" placement="bottomRight" >
          <QuestionCircleTwoTone onClick={showHelp} twoToneColor='#106abd' style={{fontSize: "24px"}} />
        </Tooltip>
        </Space>
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