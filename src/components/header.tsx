import React, { useEffect, useState } from 'react';
import { Row, Col, Tooltip } from 'antd';
import {Global} from '../mobx/global';
import Pop from './config';
import Branch from './branch';
import { observer } from 'mobx-react';
import axios from 'axios';
import {GithubOutlined} from '@ant-design/icons';
import { autorun, reaction } from 'mobx';

interface props {
  store: Global
}

// @observer
export default observer(function Header({store}: props) {
  
  const [useName, setUserName] = useState('');

  function getUserInfo() {
    axios.get('https://api.github.com/user')
      .then((res) => {
        // 用户可能没有设置昵称，此时使用登录名
        setUserName(res.data.name || res.data.login)
      })
  }

  reaction(() => store.token, () => {
    // getUserInfo()
  });

  // useEffect(() => {
  //   if(store.token) {
  //     getUserInfo()
  //   }
  // }, [])

  function goToGitHub() {
    
  }

  return (
    <Row>
      <Col style={{
        fontSize: '20px',
        fontWeight: 'bold',
        // padding: '0 8px',
      }} flex="auto 0">
        {store.repository}

      </Col>
      <Col flex="auto 1" style={{
        padding: '0 8px',
      }}>
        <Branch />
        &nbsp;&nbsp;
        <Tooltip title="前往github查看" placement="bottom">
        <a href={`https://github.com/${store.repository}${store.branch && store.branch !== 'master' ? `/tree/${store.branch}` : '' }`}
          target="_blank">
            <GithubOutlined style={{fontSize: '1.5em', color: "initial"}} />
          </a>
        </Tooltip>
     </Col>
      <Col flex="auto 0">
        {
          useName && <span className="name-wrapper">
            <span className="name-title">当前用户：</span>
            <span className="name-content">{useName}</span>
          </span> 
        }
        <Pop />
      </Col>
    </Row>
  )
})