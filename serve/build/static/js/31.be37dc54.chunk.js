(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{504:function(e,t,a){var n=a(505);"string"===typeof n&&(n=[[e.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a(72)(n,i);n.locals&&(e.exports=n.locals)},505:function(e,t,a){(e.exports=a(61)(!1)).push([e.i,"",""])},548:function(e,t,a){"use strict";a.r(t);var n=a(45),i=a(46),l=a(49),o=a(47),r=a(122),s=a(48),d=a(0),c=a(407),u=a(329),m=a(335),p=a(22),h=a(538),f=a(543),b=a(330),g=(a(504),a(71)),y=function(e){function t(){var e,a;Object(n.a)(this,t);for(var i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(r)))).state={checkedList:[],indeterminate:!1,checkAll:!1,tableData:a.props.tableData},a.onChange=function(e,t){var n=a.state.tableData,i=t.map(function(t){return e.details.allOptions.filter(function(e){return e.id===t})[0]});n.map(function(t){t.key===e.key&&(t.details.options=i)}),a.props.editData(e.key,e.name,t),a.setState({tableData:n})},a.onCheckAllChange=function(e,t){var n=a.state.tableData;n.map(function(n){n.key===e.key&&(n.details.options=t.target.checked?n.details.allOptions:[],t.target.checked?a.props.editData(e.key,e.name,n.details.allOptions.map(function(e){return e.id})):a.props.editData(e.key,e.name,[]))}),a.setState({tableData:n})},a}return Object(s.a)(t,e),Object(i.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({tableData:e.tableData})}},{key:"render",value:function(){var e=this,t=[{title:"\u6a21\u5757\u540d",dataIndex:"name",key:"name"},{title:"\u5168\u9009",dataIndex:"all",key:"all",render:function(t,a){if(e.state.tableData.length>0){var n,i=e.state.tableData.find(function(e){return e.key===a.key}),l=!1;return i.details.allOptions.length===i.details.options.length?(n=void 0,l=!0):n=0!==i.details.options.length,d.createElement(b.a,{indeterminate:n,onChange:e.onCheckAllChange.bind(e,a),checked:l})}}},{title:"\u6743\u9650\u660e\u7ec6",dataIndex:"details",key:"details",render:function(t,a){var n=t.allOptions.map(function(e,t){return{label:e.authName,value:e.id}}),i=t.options.map(function(e,t){return e.id});return d.createElement("span",null,d.createElement(b.a.Group,{options:n,value:i,onChange:e.onChange.bind(e,a)}))}}];return d.createElement("div",null,d.createElement(h.a,{columns:t,dataSource:this.state.tableData,locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}}))}}]),t}(d.Component);a.d(t,"default",function(){return E});var v=c.a.Option,C=u.a.TextArea,E=function(e){function t(){var e,a;Object(n.a)(this,t);for(var i=arguments.length,s=new Array(i),d=0;d<i;d++)s[d]=arguments[d];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(s)))).state={files:[],updateId:1,selectedRowKeys:[],selectedPetKeys:[],selectedPetTypeKeys:[],loading:!1,filteredInfo:null,sortedInfo:"",visible:!1,apiVisible:!1,api:"",apiChildren:"",apiChildrenName:"",apiName:"",editVisible:!1,addVisible:!1,value:2,imageUrl:"",defaultRoleName:"",defalutSizeValue:6,editSizeVisible:!1,tableData:[],resTableData:[],resRoleTableData:[],showImage:!1,imageSrc:"",roleChildrenTableData:[],roleGroupId:1,submitMenu:[],menus:[],menuName:"",menuUrl:"",menuAddMenuChildren:[],menusList:[]},a.onSelectChange=function(e){a.setState({selectedRowKeys:e})},a.handleChange=function(e,t,n){console.log("Various parameters",e,t,n),a.setState({filteredInfo:t,sortedInfo:n})},a.handleDelete=function(e){console.log(e)},a.addRole=function(){var e=Object(r.a)(a);a.showDrawer(),Object(g.a)({method:"get",url:"/role/allmenus"}).then(function(t){var a=[];if(t){var n=t;for(var i in n)if(n.hasOwnProperty(i)){var l=n[i];a.push({key:i,name:l.menuName,details:{options:[],allOptions:l.allMenuChildren},menuChildrenIds:""})}e.setState({roleChildrenTableData:a})}})},a.addApi=function(){a.setState({apiVisible:!0})},a.setChildrenApis=function(e){a.setState({apiChildren:e})},a.setChildrenApiNames=function(e){a.setState({apiChildrenName:e})},a.addMenu=function(e){var t=Object(r.a)(a);Object(g.a)({method:"get",url:"/menu/list?roleGroupId=".concat(e.key)}).then(function(a){a&&t.setState({addVisible:!0,menus:a,roleGroupId:e.key})})},a.editRole=function(e){var t=Object(r.a)(a);Object(g.a)({method:"get",url:"/role/menus?id=".concat(e.key)}).then(function(a){if(a){var n=a.map(function(e,t){return{key:e.id,name:e.menuName,details:{options:e.menuChildren,allOptions:e.allMenuChildren},menuChildrenIds:e.menuIds}});t.setState({editVisible:!0,defaultRoleName:e.name,roleGroupId:e.key,roleChildrenTableData:n})}})},a.showDrawer=function(){a.setState({visible:!0})},a.deleteRole=function(){var e=a.state.selectedRowKeys;Object(g.a)({method:"post",url:"/role/delete",data:{ids:e}}).then(function(e){e?(m.a.success("\u5220\u9664\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):m.a.error("\u5220\u9664\u5931\u8d25")})},a.editSubmitRole=function(e,t,n){console.log(e,t,n);var i=a.state.submitMenu,l=i.map(function(a){return a.id===e?{id:e,name:t,ids:n}:a});i.find(function(t){return t.id===e})?a.setState({submitMenu:l}):(l.push({id:e,name:t,ids:n}),a.setState({submitMenu:l}))},a.editSubmitMenus=function(e){var t=a.state.roleChildrenTableData;e.map(function(e){t.map(function(a,n){e===a.key&&(t[n].details.options=t[n].details.allOptions)})}),a.setState({roleChildrenTableData:t})},a.submitRole=function(){Object(g.a)({method:"post",url:"/role/edit",data:{editArr:a.state.submitMenu}}).then(function(e){e?(m.a.success("\u4fee\u6539\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):m.a.error("\u4fee\u6539\u5931\u8d25")})},a.onMenuSelectChange=function(e,t){Object(g.a)({method:"get",url:"/menu/path?name=".concat(e)}).then(function(n){n&&a.setState({menusList:n,menuUrl:e,menuName:t.props.children})})},a.onCheckboxSelectChange=function(e){a.setState({menuAddMenuChildren:e})},a.sumitAddMenu=function(){var e=a.state,t=e.menuName,n=e.roleGroupId,i=e.menuUrl,l=e.menuAddMenuChildren;Object(g.a)({method:"post",url:"/menu/add",data:{roleGroupId:n,menuName:t,menuUrl:i,menuAddMenuChildren:l}}).then(function(e){e?(m.a.success("\u6dfb\u52a0\u6210\u529f"),setTimeout(function(){window.location.reload()},1e3)):m.a.error("\u6dfb\u52a0\u5931\u8d25")})},a.submitAddRole=function(){console.log(a.state),Object(g.a)({method:"post",url:"/role/add",data:{name:a.state.defaultRoleName,editArr:a.state.submitMenu}}).then(function(e){e?(m.a.success("\u6dfb\u52a0\u6210\u529f"),setTimeout(function(){window.location.reload()},1e3)):m.a.error("\u6dfb\u52a0\u5931\u8d25")})},a.submitAddApi=function(){var e=a.state.apiChildren.split(","),t=a.state.apiChildrenName.split(",");Object(g.a)({method:"post",url:"/menu/addApiAndChildren",data:{api:a.state.api,apiName:a.state.apiName,apiChildren:e,apiChildrenName:t}}).then(function(e){e?(m.a.success("\u6dfb\u52a0\u6210\u529f"),setTimeout(function(){window.location.reload()},1e3)):m.a.error("\u6dfb\u52a0\u5931\u8d25")})},a}return Object(s.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(g.a)({method:"get",url:"/role/list"}).then(function(t){if(t.length>0){var a=t.map(function(e,t){return{key:e.id,name:e.roleName}});e.setState({tableData:a,resTableData:t,resRoleTableData:t})}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedRowKeys,n=t.tableData,i=t.roleChildrenTableData,l=t.roleGroupId,o=t.menus,r=t.menusList,s=this.state.filteredInfo;s=s||{};var m=[{title:"\u89d2\u8272\u540d",dataIndex:"name",key:"name"},{title:"\u64cd\u4f5c",dataIndex:"operation",key:"operation",render:function(t,a){return d.createElement("span",null,d.createElement("a",{href:"javascript:;",onClick:e.editRole.bind(e,a),style:{marginRight:20}},"\u67e5\u770b\u5b50\u83dc\u5355\u6743\u9650"),d.createElement("a",{href:"javascript:;",onClick:e.addMenu.bind(e,a)},"\u6dfb\u52a0\u83dc\u5355\u6743\u9650"))}}],g={selectedRowKeys:a,onChange:this.onSelectChange},E=a.length>0,k=o.map(function(e,t){return d.createElement(v,{value:e.path,key:t},e.name)}),S=r.map(function(e,t){return{label:e.authName,value:e.id}});return d.createElement("div",null,d.createElement("div",{style:{marginBottom:16,textAlign:"left"}},d.createElement(p.a,{type:"primary",onClick:this.addRole.bind(this),style:{marginRight:20}},"\u6dfb\u52a0"),d.createElement(p.a,{type:"primary",onClick:this.addApi.bind(this),style:{marginRight:20}},"\u6dfb\u52a0api"),d.createElement(p.a,{type:"danger",disabled:!E,onClick:function(){e.deleteRole()}},"\u5220\u9664"),d.createElement("span",{style:{marginLeft:8}},E?"\u9009\u62e9\u4e86".concat(a.length,"\u9879"):"")),d.createElement("div",null,d.createElement(h.a,{rowSelection:g,columns:m,dataSource:n,pagination:{pageSize:10},onChange:this.handleChange,locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}})),d.createElement("div",null,d.createElement(f.a,{width:1e3,title:"\u6dfb\u52a0\u89d2\u8272",placement:"right",closable:!0,onClose:function(){e.setState({visible:!1,files:[]})},visible:this.state.visible},d.createElement("div",{style:{marginBottom:25}},d.createElement("span",null,"\u89d2\u8272\uff1a"),d.createElement(u.a,{style:{width:"70%"},placeholder:"\u8bf7\u8f93\u5165\u89d2\u8272\u540d",onChange:function(t){e.setState({defaultRoleName:t.target.value})}})),d.createElement(y,{tableData:i,roleGroupId:l,editData:this.editSubmitRole.bind(this),editSelectData:this.editSubmitMenus.bind(this)}),d.createElement("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},d.createElement(p.a,{onClick:function(){e.setState({visible:!1})},style:{marginRight:8}},"\u53d6\u6d88"),d.createElement(p.a,{onClick:function(){e.setState({visible:!0}),e.submitAddRole()},type:"primary"},"\u786e\u5b9a")))),d.createElement("div",null,d.createElement(f.a,{width:500,title:"\u6dfb\u52a0api",placement:"right",closable:!0,onClose:function(){e.setState({apiVisible:!1,files:[]})},visible:this.state.apiVisible},d.createElement("div",{style:{marginBottom:25}},d.createElement("span",null,"\u83dc\u5355api\uff1a"),d.createElement(u.a,{style:{width:"70%"},placeholder:"\u8bf7\u8f93\u5165api",onChange:function(t){e.setState({api:t.target.value})}})),d.createElement("div",{style:{marginBottom:25}},d.createElement("span",null,"api\u540d\u5b57\uff1a"),d.createElement(u.a,{style:{width:"70%"},placeholder:"\u8bf7\u8f93\u5165api\u5bf9\u5e94\u7684\u83dc\u5355\u540d \u6bd4\u5982\uff1a\u7528\u6237\u7ba1\u7406",onChange:function(t){e.setState({apiName:t.target.value})}})),d.createElement(C,{style:{margin:"10px 0"},placeholder:"list,add,edit (\u5fc5\u586b)",rows:3,onChange:function(t){e.setChildrenApis(t.target.value)}}),d.createElement(C,{style:{margin:"10px 0"},placeholder:"\u5708\u5b50\u5217\u8868,\u6dfb\u52a0\u5708\u5b50,\u7f16\u8f91\u5708\u5b50 (\u5fc5\u586b)",rows:3,onChange:function(t){e.setChildrenApiNames(t.target.value)}}),d.createElement("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},d.createElement(p.a,{onClick:function(){e.setState({apiVisible:!1})},style:{marginRight:8}},"\u53d6\u6d88"),d.createElement(p.a,{onClick:function(){e.setState({apiVisible:!0}),e.submitAddApi()},type:"primary"},"\u786e\u5b9a")))),d.createElement("div",null,d.createElement(f.a,{width:1e3,title:"\u7f16\u8f91\u7528\u6237\u6743\u9650",placement:"right",closable:!0,onClose:function(){e.setState({editVisible:!1,files:[]})},visible:this.state.editVisible},d.createElement("div",{style:{marginBottom:25}},d.createElement("span",null,"\u89d2\u8272\u540d\uff1a"),d.createElement(u.a,{style:{width:"70%"},placeholder:"\u8bf7\u8f93\u5165\u5206\u7c7b\u540d",onChange:function(t){e.setState({defaultRoleName:t.target.value})},defaultValue:this.state.defaultRoleName,value:this.state.defaultRoleName})),d.createElement(y,{tableData:i,roleGroupId:l,editData:this.editSubmitRole.bind(this),editSelectData:this.editSubmitMenus.bind(this)}),d.createElement("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},d.createElement(p.a,{onClick:function(){e.setState({editVisible:!1})},style:{marginRight:8}},"\u53d6\u6d88"),d.createElement(p.a,{onClick:function(){e.submitRole()},type:"primary"},"\u786e\u8ba4"))),d.createElement(f.a,{width:500,title:"\u6dfb\u52a0\u83dc\u5355\u6743\u9650",placement:"right",closable:!0,onClose:function(){e.setState({addVisible:!1})},visible:this.state.addVisible},d.createElement("div",{style:{marginBottom:25}},d.createElement("span",null,"\u83dc\u5355\u540d\uff1a"),d.createElement(c.a,{style:{width:320},onChange:this.onMenuSelectChange.bind(this)},k)),d.createElement("div",{style:{marginTop:25}},d.createElement("span",{style:{marginRight:8}},"\u5b50\u83dc\u5355: "),S.length>0?d.createElement(b.a.Group,{options:S,onChange:this.onCheckboxSelectChange.bind(this),style:{display:"block",marginTop:16}}):d.createElement("span",null,"\u8bf7\u5148\u9009\u62e9\u83dc\u5355")),d.createElement("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},d.createElement(p.a,{onClick:function(){e.setState({addVisible:!1})},style:{marginRight:8}},"\u53d6\u6d88"),d.createElement(p.a,{onClick:this.sumitAddMenu.bind(this),type:"primary"},"\u786e\u8ba4")))))}}]),t}(d.Component)}}]);
//# sourceMappingURL=31.be37dc54.chunk.js.map