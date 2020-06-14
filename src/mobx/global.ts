import { observable, action } from 'mobx';
// import {EventDataNode} from 'rc-tree/lib/interface';
// import Axios from 'axios';
// import {notification} from 'antd';
import {treeData, giteeTreeOri, formatItem} from '../components/method'

interface DataNode {
  title: string;
  key: string;
  download_url: string;
  git_url: string;
  sha: string;
}

export interface updateConfigParam {
  type: string;
  owner: string;
  repository: string;
  token: string;
  branch: string;
}

export class Global {
  @observable type: string = 'gitee';
  @observable owner: string = '';
  @observable repository = '';
  @observable token = '';
  @observable branch = 'master';
  // @observable selectFileUrl = '';
  // @observable selectFilePath = '';
  @observable selectFileInfo = {
    path: '',
    name: '',
    content: '',
    sha: '',
    node_id: '',
  }

  @observable newFile: treeData | null = null;

  @action
  setBranch(branch: string) {
    this.branch = branch;
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('config', JSON.stringify({
      type: this.type,
      owner: this.owner,
      repository: this.repository,
      token: this.token,
      branch: this.branch,
    }));
  }

  @action
  updateConfig(config: updateConfigParam) {
    if(config.branch) {
      this.branch = config.branch;
    }
    else {
      if(this.repository !== config.repository
        || this.type !== config.type
        || this.owner !== config.owner) {
          // 默认重置为master分支
          // TODO: 应重置为默认分支，仓库的默认分支可能被设置为非 master
          this.branch = 'master';
        }
    }
    
    this.repository = config.repository;
    this.token = config.token;
    this.type = config.type;
    this.owner = config.owner;
    this.updateLocalStorage();
    // localStorage.setItem('config', JSON.stringify({
    //   type: config.type,
    //   owner: config.owner,
    //   repository: config.repository,
    //   token: config.token,
    //   branch: this.branch,
    // }));
    const cur = this;
    
    // Axios.defaults.baseURL = 'https://api.github.com/repos/' + config.repository;
    // const auth = basicAuth(config.token);
    // Axios.interceptors.request.use(function(config) {
    //   config.headers.Authorization = auth;
    //   config.headers.Accept = 'application/vnd.github.v3+json;'
    //   // config.params = {
    //   //   ref: cur.branch,
    //   //   ...config.params
    //   // }
    //   // config.headers.Accept = 'application/vnd.github.VERSION.raw'
    //   return config;
    // });
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
      sha: treeNode.sha,
    });
    // return Axios.get(blobUrl)
    // .then(res => {
    //   this.selectFileInfo.content = atob(res.data.content);
    //   this.selectFileInfo.sha = res.data.sha;
    //   this.selectFileInfo.node_id = res.data.node_id;
    // })
  }

  @action
  addFile(file: giteeTreeOri) {
    this.newFile = formatItem(file, file.name || '');
  }
}
export default new Global();