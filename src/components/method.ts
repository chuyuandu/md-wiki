import Axios from 'axios';
// @ts-ignore
import { Base64 } from 'js-base64';
import store from '../mobx/global';

export default function getConfig() {
  let storageConfig = localStorage.getItem('config');
  let config = null;
  if(storageConfig) {
    try {
      config = JSON.parse(storageConfig);
    }
    catch(e) {}
  }
  return config;
}

export function getDefaultBranch() {
  return localStorage.getItem('defaultBranch') || 'master'
}

interface updateParam {
  path: string;
  message: string;
  content: string;
  sha?: string;

}

export function addOrUpdateFile(params: updateParam) {
  const {
    path,
    message,
    content,
    sha
  } = params;
  return Axios.put(`contents/${path}`, {
    message,
    content: Base64.encode(content),
    sha,
    branch: store.branch,
  })
}

export function getBranches() {

  return Axios.get(`branches`)
}