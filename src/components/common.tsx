import React from 'react';
import {Modal, Input} from 'antd';

interface param {
    title: string;
    onOk: (param: string) => void;
    onCancel: () => void;
}
export  function messageConfirm(param: param) {
  let msg = '';
  function update(e: React.ChangeEvent<HTMLInputElement>) {
    msg = e.target.value;
  }
  const input = <Input onChange={update} />

  Modal.confirm({
    content: input,
    title: param.title,
    maskClosable: false,
    onCancel: () => {
        return param.onCancel();
    },
    onOk: () => {
        if(msg) {
            return param.onOk(msg);
        }
        else {
            return Promise.reject();
        }
    },
  })
}
export interface treeData {
  key: string;
  title: string;
  type: string;
  sha: string;
  isLeaf: boolean;
  children?: treeData[]
}
export interface giteeTreeOri {
  path: string;
  sha: string;
  type: string;
  name?: string;
}
export function formatItem(item:giteeTreeOri, name: string):treeData {
  return {
    key: item.path,
    title: name,
    sha: item.sha,
    type: item.type,
    isLeaf: item.type === 'blob'
  }
}