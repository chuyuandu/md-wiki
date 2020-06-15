
import React from 'react';
import Markdown from 'react-markdown';
import {Global} from '../mobx/global';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
// import Axios from 'axios'
import {Spin, Typography, Row, Col, Affix} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import editFile from './editor';
import { getFileContent } from './method'
// @ts-ignore
// import { Base64 } from 'js-base64';

interface props {
  store: Global
}

@observer
export default class Content extends React.Component<props> {
  state = {
    source: '',
    loading: false,
    fileSuffix: '',
  }

  // @computed
  // fileUrl = function name(params:type) {
  //   return this.props.store.selectFileInfo.git_url
  // }

  componentDidMount() {
    reaction(() => this.props.store.selectFileInfo.sha,
      (sha) => {
      if(sha) {
        window.scrollTo({
          top: 0
        });
        const name = this.props.store.selectFileInfo.name;
        this.setState({
          loading: true,
          source: '',
          fileSuffix: name.toLowerCase().substring(name.lastIndexOf('.') + 1),
        })
        // Axios.get(fileUrl, {
        //   headers: {
        //     accept: 'application/vnd.github.VERSION.raw',
        //     // responseType: 'blob'
        //   }
        // })
        getFileContent({sha})
        .then(res => {
          // console.log(res.data)
          this.setState({
            // source: Base64.decode(res.data.content)
            source: res
          })
        })
        .finally(() => {
          this.setState({
            loading: false
          })
        })
      }
    }, {
      fireImmediately: true
    })
  }

  edit = () => {
    // Modal.confirm({
    //   content: (<Editor source={this.state.source} />)
    // })
    if(this.props.store.selectFileInfo.sha) {
      editFile(this.state.source);
    }
  }

  render() {
    return (
      <>
      <Affix offsetTop={64} style={{top: '64px'}}>
      <Typography.Title level={3} style={{backgroundColor: '#fff'}}>
        <Row>
          <Col flex="auto 1">{this.props.store.selectFileInfo.path}</Col>
          <Col flex="100px 0"><EditOutlined onClick={this.edit}/></Col>
        </Row>
        <hr style={{boxShadow: '0px 1px 1px 1px #cac5c5', border: 'none', margin: '0'}}/>
      </Typography.Title>
      </Affix>
      <Typography.Text>
        {
          this.state.loading
          ? (
            <Spin ></Spin>
          )
          : (
            this.state.fileSuffix === 'md'
            ?
            <Markdown
            source = {this.state.source}
            escapeHtml = {true}
            >
            </Markdown>

            : <pre style={{whiteSpace: 'break-spaces', wordBreak: 'break-all'}}>{this.state.source}</pre>
            )
        }
        
      </Typography.Text>
      </>
    )
  }
}