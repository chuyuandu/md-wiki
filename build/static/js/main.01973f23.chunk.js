(this.webpackJsonpdoc=this.webpackJsonpdoc||[]).push([[0],{245:function(e,t,n){e.exports=n(681)},250:function(e,t,n){},679:function(e,t,n){},681:function(e,t,n){"use strict";n.r(t);var a,r,o,c,i,s,l,u,h,f=n(0),p=n.n(f),m=n(5),d=n.n(m),b=(n(250),n(158),n(76)),y=n.n(b),v=(n(252),n(63)),g=n.n(v),k=(n(109),n(62)),O=n.n(k),w=(n(78),n(60)),E=n.n(w),j=(n(79),n(34)),C=n.n(j),x=n(45),I=(n(159),n(101)),F=n.n(I),S=(n(160),n(47)),T=n.n(S),D=(n(81),n(38)),z=n.n(D),H=(n(260),n(49)),R=n.n(H),P=(n(262),n(106)),B=n.n(P),N=(n(80),n(32)),L=n.n(N),A=n(14),_=n(15),M=n(25),V=n(24),q=n(30),G=n(17),U=(n(266),n(2));function J(e){var t="";var n=p.a.createElement(z.a,{onChange:function(e){t=e.target.value}});C.a.confirm({content:n,title:e.title,maskClosable:!1,onCancel:function(){return e.onCancel()},onOk:function(){return t?e.onOk(t):Promise.reject()}})}function K(e,t){return{key:e.path,title:t,sha:e.sha,type:e.type,isLeaf:"blob"===e.type}}var W=new(a=function(){function e(){Object(A.a)(this,e),Object(q.a)(this,"type",r,this),Object(q.a)(this,"owner",o,this),Object(q.a)(this,"repository",c,this),Object(q.a)(this,"token",i,this),Object(q.a)(this,"branch",s,this),Object(q.a)(this,"shaChanged",l,this),Object(q.a)(this,"selectFileInfo",u,this),Object(q.a)(this,"newFile",h,this)}return Object(_.a)(e,[{key:"setBranch",value:function(e){this.branch=e,this.updateLocalStorage()}},{key:"updateLocalStorage",value:function(){localStorage.setItem("config",JSON.stringify({type:this.type,owner:this.owner,repository:this.repository,token:this.token,branch:this.branch}))}},{key:"updateConfig",value:function(e){e.branch?this.branch=e.branch:this.repository===e.repository&&this.type===e.type&&this.owner===e.owner||(this.branch="master"),this.repository=e.repository,this.token=e.token,this.type=e.type,this.owner=e.owner,this.updateLocalStorage()}},{key:"selectFile",value:function(e){Object.assign(this.selectFileInfo,{name:e.title,path:e.key,sha:e.sha})}},{key:"addFile",value:function(e){this.newFile=K(e,e.name||"")}},{key:"updateSelectFile",value:function(e){var t=this.selectFileInfo.sha,n=e.sha;this.selectFileInfo.sha=n,this.shaChanged=[t,n]}}]),e}(),r=Object(G.a)(a.prototype,"type",[U.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),o=Object(G.a)(a.prototype,"owner",[U.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),c=Object(G.a)(a.prototype,"repository",[U.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),i=Object(G.a)(a.prototype,"token",[U.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),s=Object(G.a)(a.prototype,"branch",[U.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"master"}}),l=Object(G.a)(a.prototype,"shaChanged",[U.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),u=Object(G.a)(a.prototype,"selectFileInfo",[U.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{path:"",name:"",content:"",sha:"",node_id:""}}}),h=Object(G.a)(a.prototype,"newFile",[U.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),Object(G.a)(a.prototype,"setBranch",[U.f],Object.getOwnPropertyDescriptor(a.prototype,"setBranch"),a.prototype),Object(G.a)(a.prototype,"updateConfig",[U.f],Object.getOwnPropertyDescriptor(a.prototype,"updateConfig"),a.prototype),Object(G.a)(a.prototype,"selectFile",[U.f],Object.getOwnPropertyDescriptor(a.prototype,"selectFile"),a.prototype),Object(G.a)(a.prototype,"addFile",[U.f],Object.getOwnPropertyDescriptor(a.prototype,"addFile"),a.prototype),Object(G.a)(a.prototype,"updateSelectFile",[U.f],Object.getOwnPropertyDescriptor(a.prototype,"updateSelectFile"),a.prototype),a),$=(n(360),n(240)),Q=n.n($),X=n(155),Y=n.n(X),Z=n(105),ee=Y.a.create({baseURL:"https://gitee.com/api/v5",headers:{"Content-Type":"application/json;charset=UTF-8"},params:{access_token:W.token}}),te=Y.a.create({baseURL:"https://api.github.com",headers:{Authorization:"token ".concat(W.token),Accept:"application/vnd.github.v3+json;"}});function ne(e){var t="\u8bf7\u6c42\u51fa\u9519";if(e)if(e.response&&e.response.status){var n=e.response.data;t=n.message?n.message:n.messages?n.messages.join(" "):e.response.statusText}else e.message&&(t=e.message);return Q.a.error({message:t}),Promise.reject(e)}function ae(e){return e&&e.type&&e.owner&&e.repository}function re(){var e=localStorage.getItem("config"),t=null;if(e)try{t=JSON.parse(e)}catch(n){}return t}ee.interceptors.response.use((function(e){return e}),ne),te.interceptors.response.use((function(e){return e}),ne),Object(U.n)((function(){return{token:W.token,type:W.type}}),(function(e){he()?ee.defaults.params.access_token=e.token:"github"===W.type&&(te.defaults.headers.Authorization="token ".concat(e.token))}),{fireImmediately:!0,delay:0,equals:function(e,t){return["token","config"].every((function(n){return e[n]===t[n]}))}});var oe=function(){function e(){Object(A.a)(this,e)}return Object(_.a)(e,[{key:"formatTreeData",value:function(e){var t=[],n={};return e.forEach((function(e){var a=e.path,r=a.lastIndexOf("/"),o="",c="";r>-1?(o=a.substring(0,r),c=a.substring(r+1)):c=a;var i=K(e,c),s=t;if(o&&n[o]){var l=n[o];l.children||(l.children=[]),s=l.children}s.push(i),n[a]=i})),t}}]),e}(),ce=function(e){Object(M.a)(n,e);var t=Object(V.a)(n);function n(){var e;Object(A.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).axiosInstance=ee,e}return Object(_.a)(n,[{key:"getUserInfo",value:function(){return this.axiosInstance.get("user",{params:{access_token:W.token}}).then((function(e){return e.data}))}},{key:"getTrees",value:function(e){var t=this,n=(e.path,e.sha);return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/git/trees/").concat(n||W.branch),params:{access_token:W.token,recursive:"1"}}).then((function(e){return t.formatTreeData(e.data.tree)}))}},{key:"getBranches",value:function(){return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/branches"),params:{access_token:W.token}}).then((function(e){return e.data.map((function(e){return{name:e.name}}))}))}},{key:"getFileContent",value:function(e){var t=e.sha;return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/git/blobs/").concat(t),params:{access_token:W.token}}).then((function(e){return Z.Base64.decode(e.data.content)}))}},{key:"delFile",value:function(e){return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/contents/").concat(e.path),method:"DELETE",params:{access_token:W.token,message:e.message,sha:e.sha,branch:W.branch}})}},{key:"saveFile",value:function(e){var t=e.path,n=e.message,a=e.content,r=e.sha,o=e.isCreated;return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/contents/").concat(t),method:o?"post":"put",data:{access_token:W.token,message:n,content:Z.Base64.encode(a),sha:r,branch:W.branch}}).then((function(e){var t=e.data.content;return{name:t.name,path:t.path,sha:t.sha,type:t.type}}))}}]),n}(oe),ie=function(e){Object(M.a)(n,e);var t=Object(V.a)(n);function n(){var e;Object(A.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).axiosInstance=te,e}return Object(_.a)(n,[{key:"getUserInfo",value:function(){return this.axiosInstance.get("user").then((function(e){return e.data}))}},{key:"getTrees",value:function(e){var t=this,n=(e.path,e.sha);return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/git/trees/").concat(n||W.branch),params:{ref:W.branch,recursive:"1"}}).then((function(e){return t.formatTreeData(e.data.tree)}))}},{key:"getBranches",value:function(){return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/branches")}).then((function(e){return e.data.map((function(e){return{name:e.name}}))}))}},{key:"getFileContent",value:function(e){var t=e.sha;return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/git/blobs/").concat(t),headers:{Accept:"application/vnd.github.VERSION.raw"}}).then((function(e){return e.data}))}},{key:"saveFile",value:function(e){var t=e.path,n=e.message,a=e.content,r=e.sha;return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/contents/").concat(t),method:"put",data:{message:n,content:Z.Base64.encode(a),sha:r,branch:W.branch}}).then((function(e){return e.data}))}},{key:"delFile",value:function(e){return this.axiosInstance({url:"repos/".concat(W.owner,"/").concat(W.repository,"/contents/").concat(e.path),method:"DELETE",params:{message:e.message,sha:e.sha,branch:W.branch}})}}]),n}(oe),se=new ce,le=new ie;function ue(){return he()?se:le}function he(){return"gitee"===W.type}function fe(e){return ue().saveFile(e)}var pe={labelCol:{span:6},wrapperCol:{span:16}},me={wrapperCol:{offset:8,span:16}},de=re(),be=function(e){Object(M.a)(n,e);var t=Object(V.a)(n);function n(){var e;Object(A.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={visible:!ae(de)},e.showPop=function(){e.setState({visible:!0})},e.onFinish=function(t){W.updateConfig(t),e.setState({visible:!1})},e.cancel=function(){e.setState({visible:!1})},e}return Object(_.a)(n,[{key:"render",value:function(){var e=de||{},t={type:e.type||"",owner:e.owner||"",repository:e.repository||"",token:e.token||""};return p.a.createElement(p.a.Fragment,null,p.a.createElement(L.a,{type:"primary",onClick:this.showPop},"\u914d\u7f6e"),p.a.createElement(C.a,{title:"\u8bbe\u7f6e",maskClosable:!1,visible:this.state.visible,closable:!0,footer:null,onCancel:this.cancel},p.a.createElement(R.a,Object.assign({},pe,{name:"basic",initialValues:t,onFinish:this.onFinish}),p.a.createElement(R.a.Item,{label:"\u4ed3\u5e93\u7c7b\u578b",name:"type",rules:[{required:!0,message:"\u8f93\u5165\u4ed3\u5e93\u5730\u5740"}]},p.a.createElement(B.a,{defaultValue:"gitee"},p.a.createElement(B.a.Option,{value:"gitee"},"\u7801\u4e91"),p.a.createElement(B.a.Option,{value:"github"},"GitHub"))),p.a.createElement(R.a.Item,{label:"\u4ed3\u5e93owner",name:"owner",rules:[{required:!0,message:"\u8bf7\u8f93\u5165owner"}]},p.a.createElement(z.a,null)),p.a.createElement(R.a.Item,{label:"\u4ed3\u5e93\u540d",name:"repository",rules:[{required:!0,message:"\u8f93\u5165\u4ed3\u5e93\u540d"}]},p.a.createElement(z.a,null)),p.a.createElement(R.a.Item,{label:"token",name:"token",rules:[{required:!0,message:"\u8f93\u5165user token"}]},p.a.createElement(z.a,null)),p.a.createElement(R.a.Item,me,p.a.createElement(O.a,{size:16},p.a.createElement(L.a,{type:"primary",htmlType:"submit"},"\u4fdd\u5b58"),p.a.createElement(L.a,{type:"default",onClick:this.cancel},"\u53d6\u6d88"))))))}}]),n}(p.a.Component),ye=(n(211),n(100)),ve=n.n(ye),ge=(n(212),n(46)),ke=n.n(ge),Oe=n(29),we=n(687),Ee=Object(Oe.a)((function(){var e=Object(f.useState)([]),t=Object(x.a)(e,2),n=t[0],a=t[1],r=Object(f.useState)(!1),o=Object(x.a)(r,2),c=o[0],i=o[1];var s=p.a.createElement(ke.a,{onClick:function(e){var t=e.key;W.setBranch(t)}},n.map((function(e){return p.a.createElement(ke.a.Item,{key:e},e)})));return Object(f.useEffect)((function(){Object(U.n)((function(){return{type:W.type,owner:W.owner,repository:W.repository,token:W.token}}),(function(e){ae(e)&&ue().getBranches().then((function(e){var t=e.map((function(e){return e.name}));a(t),i(t.length<=1),t.includes(W.branch)||W.setBranch(t[0])}))}),{delay:50,fireImmediately:!0,equals:function(e,t){return["type","owner","repository","token"].every((function(n){return e[n]===t[n]}))}})}),[]),p.a.createElement(ve.a,{overlay:s,trigger:["click"],disabled:c},p.a.createElement("a",null,W.branch," ",p.a.createElement(we.a,null)))})),je=n(686),Ce=n(688);function xe(){return(xe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function Ie(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var Fe,Se=p.a.createElement("defs",null,p.a.createElement("style",{type:"text/css"})),Te=p.a.createElement("path",{d:"M512 1024C229.2224 1024 0 794.7776 0 512S229.2224 0 512 0s512 229.2224 512 512-229.2224 512-512 512z m259.1488-568.8832H480.4096a25.2928 25.2928 0 0 0-25.2928 25.2928l-0.0256 63.2064c0 13.952 11.3152 25.2928 25.2672 25.2928h177.024c13.9776 0 25.2928 11.3152 25.2928 25.2672v12.6464a75.8528 75.8528 0 0 1-75.8528 75.8528H366.592a25.2928 25.2928 0 0 1-25.2672-25.2928v-240.1792a75.8528 75.8528 0 0 1 75.8272-75.8528h353.9456a25.2928 25.2928 0 0 0 25.2672-25.2928l0.0768-63.2064a25.2928 25.2928 0 0 0-25.2672-25.2928H417.152a189.6192 189.6192 0 0 0-189.6192 189.6448v353.9456c0 13.9776 11.3152 25.2928 25.2928 25.2928h372.9408a170.6496 170.6496 0 0 0 170.6496-170.6496v-145.408a25.2928 25.2928 0 0 0-25.2928-25.2672z",fill:"#C71D23","p-id":3257}),De=function(e){var t=e.svgRef,n=e.title,a=Ie(e,["svgRef","title"]);return p.a.createElement("svg",xe({t:1592135422171,className:"icon",viewBox:"0 0 1024 1024","p-id":3256,width:200,height:200,ref:t},a),n?p.a.createElement("title",null,n):null,Se,Te)},ze=p.a.forwardRef((function(e,t){return p.a.createElement(De,xe({svgRef:t},e))})),He=(n.p,Object(Oe.a)((function(e){var t=e.store,n="",a="",r={fontSize:"1.5em",color:"initial"};return"gitee"===t.type?(n="\u524d\u5f80\u7801\u4e91\u5b98\u7f51\u67e5\u770b",a="https://gitee.com/".concat(t.owner,"/").concat(t.repository).concat(t.branch&&"master"!==t.branch?"/tree/".concat(t.branch):"")):(n="\u524d\u5f80GitHub\u5b98\u7f51\u67e5\u770b",a="https://github.com/".concat(t.owner,"/").concat(t.repository).concat(t.branch&&"master"!==t.branch?"/tree/".concat(t.branch):"")),p.a.createElement(E.a,{title:n,placement:"bottom"},p.a.createElement("a",{href:a,target:"_blank"},"gitee"===t.type?p.a.createElement(je.a,{component:ze,style:r}):p.a.createElement(Ce.a,{style:r})))}))),Re=Object(Oe.a)((function(e){var t=e.store,n=Object(f.useState)(""),a=Object(x.a)(n,2),r=a[0],o=a[1];return Object(f.useEffect)((function(){Object(U.n)((function(){return t.token}),(function(e){e&&ue().getUserInfo().then((function(e){o(e.name||e.login)}))}),{fireImmediately:!0,delay:20})}),[]),p.a.createElement(F.a,{align:"middle"},p.a.createElement(T.a,{style:{fontSize:"20px",fontWeight:"bold"},flex:"auto 0"},t.owner,"/",t.repository),p.a.createElement(T.a,{flex:"auto 1",style:{padding:"0 8px"}},p.a.createElement(Ee,null),"\xa0\xa0",p.a.createElement(He,{store:t})),p.a.createElement(T.a,{flex:"auto 0"},p.a.createElement(O.a,null,r&&p.a.createElement("span",{className:"name-wrapper"},p.a.createElement("span",{className:"name-title"},"\u5f53\u524d\u7528\u6237\uff1a"),p.a.createElement("span",{className:"name-content"},r)),p.a.createElement(be,null))))})),Pe=(n(491),n(243)),Be=n.n(Pe),Ne=n(77),Le=n(241),Ae=n.n(Le),_e=n(242),Me=n.n(_e),Ve=(n(547),new Ae.a),qe=function(e){Object(M.a)(n,e);var t=Object(V.a)(n);function n(){var e;Object(A.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).myRef=p.a.createRef(),e}return Object(_.a)(n,[{key:"renderHTML",value:function(e){return Ve.render(e)}},{key:"getValue",value:function(){var e="";return this.myRef&&(e=this.myRef.getMdValue()),e}},{key:"render",value:function(){var e=this;return p.a.createElement(Me.a,{ref:function(t){return e.myRef=t},value:this.props.source,style:{height:window.innerHeight-200},renderHTML:this.renderHTML})}}]),n}(p.a.Component);function Ge(e,t){var n,a=void 0!==t,r=p.a.createElement(qe,{source:e,ref:function(e){return n=e}}),o="".concat(t,"\u65b0\u6587\u4ef6.md");var c=a?p.a.createElement(z.a,{defaultValue:o,onChange:function(e){o=e.target.value}}):W.selectFileInfo.name;C.a.confirm({width:.9*window.innerWidth,mask:!0,maskClosable:!1,keyboard:!0,centered:!0,okText:"\u4fdd\u5b58",cancelText:"\u53d6\u6d88",title:c,content:r,onOk:function(){if(n&&o){var e=n.getValue();if(a)return function(e,t){return new Promise((function(n,a){J({title:"log",onCancel:function(){},onOk:function(a){if(a)return fe({path:e,message:a,content:t,isCreated:!0}).then((function(e){e.type="blob",W.addFile(e),n()}))}})}))}("".concat(o),e);if(n)return function(e){return new Promise((function(t,n){J({title:"log",onCancel:function(){},onOk:function(n){if(n)return fe({path:W.selectFileInfo.path,message:n,content:e,sha:W.selectFileInfo.sha}).then((function(e){W.updateSelectFile(e),t(e)}))}})})).catch((function(){}))}(e)}}})}var Ue,Je=Object(Oe.a)(Fe=function(e){Object(M.a)(n,e);var t=Object(V.a)(n);function n(){var e;Object(A.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={treeData:[],rightClickNode:null},e.loadData=function(t){if(t.children)return Promise.resolve();var n="----"===t.key?"":t.key;return e.getChildren(n,t.key)},e.onRightClick=function(t){var n=t.node;e.setState({menuVisible:!0,rightClickNode:n})},e.menuClick=function(t){var n=t.key,a=e.state.rightClickNode;if(a){var r=a;"del"===n?e.deleteTarget(r):"addFile"===n&&e.addFile(r)}},e}return Object(_.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.store;Object(U.n)((function(){return{type:t.type,owner:t.owner,repository:t.repository,branch:t.branch}}),(function(t){ae(t)&&(e.setState({treeData:[]}),e.getChildren("",""))}),{delay:50,fireImmediately:!0,equals:function(e,t){return["type","owner","repository","branch"].every((function(n){return e[n]===t[n]}))}}),Object(U.n)((function(){return t.newFile}),(function(t){if(t){var n=e.formatItem(t),a=n.key.lastIndexOf("/"),r="";a>-1&&(r=n.key.substring(0,a)),e.addFileToTree(n,r,e.state.treeData),e.setState({treeData:e.state.treeData.slice()})}})),Object(U.n)((function(){return t.shaChanged}),(function(t){t.length&&(e.updateNode(t[0],t[1],e.state.treeData),e.setState({treeData:e.state.treeData.slice()}))}),{delay:10})}},{key:"updateNode",value:function(e,t,n){var a=this;return n.some((function(n){return n.sha===e?(n.sha=t,!0):!!n.children&&a.updateNode(e,t,n.children)}))}},{key:"updateTreeData",value:function(e,t,n){var a=this;return e.map((function(e){return e.key===t?Object(Ne.a)(Object(Ne.a)({},e),{},{children:n}):e.children?Object(Ne.a)(Object(Ne.a)({},e),{},{children:a.updateTreeData(e.children,t,n)}):e}))}},{key:"formatItem",value:function(e){return e}},{key:"formatData",value:function(e){var t=this;return e.map((function(e){return t.formatItem(e)}))}},{key:"getChildren",value:function(e,t){var n,a=this;return(n={path:e},ue().getTrees(n)).then((function(e){a.setState({treeData:a.formatData(e)})}))}},{key:"onSelect",value:function(e,t){var n=t.node;"blob"===n.type&&this.props.store.selectFile(n)}},{key:"addFileToTree",value:function(e,t,n){var a=this;t?n.some((function(n){return n.key===t?(n.children=n.children||[],n.children.push(e),!0):(n.children&&a.addFileToTree(e,t,n.children),!1)})):n.push(e)}},{key:"removeKeyFromTree",value:function(e,t){var n=this;t.some((function(a,r){return a.sha===e?(t.splice(r,1),!0):(a.children&&n.removeKeyFromTree(e,a.children),!1)}))}},{key:"deleteTarget",value:function(e){var t=this;J({title:"\u5220\u9664\u6587\u4ef6",onCancel:function(){},onOk:function(n){return(a={path:e.key,message:n,sha:e.sha},ue().delFile(a)).then((function(n){t.removeKeyFromTree(e.sha,t.state.treeData),t.setState({treeData:t.state.treeData.slice()})}));var a}})}},{key:"addFile",value:function(e){Ge("",e.key+"/")}},{key:"render",value:function(){var e=p.a.createElement(ke.a,{onClick:this.menuClick},p.a.createElement(ke.a.Item,{key:"addFile"},"\u65b0\u5efa\u6587\u4ef6"),p.a.createElement(ke.a.Item,{key:"del"},"\u5220\u9664"));return p.a.createElement(ve.a,{overlay:e,trigger:["contextMenu"]},p.a.createElement("div",null,p.a.createElement(Be.a,{loadData:this.loadData,blockNode:!0,treeData:this.state.treeData,defaultExpandedKeys:["----"],onSelect:this.onSelect.bind(this),onRightClick:this.onRightClick})))}}]),n}(p.a.Component))||Fe,Ke=(n(574),n(244)),We=n.n(Ke),$e=(n(576),n(157)),Qe=n.n($e),Xe=n(102),Ye=n.n(Xe),Ze=n(689),et=Object(Oe.a)(Ue=function(e){Object(M.a)(n,e);var t=Object(V.a)(n);function n(){var e;Object(A.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={source:"",loading:!1,fileSuffix:""},e.edit=function(){e.props.store.selectFileInfo.sha&&Ge(e.state.source)},e}return Object(_.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(U.n)((function(){return e.props.store.selectFileInfo.sha}),(function(t){if(t){window.scrollTo({top:0});var n=e.props.store.selectFileInfo.name;e.setState({loading:!0,source:"",fileSuffix:n.toLowerCase().substring(n.lastIndexOf(".")+1)}),(a={sha:t},ue().getFileContent(a)).then((function(t){e.setState({source:t})})).finally((function(){e.setState({loading:!1})}))}var a}),{fireImmediately:!0})}},{key:"render",value:function(){return p.a.createElement(p.a.Fragment,null,p.a.createElement(y.a,{offsetTop:64,style:{top:"64px"}},p.a.createElement(Qe.a.Title,{level:3,style:{backgroundColor:"#fff"}},p.a.createElement(F.a,null,p.a.createElement(T.a,{flex:"auto 1"},this.props.store.selectFileInfo.path),p.a.createElement(T.a,{flex:"100px 0"},p.a.createElement(Ze.a,{onClick:this.edit}))),p.a.createElement("hr",{style:{boxShadow:"0px 1px 1px 1px #cac5c5",border:"none",margin:"0"}}))),p.a.createElement(Qe.a.Text,null,this.state.loading?p.a.createElement(We.a,null):"md"===this.state.fileSuffix?p.a.createElement(Ye.a,{source:this.state.source,escapeHtml:!0}):p.a.createElement("pre",{style:{whiteSpace:"break-spaces",wordBreak:"break-all"}},this.state.source)))}}]),n}(p.a.Component))||Ue,tt=(n(679),n(690));function nt(){return window.innerHeight-64}var at=function(){var e=Object(f.useState)(nt()),t=Object(x.a)(e,2),n=t[0],a=t[1];function r(){a(nt())}return Object(f.useEffect)((function(){return window.addEventListener("resize",r,!1),function(){var e=re();e&&W.updateConfig(e)}(),function(){window.removeEventListener("resize",r)}}),[]),p.a.createElement(g.a,null,p.a.createElement(y.a,null,p.a.createElement(g.a.Header,{style:{backgroundColor:"#efefef"}},p.a.createElement(Re,{store:W}),p.a.createElement(O.a,{style:{position:"absolute",right:"16px",top:"5px"}},p.a.createElement(E.a,{title:"\u67e5\u770b\u5e2e\u52a9",placement:"bottomRight"},p.a.createElement(tt.a,{onClick:function(){C.a.info({width:650,centered:!0,icon:null,okText:"\u77e5\u9053\u4e86",content:p.a.createElement("div",{style:{height:window.innerHeight-150,overflow:"auto"}},p.a.createElement(Ye.a,{source:"\n## \u67e5\u770b\u8fdc\u7a0b\u6258\u7ba1\u7684\u4ed3\u5e93markdown\u6587\u6863\n\n\u6240\u6709\u6587\u4ef6\u5168\u90fd\u6258\u7ba1\u5728\u4f60\u81ea\u5df1\u7684\u8fdc\u7a0b\u4ed3\u5e93\u4e2d\uff0c\u4e14\u53ea\u9700\u8981\u63d0\u4f9b\u4e00\u4e2atoken\u5373\u53ef\n\n\u652f\u6301 \u7801\u4e91 \u548c GitHub \u4ed3\u5e93\n\n>\u6682\u65f6\u53ea\u652f\u6301markdown\u6587\u4ef6\n\n## \u5982\u4f55\u914d\u7f6e\n\n\u70b9\u51fb\u914d\u7f6e\u6309\u94ae\uff0c\u5f39\u6846\u4e2d\u586b\u5165\u76f8\u5e94\u9009\u9879\n\n| \u9009\u9879 | \u4f5c\u7528 |\n| --- | --- |\n| \u4ed3\u5e93\u7c7b\u578b   | \u60f3\u8981\u663e\u793a\u8fdc\u7a0b\u4ed3\u5e93\u7c7b\u578b\uff1a \u7801\u4e91\u6216GitHub |\n| \u4ed3\u5e93owner &nbsp; | \u4ee3\u7801\u4ed3\u5e93\u7684owner\u7528\u6237\u540d |\n| \u4ed3\u5e93\u540d\u79f0   | \u4ee3\u7801\u4ed3\u5e93\u7684\u540d\u79f0 |\n| token    | \u5230\u5bf9\u5e94\u5b98\u7f51\u4e0a\u751f\u6210\u7684\u7528\u6237\u4ee4\u724c\uff0c\u7528\u6765\u8bbf\u95ee\u53ca\u4fee\u6539\u6587\u4ef6 |\n\n\n\n## \u5982\u4f55\u751f\u6210token\n### \u7801\u4e91\n\n\u767b\u9646\u5230 [\u7801\u4e91](https://gitee.com) \u5b98\u7f51\u540e\n\n\n> \u8bbe\u7f6e --\x3e \u79c1\u4eba\u4ee4\u724c --\x3e \u751f\u6210\u79c1\u4eba\u4ee4\u724c\n\n\n### GItHub\n\u767b\u9646\u5230 [GitHub](https://github.com) \u5b98\u7f51\u540e\n\n>Setting --\x3e Developer Settings --\x3e Personal access tokens --\x3e Generate New Token\n\n## \u64cd\u4f5c\n* \u5728\u6811\u5f62\u8282\u70b9\u4e0a\u53f3\u952e\u53ef\u4ee5 \u65b0\u5efa\u3001\u5220\u9664\n* \u70b9\u51fb\u6811\u5f62\u8282\u70b9\u7684\u6587\u4ef6\u5bf9\u8c61\uff0c\u53f3\u8fb9\u663e\u793amarkdown\u7684\u5185\u5bb9\uff0c\u53f3\u4e0a\u89d2\u7684\u7f16\u8f91\u6309\u94ae\u53ef\u4ee5\u5bf9\u6587\u4ef6\u8fdb\u884c\u7f16\u8f91\n",escapeHtml:!0}))})},twoToneColor:"#106abd",style:{fontSize:"24px"}}))))),p.a.createElement(g.a,null,p.a.createElement(y.a,{offsetTop:64},p.a.createElement(g.a.Sider,{width:"300",style:{backgroundColor:"#fff",borderRight:"1px solid #d8d5d5",overflow:"auto",height:n,padding:"8px"}},p.a.createElement(Je,{store:W}))),p.a.createElement(g.a.Content,{style:{backgroundColor:"#fff",padding:"8px"}},p.a.createElement(et,{store:W}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));d.a.render(p.a.createElement(at,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[245,1,2]]]);