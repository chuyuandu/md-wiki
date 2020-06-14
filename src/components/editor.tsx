
import React, { useState, ChangeEvent } from 'react';
import {Modal, Input, notification} from 'antd';
// @ts-ignore
import MarkdownIt from 'markdown-it';
// import ReactMarkdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { messageConfirm } from './common';

import store from '../mobx/global';
import { saveFile, formatItem } from './method';

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
        style={{ height: window.innerHeight - 200}}
        renderHTML={this.renderHTML}
        />
    )
  }
}

function doPut(content: string) {
  // let msg = '';
  // function update(e: React.ChangeEvent<HTMLInputElement>) {
  //   msg = e.target.value;
  // }
  // const input = <Input onChange={update} />

  return new Promise((resolve, reject) => {
    messageConfirm({
      title: 'log',
      onCancel() {
        // reject();
      },
      onOk: (msg: string) => {
        if(msg) {
          return saveFile({
            path: store.selectFileInfo.path,
            message: msg,
            content: content,
            sha: store.selectFileInfo.sha,
          }).then((res) => {
            resolve(res);
          })
        }
        // return Promise.reject('')
      }
    })
    // Modal.confirm({
    //   content: input,
    //   title: 'log message',
    //   maskClosable: false,
    //   onOk() {
    //     if(msg) {
    //       return saveFile({
    //         path: store.selectFileInfo.path,
    //         message: msg,
    //         content: content,
    //         sha: store.selectFileInfo.sha,
    //       }).then((res) => {
    //         resolve(res);
    //       })
    //     }
    //     return Promise.reject('')
    //   }
    // })
  })
  .catch(() => {

  })
}

function doAdd(path: string, content: string) {
  return new Promise((resolve, reject) => {
    messageConfirm({
      title: 'log',
      onCancel: () => {
        // reject();
      },
      onOk: (msg: string) => {
        if(msg) {
          return saveFile({
            path,
            message: msg,
            content: content,
            isCreated: true,
          }).then((res) => {
            // 新建的返回类型为 file， getTree的返回类型为 blob
            res['type'] = 'blob'
            store.addFile(res);
            resolve();
          })
        }
        // return Promise.reject('')
      }
    })
  });
}

export default function editFile(source: string, parentPath?: string) {
  const isAdd = parentPath !== undefined;
  let ref: Editor | null;
  const content = <Editor source={source} ref={node => ref = node} />;
  
  let filePath = `${parentPath}新文件.md`;
  function tilteChange(e: ChangeEvent<HTMLInputElement>) {
    filePath = e.target.value;
  }
  const title = isAdd 
        ? <Input defaultValue={filePath} onChange={tilteChange}/>
        : store.selectFileInfo.name
  Modal.confirm({
    width: window.innerWidth * 0.9,
    mask: true,
    maskClosable: false,
    keyboard: true,
    centered: true,
    okText: '保存',
    cancelText: '取消',
    title: title,
    content: content,
    onOk() {
      if(ref && filePath) {
        const content = ref.getValue();
        if(isAdd) {
          return doAdd(`${filePath}`, content);
        }
        else if(ref) {
          return doPut(content)
        }
      }
    },
  })
}