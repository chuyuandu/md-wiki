const helpContent = `
## 查看远程托管的仓库markdown文档

所有文件全都托管在你自己的远程仓库中，且只需要提供一个token即可

支持 码云 和 GitHub 仓库

>暂时只支持markdown文件

## 如何配置

点击配置按钮，弹框中填入相应选项

| 选项 | 作用 |
| --- | --- |
| 仓库类型   | 想要显示远程仓库类型： 码云或GitHub |
| 仓库owner &nbsp; | 代码仓库的owner用户名 |
| 仓库名称   | 代码仓库的名称 |
| token    | 到对应官网上生成的用户令牌，用来访问及修改文件 |



## 如何生成token
### 码云

登陆到 [码云](https://gitee.com) 官网后


> 设置 --> 私人令牌 --> 生成私人令牌


### GItHub
登陆到 [GitHub](https://github.com) 官网后

>Setting --> Developer Settings --> Personal access tokens --> Generate New Token

## 操作
* 在树形节点上右键可以 新建、删除
* 点击树形节点的文件对象，右边显示markdown的内容，右上角的编辑按钮可以对文件进行编辑
`;

export default helpContent;
