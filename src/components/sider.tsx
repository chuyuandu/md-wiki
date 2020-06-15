import React from 'react';
import {Tree, Menu, Dropdown } from 'antd';
import {Global} from '../mobx/global';
import {EventDataNode} from 'rc-tree/lib/interface';
import {reaction} from 'mobx';
import {observer} from 'mobx-react';
import {isValidConfig, getTrees, delFile} from './method';
import { messageConfirm, treeData } from './common';
// import { FileAddFilled, DeleteFilled } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import editFile from './editor';

interface props {
  store: Global
}

interface nodeData {
  title: string;
  key: string;
  sha: string;
  type: string;
  isLeaf?: boolean;
  children?: nodeData[];
}

interface info {
  // event: 'select';
  selected: boolean;
  node: EventDataNode;
  // selectedNodes: DataNode[];
}

const rootKey = '----';
@observer
export default class Sider extends React.Component<props>  {

  state = {
    treeData: [],
    rightClickNode: null,
  }


  componentDidMount() {
    const store = this.props.store;
    // window.addEventListener('resize', this.resize, false);
    reaction(() => {
      return {
        type: store.type,
        owner: store.owner,
        repository: store.repository,
        branch: store.branch,
      }
    }, (config: any) => {
      if(isValidConfig(config)) {
        this.setState({
          treeData: [],
        });
        this.getChildren('', '');
      }
    }, {
      delay: 50,
      fireImmediately: true,
      equals: (a, b) => {
        return ['type', 'owner', 'repository', 'branch'].every(key => {
          return a[key] === b[key]
        })
      }
    });

    // 新建文件
    reaction(() => {
      return store.newFile
    }, (newFile: treeData | null) => {
      if(newFile) {
        const item = this.formatItem(newFile);
        const slashIndex = item.key.lastIndexOf('/');
        let parentkey = '';
        if(slashIndex > -1) {
          parentkey = item.key.substring(0, slashIndex);
        }
        this.addFileToTree(item, parentkey, this.state.treeData);
        this.setState({
          treeData: this.state.treeData.slice()
        })
      }
    })

    // 更新文件
    reaction(() => {
      return store.shaChanged
    }, (shaChanged: string[]) => {
      if(shaChanged.length) {
        this.updateNode(shaChanged[0], shaChanged[1], this.state.treeData);
        this.setState({
          treeData: this.state.treeData.slice()
        })
      }
    }, {
      delay: 10,
      // fireImmediately: true,
    });
  }

  updateNode(sha: string, newSha: string, dataList: nodeData[]): boolean {
    return dataList.some(item => {
      if(item.sha === sha) {
        item.sha = newSha;
        return true;
      }
      else {
        if(item.children) {
          return this.updateNode(sha, newSha, item.children)
        }
        return false;
      }
    });
  }

  updateTreeData(list: nodeData[], key: string, children: nodeData[]): nodeData[] {
    return list.map(node => {
      if (node.key === key) {
        return { ...node, children };
      }
      if (node.children) {
        return { ...node, children: this.updateTreeData(node.children, key, children) };
      }
  
      return node;
    });
  }

  formatItem(item: nodeData) {
    return item;
  }

  formatData(data: any[]) {
    // data.forEach(item => {
    //   item.title = <Popover placement="right" content={
    //     <Space>
    //       <DeleteFilled title="删除"/>
    //       <FileAddFilled title="新建文件"/>
    //     </Space>
    //   }>
    //     {item.title}
    //   </Popover>
    // })
    return data.map(item => this.formatItem(item));
  }

  loadData = (treeNode:EventDataNode) => {
    if (treeNode.children) {
      return Promise.resolve();
    }
    
    const path = treeNode.key === rootKey ? '' : treeNode.key as string;
    return this.getChildren(path, treeNode.key as string)
    // return Axios.get(`contents/${path}`, {

    // }).then(res => {
    //   console.log(res.data)
    //   const children = this.formateData(res.data);

    //     // debugger
    //     // treeNode.children = children;
    //     this.setState({
    //       treeData: this.updateTreeData(this.state.treeData, treeNode.key as string, children)  
    //     })
    //   // return children;
    // })
  }

  getChildren(path: string, key: string) {
    return getTrees({path}).then((data) => {
      this.setState({
        treeData: this.formatData(data)
      })
    })
    // return Axios.get(`contents/${path}?ref=${this.props.store.branch}`).then(res => {
    //   const children = this.formateData(res.data);

    //   const data = key ? this.updateTreeData(this.state.treeData, key, children) : children;

    //   this.setState({
    //     treeData: data
    //   })
    // })
  }

  onSelect (key: string | React.ReactNode, { node }: info) {
    // this.props.store.selectFileUrl = key as string;
    console.log(1);
    // @ts-ignore
    if(node.type === 'blob') {
      // @ts-ignore
      this.props.store.selectFile(node);
    }
  }

  onRightClick = ({node}: {node: EventDataNode}) => {
    this.setState({
      menuVisible: true,
      rightClickNode: node,
    })
  }
  
  addFileToTree(newFile: nodeData, parentkey: string, dataList: nodeData[]) {
    if(parentkey) {
      dataList.some(item => {
        if(item.key === parentkey) {
          item.children = item.children || [];
          item.children.push(newFile);
          return true;
        }
        else {
          if(item.children) {
            this.addFileToTree(newFile, parentkey, item.children)
          }
          return false;
        }
      })
    }
    else {
      dataList.push(newFile);
    }
  }

  removeKeyFromTree(sha: string, dataList: any[]) {
    dataList.some((item, index) => {
      if(item.sha === sha) {
        dataList.splice(index, 1);
        return true;
      }
      else {
        if(item.children) {
          this.removeKeyFromTree(sha, item.children)
        }
        return false;
      }
    });
  }

  deleteTarget(data: any) {
    messageConfirm({
      title: '删除文件',
      onCancel() { },
      onOk: (msg: string) => {
        return  delFile({
          path: data.key,
          message: msg,
          sha: data.sha,
        })
        .then(res => {
          this.removeKeyFromTree(data.sha, this.state.treeData);
          this.setState({
            treeData: this.state.treeData.slice()
          })
        })
      }
    })
  }

  addFile(data: any) {
    editFile('', data.key + '/')
  }

  menuClick = ({key}:ClickParam) => {
    const node = this.state.rightClickNode;
    if(node) {
      const data = node as any;
      if(key === 'del') {
        this.deleteTarget(data);
      }
      else if(key === 'addFile') {
        this.addFile(data);
      }
    }
  }

  render() {
    const menu = <Menu onClick={this.menuClick}>
      {/* <Menu.Item key="addFolder">新建目录</Menu.Item> */}
      <Menu.Item key="addFile">新建文件</Menu.Item>
      <Menu.Item key="del">删除</Menu.Item>
    </Menu>;
    return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div>
      <Tree loadData={this.loadData}
        // showLine={true}
        blockNode={true}
        treeData={this.state.treeData}
        defaultExpandedKeys={[rootKey]}
        onSelect={this.onSelect.bind(this)}
        onRightClick={this.onRightClick}
        /></div>
      </Dropdown>
    )
  }
}

interface ContextMenuProps {
  visible: boolean;
  top?: number;
  left?: number;
  onClick?: Function;
}

// function ContextMenu(props: ContextMenuProps) {
//   const {
//     visible = true
//   } = props;
//   return (
//     <Menu style={{
//       display: visible ? '' : 'none'
//     }}>
//       <Menu.Item>
//         删除
//       </Menu.Item>
//     </Menu>
//   )
// }