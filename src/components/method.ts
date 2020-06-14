import Axios, { AxiosInstance } from 'axios';
// @ts-ignore
import { Base64 } from 'js-base64';
import store from '../mobx/global';
import { reaction } from 'mobx';
import {notification} from 'antd';

Axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  let msg = '请求出错'
  if (error) {
    if(error.response && error.response.status) {
      msg = error.response.statusText;
      // switch (error.response.status) {
      //   case 500:
      //     // do something...
      //     break
      //   case 404:
      //     // do something...
      //     break
      //   default:
      //     // do something...
      //     break
      // }
    }
    else {
      msg = error.message;
    }
  }
  notification.error({
    message: msg
  });
  return error;
})
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

  function errHander(error: any) {
    let msg = '请求出错'
    if (error) {
      if(error.response && error.response.status) {
        const responseData = error.response.data;
        if(responseData.message) {
          msg = responseData.message;
        }
        else if(responseData.messages) {
          msg = responseData.messages.join(' ')
        }
        else {
          msg = error.response.statusText;
        }
        // switch (error.response.status) {
        //   case 500:
        //     // do something...
        //     break
        //   case 404:
        //     // do something...
        //     break
        //   default:
        //     // do something...
        //     break
        // }
      }
      else {
        if(error.message) {
          msg = error.message;
        }
      }
    }
    notification.error({
      message: msg
    });
    return Promise.reject(error);
  }

giteeAxios.interceptors.response.use(function(response) {
  return response;
}, errHander)
githubAxios.interceptors.response.use(function(response) {
  return response;
}, errHander)

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

// export function getDefaultBranch() {
//   return localStorage.getItem('defaultBranch') || 'master'
// }

interface delFileParams {
  path: string;
  message: string;
  sha: string;
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

export interface treeData {
  key: string;
  title: string;
  type: string;
  sha: string;
  isLeaf: boolean;
  children?: treeData[]
}

function formatItem(item:giteeTreeOri, name: string):treeData {
  return {
    key: item.path,
    title: name,
    sha: item.sha,
    type: item.type,
    isLeaf: item.type === 'blob'
  }
}
abstract class Methods {
  abstract getUserInfo(): Promise<{name: string, login: string}>;
  abstract getTrees(param: getTreeParams): Promise<any>;
  abstract getBranches() : Promise<{ name: string}[]>;
  abstract getFileContent(param: getFileContentParams): Promise<string>;
  abstract saveFile(params: saveFileParam): Promise<saveFileResult>;

  formatTreeData(data: giteeTreeOri[]) :treeData[] {
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
      const dataItem = formatItem(item, name);
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
}
export interface giteeTreeOri {
  path: string;
  sha: string;
  type: string;
  name?: string;
}
class GiteeMethods extends Methods {
  private axiosInstance = giteeAxios;
  getUserInfo() {
    return this.axiosInstance.get('user', {
      params: {
        access_token: store.token,
      }
    })
      .then((res) => {
        return res.data;
      })
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

  delFile(param: delFileParams) {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/contents/${param.path}`,
      method: 'DELETE',
      params: {
        access_token: store.token,
        message: param.message,
        sha: param.sha,
        branch: store.branch,
      }
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
  }))
}
}
class GitHubMethods extends Methods {
  private axiosInstance = githubAxios;
  getUserInfo() {
    return this.axiosInstance.get('user')
      .then((res) => {
        return res.data;
      })
  }

  getTrees({path, sha}: getTreeParams) {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/git/trees/${sha || store.branch}`,
      params: {
        ref: store.branch,
        recursive: '1',
      },
    })
    .then(res => {
      return this.formatTreeData(res.data.tree)
    })
  }

  getBranches() {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/branches`,
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
      headers: {
        Accept: 'application/vnd.github.VERSION.raw',
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
      url: `repos/${store.owner}/${store.repository}/contents/${path}`,
      method: 'put',
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

  delFile(param: delFileParams) {
    return this.axiosInstance({
      url: `repos/${store.owner}/${store.repository}/contents/${param.path}`,
      method: 'DELETE',
      params: {
        message: param.message,
        sha: param.sha,
        branch: store.branch,
      }
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

// get branch list
function getBranches(): Promise<{name: string}[]> {
  return getMethodInstance().getBranches();
}
// get trees
function getTrees(params: getTreeParams): Promise<any> {
  return getMethodInstance().getTrees(params);
}

function getFileContent(params: getFileContentParams) {
  return getMethodInstance().getFileContent(params)
}

function saveFile(params: saveFileParam) {
  return getMethodInstance().saveFile(params);
}

function getUserInfo() {
  return getMethodInstance().getUserInfo();
}

function delFile(params:delFileParams) {
  return getMethodInstance().delFile(params);
}

export {
  formatItem,
  getUserInfo,
  getBranches,
  getTrees,
  getFileContent,
  saveFile,
  delFile,
};