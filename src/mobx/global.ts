import { observable, action } from 'mobx';
// import {EventDataNode} from 'rc-tree/lib/interface';
import Axios from 'axios';

interface DataNode {
  title: string;
  key: string;
  download_url: string;
  git_url: string;
}

export interface updateConfigParam {
  repository: string;
  token: string;
}

function basicAuth(token: string) {
  return `token ${token}`
}

export class Global {
  @observable repository = '';
  @observable token = '';
  // @observable selectFileUrl = '';
  // @observable selectFilePath = '';
  @observable selectFileInfo = {
    git_url: '',
    download_url: '',
    path: '',
    name: '',
    content: '',
    sha: '',
    node_id: '',
  }

  @action
  updateConfig(config: updateConfigParam) {
    this.repository = config.repository;
    this.token = config.token;
    localStorage.setItem('config', JSON.stringify({
      repository: config.repository,
      token: config.token
    }));

    
    Axios.defaults.baseURL = 'https://api.github.com/repos/' + config.repository;
    const auth = basicAuth(config.token);
    Axios.interceptors.request.use(function(config) {
      config.headers.Authorization = auth;
      config.headers.Accept = 'application/vnd.github.v3+json;'
      // config.headers.Accept = 'application/vnd.github.VERSION.raw'
      return config;
    });
  }

  @action
  selectFile(treeNode: DataNode) {
    // this.selectFilePath = treeNode.key;
    // const blobUrl = treeNode.git_url;
    Object.assign(this.selectFileInfo, {
      name: treeNode.title,
      path: treeNode.key,
      download_url: treeNode.download_url,
      git_url: treeNode.git_url,
    });
    // return Axios.get(blobUrl)
    // .then(res => {
    //   this.selectFileInfo.content = atob(res.data.content);
    //   this.selectFileInfo.sha = res.data.sha;
    //   this.selectFileInfo.node_id = res.data.node_id;
    // })
  }
}

export default new Global();