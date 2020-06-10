import Axios from 'axios';
// @ts-ignore
import { Base64 } from 'js-base64';

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
    sha
  })
}