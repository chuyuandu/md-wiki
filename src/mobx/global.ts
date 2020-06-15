import { observable, action } from 'mobx';
// import {EventDataNode} from 'rc-tree/lib/interface';
// import Axios from 'axios';
// import {notification} from 'antd';
import {treeData, giteeTreeOri, formatItem} from '../components/common'

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
  @observable type: string = '';
  @observable owner: string = '';
  @observable repository = '';
  @observable token = '';
  @observable branch = 'master';
  @observable shaChanged: string[] = [];
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
    
  }

  @action
  selectFile(treeNode: DataNode) {
    // this.selectFilePath = treeNode.key;
    // const blobUrl = treeNode.git_url;
    Object.assign(this.selectFileInfo, {
      name: treeNode.title,
      path: treeNode.key,
      sha: treeNode.sha,
    });
  }

  @action
  addFile(file: giteeTreeOri) {
    this.newFile = formatItem(file, file.name || '');
  }

  @action
  updateSelectFile(file: giteeTreeOri) {
    const oldSha = this.selectFileInfo.sha;
    const newSha = file.sha;
    // shaChange 时，由于tree的key是path，所以不会触发node重新select
    this.selectFileInfo.sha = newSha;
    this.shaChanged = [oldSha, newSha];
  }
}
export default new Global();