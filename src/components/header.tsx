import React, { useEffect, useState } from 'react';
import { Row, Col, Tooltip, Space } from 'antd';
import {Global} from '../mobx/global';
import Pop from './config';
import Branch from './branch';
import { observer } from 'mobx-react';
// import axios from 'axios';
import Icon, {GithubOutlined} from '@ant-design/icons';
// import { reaction } from 'mobx';
import {getUserInfo} from './method'
import { ReactComponent as Gitee} from '../gitee.svg';

interface props {
  store: Global
}

const JumpIcon = observer(function ({store}: props) {
  let title = '', link = '';
  const style = {fontSize: '1.5em', color: "initial"};
  if(store.type === 'gitee') {
    title = '前往码云官网查看';
    link = `https://gitee.com/${store.owner}/${store.repository}${store.branch && store.branch !== 'master' ? `/tree/${store.branch}` : '' }`
  }
  else {
    title = '前往GitHub官网查看'
    link = `https://github.com/${store.owner}/${store.repository}${store.branch && store.branch !== 'master' ? `/tree/${store.branch}` : '' }`
  }
  return <Tooltip title={title} placement="bottom">
  <a href={link}
    target="_blank" rel="noopener noreferrer">
      {
        store.type === 'gitee' ?
          <Icon component={Gitee} style={style} />
        : <GithubOutlined style={style} />
      }
      
    </a>
  </Tooltip>
})

// @observer
export default observer(function Header({store}: props) {
  
  const [useName, setUserName] = useState('');

  useEffect(() => {
    // reaction(() => store.token, (token: string) => {
      if(store.token) {
        getUserInfo().then(data =>{
          // 用户可能没有设置昵称，此时使用登录名
          setUserName(data.name || data.login)
        })
      }
    // }, {
    //   fireImmediately: true,
    //   delay: 20,
    // });
  }, [store.token])

  return (
    <Row align="middle">
      <Col style={{
        fontSize: '20px',
        fontWeight: 'bold',
        // padding: '0 8px',
      }} flex="auto 0">
        {store.owner}/{store.repository}

      </Col>
      <Col flex="auto 1" style={{
        padding: '0 8px',
      }}>
        <Branch />
        &nbsp;&nbsp;
        <JumpIcon store={store}/>
     </Col>
      <Col flex="auto 0">
        <Space>
        {
          useName && <span className="name-wrapper">
            <span className="name-title">当前用户：</span>
            <span className="name-content">{useName}</span>
          </span> 
        }
        <Pop />

        </Space>
      </Col>
    </Row>
  )
})