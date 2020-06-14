import Axios, { AxiosInstance } from 'axios';
// @ts-ignore
import { Base64 } from 'js-base64';
import store from '../mobx/global';
import { reaction } from 'mobx';
import {notification} from 'antd';

const giteeAxios = Axios.create({
  baseURL: 'https://gitee.com/api/v5',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  // 此处设置的params无效
  // params: {
  //   access_token: ''
  // },
});
const githubAxios = Axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    // Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json;',
  }
});


// 修改token时，修改默认参数
reaction(() => {
  return store.token
}, (token: string) => {
  if(isGitee()) {
    // giteeAxios.defaults.params['access_token'] = token;
  }
  else if(isGithub()) {
    githubAxios.defaults.headers['Authorization'] = `token ${token}`;
  }
}, {
  fireImmediately: true
})

export function isValidConfig(config: any) {
  return config && config.type && config.owner && config.repository
}

export function getConfig() {
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

interface saveFileParam {
  path: string;
  message: string;
  content: string;
  sha?: string;
  isCreated?: boolean;
}

interface saveFileResult {
  name: string,
  path: string,
  sha: string,
  type: string,
}

export function addOrUpdateFile(params: saveFileParam) {
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

interface treeData {
  key: string;
  title: string;
  type: string;
  sha: string;
  isLeaf: boolean;
  children?: treeData[]
}

abstract class Methods {
  abstract getTrees(param: getTreeParams): Promise<any>;
  abstract getBranches() : Promise<{ name: string}[]>;
  abstract getFileContent(param: getFileContentParams): Promise<string>;
  abstract saveFile(params: saveFileParam): Promise<saveFileResult>;
}
interface giteeTreeOri {
  path: string;
  sha: string;
  type: string;
}
class GiteeMethods extends Methods {
  private axiosInstance = giteeAxios;

  private formatItem(item:giteeTreeOri, name: string):treeData {
    return {
      key: item.path,
      title: name,
      sha: item.sha,
      type: item.type,
      isLeaf: item.type === 'blob'
    }
  }
  private formatTreeData(data: giteeTreeOri[]) :treeData[] {
    const dataList:treeData[] = [];

    const temp: {[x:string]: treeData} = {};
    data.forEach(item => {
      const curPath = item.path;
      const lastSlash = curPath.lastIndexOf('/');
      let parent = '', name = '';
      if(lastSlash > -1) {
        parent = curPath.substring(0, lastSlash);
        name = curPath.substring(lastSlash + 1);
      }
      else {
        name = curPath;
      }
      const dataItem = this.formatItem(item, name);
      let targetArr = dataList;
      if(parent && temp[parent]) {
        const targetParent = temp[parent];
        if(!targetParent.children) {
          targetParent.children = [];
        }
        targetArr = targetParent.children;
      }
      targetArr.push(dataItem);
      temp[curPath] = dataItem;
    })

    return dataList;
  }

  getTrees({path, sha}: getTreeParams) {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/git/trees/${sha || store.branch}`,
      params: {
        access_token: store.token,
        recursive: '1',
      },
    })
    .then(res => {
      return this.formatTreeData(res.data.tree)
      // return res.data.tree.map((item: any) => {
      //   return {
      //     key: item.path,
      //     title: item.path,
      //     type: item.type,
      //     sha: item.sha,
      //     // isLeaf: item.type,
      //   }
      // });
    })
  }

  getBranches() {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/branches`,
      params: {
        access_token: store.token,
      },
    })
    .then(res => {
      return res.data.map((item: any) => {
        return {
          name: item.name
        }
      });
    })
  }

  getFileContent({sha}: getFileContentParams) {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/git/blobs/${sha}`,
      params: {
        access_token: store.token,
      },
    })
    .then(res => {
      return Base64.decode(res.data.content)
    })
  }

  saveFile(params: saveFileParam) {
  const {
    path,
    message,
    content,
    sha,
    isCreated, 
  } = params;
  return this.axiosInstance({
    url: `repos/${store.owner}/${store.repository}/contents/${path}`,
    method: isCreated ? 'post' : 'put',
    data: {
      access_token: store.token,
      message,
      content: Base64.encode(content),
      sha,
      branch: store.branch,
    }
  })
  .then((res => {
    if(res.status === 200 || res.status === 201) {
      const content = res.data.content;
      if(isCreated) {
        return {
          name: content.name,
          path: content.path,
          sha: content.sha,
          type: content.type,
        }
      }
      else {
        return {
          name: content.name,
          path: content.path,
          sha: content.sha,
          type: content.type,
        }
      }
    }
    else {
      notification.error({
        message: '保存失败'
      });
      return Promise.reject('保存失败')
    }
  }))
}
}
class GitHubMethods extends Methods {
  private axiosInstance = githubAxios;

  getTrees({path, sha}: getTreeParams) {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/git/trees/${sha || store.branch}`,
      params: {
        access_token: store.token,
        recursive: '1',
      },
    })
    .then(res => {
      return res.data;
    })
  }

  getBranches() {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/branches`,
      params: {
        access_token: store.token,
      },
    })
    .then(res => {
      return res.data.map((item: any) => {
        return {
          name: item.name
        }
      });
    })
  }
  getFileContent({sha}: getFileContentParams) {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/git/blobs/${sha}`,
      params: {
        access_token: store.token,
      },
    })
    .then(res => {
      return res.data
    })
  }
  saveFile(params: saveFileParam) {
    const {
      path,
      message,
      content,
      sha,
      isCreated, 
    } = params;
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/contents /${path}`,
      method: isCreated ? 'post' : 'put',
      data: {
        message,
        content: Base64.encode(content),
        sha,
        branch: store.branch,
      }
    })
    .then(res => {
      return res.data
    })
  }
}

const giteeMethods = new GiteeMethods();
const githubMethods = new GitHubMethods();

function getMethodInstance() {
  if(isGitee()) {
    return giteeMethods;
  }
  else {
    return githubMethods;
  }
}

function isGitee() {
  return store.type === 'gitee'
}

function isGithub() {
  return store.type === 'github';
}

interface getTreeParams {
  path: string;
  sha?: string;
}

interface getFileContentParams {
  sha: string;
}

function githubGetTrees({path}: getTreeParams) {
  return githubAxios.get(`repos/${store.owner}/${store.repository}/contents/${path}`, {
    params: {
      ref: store.branch,
    }
  })
  .then(res => {
    return res.data;
  })
}

// get branch list
export function getBranches(): Promise<{name: string}[]> {
  return getMethodInstance().getBranches();
}
// get trees
export function getTrees(params: getTreeParams): Promise<any> {
  return getMethodInstance().getTrees(params);
}

export function  getFileContent(params: getFileContentParams) {
  return getMethodInstance().getFileContent(params)
}

export function saveFile(params: saveFileParam) {
  return getMethodInstance().saveFile(params);
}