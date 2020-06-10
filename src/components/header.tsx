import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import {Global} from '../mobx/global';
import Pop from './config';
import { observer } from 'mobx-react';
import axios from 'axios';
import store from '../mobx/global'
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
        setUserName(res.data.name)
      })
  }

  reaction(() => store.token, () => {
    getUserInfo()
  });

  useEffect(() => {
    if(store.token) {
      getUserInfo()
    }
  }, [])

  return (
    <Row>
      <Col style={{
        fontSize: '20px',
        fontWeight: 'bold'
      }} flex="auto 1">
        {store.repository}
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