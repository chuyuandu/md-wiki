import React from 'react';
import {Tree, Menu} from 'antd';
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
    treeData: [],
    height: this.getHeight(),
    menuVisible: false,
  }

  getHeight() {
    return window.innerHeight - 64;
  }

  resize = () => {
    this.setState({
      height: this.getHeight()
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize, false);
    autorun(() => {
      // console.log(123)
      // 调用repository，以便让 aotorun 能识别denpendency
      const repo = this.props.store.repository;
      const branch = this.props.store.branch;
      // this.setState({
      //   treeData: [{
      //     key: rootKey,
      //     title: '目录',
      //   }]
      // })
      if(repo) {
        this.setState({
          treeData: [],
        });
        this.getChildren('', '');
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
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
        sha: item.sha,
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
    return Axios.get(`contents/${path}?ref=${this.props.store.branch}`).then(res => {
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

  onRightClick = () => {
    this.setState({
      menuVisible: true
    })
  }

  render() {
    return (
      <>
      <Tree loadData={this.loadData}
        treeData={this.state.treeData}
        defaultExpandedKeys={[rootKey]}
        onSelect={this.onSelect.bind(this)}
        onRightClick={this.onRightClick}
        />
      <ContextMenu visible={this.state.menuVisible} />
      </>
    )
  }
}

interface ContextMenuProps {
  visible: boolean;
  top?: number;
  left?: number;
  onClick?: Function;
}

function ContextMenu(props: ContextMenuProps) {
  const {
    visible = true
  } = props;
  return (
    <Menu style={{
      display: visible ? '' : 'none'
    }}>
      <Menu.Item>
        删除
      </Menu.Item>
    </Menu>
  )
}