
import React from 'react';
import Markdown from 'react-markdown';
import {Global} from '../mobx/global';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import Axios from 'axios'
import {Divider, Typography} from 'antd';
// @ts-ignore
import { Base64 } from 'js-base64';

interface props {
  store: Global
}

@observer
export default class Content extends React.Component<props> {
  state = {
    source: ''
  }

  // @computed
  // fileUrl = function name(params:type) {
  //   return this.props.store.selectFileInfo.git_url
  // }

  // @autorun
  getContent = autorun(() => {
    const fileUrl = this.props.store.selectFileInfo.git_url;
    if(fileUrl) {
      Axios.get(fileUrl)
      .then(res => {
        // console.log(res.data)
        this.setState({
          source: Base64.decode(res.data.content)
        })
      })
    }
  })

  render() {
    return (
      <>
      <Typography.Title>
        {this.props.store.selectFileInfo.path}
      </Typography.Title>
      <Typography.Text>
        <Markdown
          source = {this.state.source}
          >
          </Markdown>
      </Typography.Text>
      </>
    )
  }
}