import React from 'react';
import { Modal, Form, Input, Button, Space, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import global, {updateConfigParam} from '../mobx/global';
import {getConfig, isValidConfig} from './method'

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
    visible: !isValidConfig(config)
  }

  showPop = () => {
    this.setState({
      visible: true
    })
  }

  onFinish = (values: Store) => {
    // console.log(global)
    global.updateConfig(values as updateConfigParam);
    // // 修改仓库地址后，默认将branch设置为master
    // global.setBranch('master');
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
      type: configData.type || '',
      owner: configData.owner || '',
      repository: configData.repository || '',
      token: configData.token || '',
    }
    return (
      <>
      <Button type="primary" onClick={this.showPop}>配置</Button>
      <Modal title="设置"
        maskClosable={false}
        visible={this.state.visible}
        closable={true}
        footer = {null}
        onCancel={this.cancel}
        >
        <Form {...layout}
          name="basic"
          initialValues={initialValues}
          onFinish={this.onFinish}
          // onFinishFailed={onFinishFailed}
          >
          <Form.Item
            label="仓库类型"
            name="type"
            rules={[{ required: true, message: '输入仓库地址' }]}
            >
              <Select defaultValue="gitee">
                <Select.Option value="gitee">码云</Select.Option>
                <Select.Option value="github">GitHub</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="仓库owner"
              name="owner"
              rules={[{ required: true, message: '请输入owner' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="仓库名"
              name="repository"
              rules={[{ required: true, message: '输入仓库名' }]}
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