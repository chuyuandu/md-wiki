
import React from 'react';
import Markdown from 'react-markdown';
import {Global} from '../mobx/global';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import Axios from 'axios'
import {Spin, Typography, Modal} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import editFile from './editor';
// @ts-ignore
// import { Base64 } from 'js-base64';

interface props {
  store: Global
}

@observer
export default class Content extends React.Component<props> {
  state = {
    source: '',
    loading: false
  }

  // @computed
  // fileUrl = function name(params:type) {
  //   return this.props.store.selectFileInfo.git_url
  // }

  // @autorun
  getContent = autorun(() => {
    const fileUrl = this.props.store.selectFileInfo.git_url;
    if(fileUrl) {
      window.scrollTo({
        top: 0
      });
      this.setState({
        loading: true,
        source: '',
      })
      Axios.get(fileUrl, {
        headers: {
          accept: 'application/vnd.github.VERSION.raw',
          // responseType: 'blob'
        }
      })
      .then(res => {
        // console.log(res.data)
        this.setState({
          // source: Base64.decode(res.data.content)
          source: res.data
        })
      })
      .finally(() => {
        this.setState({
          loading: false
        })
      })
    }
  })

  edit = () => {
    // Modal.confirm({
    //   content: (<Editor source={this.state.source} />)
    // })
    editFile(this.state.source);
  }

  render() {
    return (
      <>
      <Typography.Title>
        {this.props.store.selectFileInfo.path}

        <EditOutlined onClick={this.edit}/>
      </Typography.Title>
      <Typography.Text>
        {
          this.state.loading
          ? (
            <Spin ></Spin>
          )
          : <Markdown
          source = {this.state.source}
          escapeHtml = {true}
          >
          </Markdown>
        }
        
      </Typography.Text>
      </>
    )
  }
}