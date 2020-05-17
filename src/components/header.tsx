import React from 'react';
import { Row, Col } from 'antd';
import {Global} from '../mobx/global';
import Pop from './config';
import { observer } from 'mobx-react';


interface props {
  store: Global
}

// @observer
export default observer(function Header({store}: props) {
  return (
    <Row>
      <Col style={{
        fontSize: '20px',
        fontWeight: 'bold'
      }} flex="auto 1">
        {store.repository}
      </Col>
      <Col flex="100px">
        <Pop />
      </Col>
    </Row>
  )
})