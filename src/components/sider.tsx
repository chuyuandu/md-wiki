import React from 'react';
import {Tree, Divider} from 'antd';
import {Global} from '../mobx/global';
import {EventDataNode} from 'rc-tree/lib/interface';
import Axios from 'axios';
import {autorun} from 'mobx';
import {observer} from 'mobx-react';

interface props {
  store: Global
}

interface nodeData {
  title: string;
  key: string;
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
  // constructor(props: ComponentProps<any>) {
  //   super(props);
  //   this.state = {
  //     treeData: []
  //   }
  // }

  state = {
    // treeData: [{
    //   key: rootKey,
    //   title: '目录',
    // }]
    treeData: []
  }

  componentDidMount() {
    autorun(() => {
      // console.log(123)
      const repo = this.props.store.repository;
      // this.setState({
      //   treeData: [{
      //     key: rootKey,
      //     title: '目录',
      //   }]
      // })
      this.getChildren('', '');
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

  // componentDidMount() {
  //   this.loadData();
  // }

  formateData(data: any[]) {
    return data.map(item => {
      return {
        key: item.path,
        title: item.name,
        type: item.type,
        download_url: item.download_url,
        git_url: item.git_url,
        isLeaf: item.type === 'file'
      }
    })
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
    return Axios.get(`contents/${path}`).then(res => {
      console.log(res.data)
      const children = this.formateData(res.data);

      const data = key ? this.updateTreeData(this.state.treeData, key, children) : children;

      this.setState({
        treeData: data
      })
    })
  }

  onSelect (key: string | React.ReactNode, { node }: info) {
    // this.props.store.selectFileUrl = key as string;
    // @ts-ignore
    if(node.type === 'file') {
      // @ts-ignore
      this.props.store.selectFile(node);
    }
  }

  render() {
    return (
      <>
      <Tree loadData={this.loadData}
        treeData={this.state.treeData}
        defaultExpandedKeys={[rootKey]}
        onSelect={this.onSelect.bind(this)}
        />
      {/* <Divider type="vertical" /> */}
      </>
    )
  }
}