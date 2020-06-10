
import React, { useState } from 'react';
import {Modal} from 'antd';
// @ts-ignore
import MarkdownIt from 'markdown-it';
// import ReactMarkdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import store from '../mobx/global';
import { addOrUpdateFile } from './method';

const mdParser = new MarkdownIt();

interface props {
  source: string;
}

// export function Editor({source}: props) {
//   let editor = React.createRef();
//   function renderHTML(text: string) {
//     // // 使用 markdown-it
//     // return mdParser.render(text);
//     // 使用 react-markdown
//     return React.createElement(ReactMarkdown, {
//       source: text,
//     });
//   }

//   function getRef(el: any) {
//     editor = el;
//   }

//   return (
//     <MdEditor bindRef={getRef}
//       value= {source}
//       style={{ height: window.innerHeight - 250}}
//       renderHTML={renderHTML}
//       />
//   )
// }

class Editor extends React.Component<props> {
  // @ts-ignore
  myRef: MdEditor | null = React.createRef();
  renderHTML(text: string) {
    // 使用 markdown-it
    return mdParser.render(text);
    // // 使用 react-markdown
    // return React.createElement(ReactMarkdown, {
    //   source: text,
    // });
  }
  public getValue() {
    let res = ''
    if(this.myRef) {
      res = this.myRef.getMdValue();
    }
    return res;
  }
  render() {
    return (
      <MdEditor ref={node => this.myRef = node}
        value= {this.props.source}
        style={{ height: window.innerHeight - 250}}
        renderHTML={this.renderHTML}
        />
    )
  }
}


export default function editFile(source: string) {
  let ref: Editor | null;
  const content = <Editor source={source} ref={node => ref = node} />;
  Modal.confirm({
    width: window.innerWidth * 0.9,
    mask: true,
    maskClosable: true,
    keyboard: true,
    centered: true,
    okText: '保存',
    cancelText: '取消',
    title: store.selectFileInfo.name,
    content: content,
    onOk() {
      console.log(1)
      if(ref) {
        console.log(ref.getValue())

        addOrUpdateFile({
          path: store.selectFileInfo.path,
          message: 'test',
          content: ref.getValue(),
          sha: store.selectFileInfo.sha,
        }).then(() => {

        })
      }
    },
  })
}