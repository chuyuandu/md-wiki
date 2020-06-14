import React from 'react';
import {Modal, Input} from 'antd';
import { ModalFuncProps } from 'antd/lib/modal';

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