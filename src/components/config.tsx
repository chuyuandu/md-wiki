import React from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { Store } from 'antd/lib/form/interface';
import global, {updateConfigParam} from '../mobx/global';
import getConfig from './method'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const config = getConfig();
export default class Config extends React.Component {
  state = {
    visible: config === null
  }

  showPop = () => {
    this.setState({
      visible: true
    })
  }

  onFinish = (values: Store) => {
    // console.log(global)
    global.updateConfig(values as updateConfigParam);
    this.setState({
      visible: false
    })
  }

  cancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const configData = config || {};
    const initialValues = {
      repository: configData.repository || '',
      token: configData.token || ''
    }
    return (
      <>
      <Button type="primary" onClick={this.showPop}>配置</Button>
      <Modal title="设置"
        visible={this.state.visible}
        footer = {null}
        >
        <Form {...layout}
          name="basic"
          initialValues={initialValues}
          onFinish={this.onFinish}
          // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="仓库地址"
              name="repository"
              rules={[{ required: true, message: '输入仓库地址' }]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              label="token"
              name="token"
              rules={[{ required: true, message: '输入user token' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>

              <Space size={16}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
                <Button type="default" onClick={this.cancel}>
                  取消
                </Button>
              </Space>
            </Form.Item>
        </Form>
      </Modal>
      </>
    )
  }
}