import React, { useEffect, useState } from 'react'
import { Dropdown, Menu } from 'antd';
import { getBranches } from './method'
import store from '../mobx/global';
import { observer } from 'mobx-react';
import { DownOutlined } from '@ant-design/icons';


export default observer(function Branch() {
    const [branchList, setBranchList] = useState<string[]>([])
    const [disabeld, setDisabled] = useState(false)
    function switchBranch({key}: {key: string}) {
        // store.branch = key;
        store.setBranch(key);
    }
    const menu = <Menu onClick={switchBranch}>
        {
            branchList.map(branch => {
                return <Menu.Item key={branch}>{branch}</Menu.Item>
            })
        }
        </Menu>;
    useEffect(() => {
        getBranches().then(branchList => {
            const branches = branchList.map(item => item.name);
            // const branches: string[] = res.data.map((item: any) => item.name);
            setBranchList(branches);
            setDisabled(branches.length <= 1);
            if(!branches.includes(store.branch)) {
                store.setBranch(branches[0]);
            }
        })
    }, [])
    return <Dropdown overlay={menu} trigger={['click']} disabled={disabeld} >
        <a>{store.branch} <DownOutlined /></a>
    </Dropdown>
})

