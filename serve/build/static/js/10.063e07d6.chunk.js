(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{481:function(e,t,a){"use strict";a.d(t,"a",function(){return l});var l=function(e,t){return 1===t?null:e.filter(function(e,t){return 1===e.level}).map(function(t,a){var l=e.filter(function(e,a){return t.id===e.pid}).map(function(e,t){return{value:e.id.toString(),label:e.name}});return{value:t.id.toString(),label:t.name,children:l}})}},493:function(e,t,a){var l=a(494);"string"===typeof l&&(l=[[e.i,l,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a(55)(l,n);l.locals&&(e.exports=l.locals)},494:function(e,t,a){(e.exports=a(50)(!1)).push([e.i,".Box {\n  margin: 20px 0;\n  vertical-align: inherit;\n  display: flex;\n  align-items: flex-start;\n}\n.Box .Dragger {\n  width: 70%;\n  display: inline-block;\n}\n",""])},527:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return K});var l=a(165),n=a(27),i=a(28),o=a(31),s=a(29),r=a(164),c=a(30),d=a(0),u=a(121),m=a(472),p=a(476),f=a(37),g=a(471),h=a(475),y=a(541),v=a(465),b=a(82),E=a(9),S=a(95),T=a(481),w=(a(493),a(21)),x=a(126),I=a(39),P=a.n(I),k=u.a.Group,C=m.a.Dragger,K=function(e){function t(){var e,a;Object(n.a)(this,t);for(var l=arguments.length,i=new Array(l),c=0;c<l;c++)i[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(i)))).state={files:[],updateId:1,selectedRowKeys:[],selectedPetKeys:[],selectedPetTypeKeys:[],loading:!1,filteredInfo:null,sortedInfo:"",visible:!1,editVisible:!1,value:2,imageUrl:"",defaultProductName:"",defalutSizeValue:6,editSizeVisible:!1,tableData:[],resTableData:[],resPetTypeTableData:[],showImage:!1,imageSrc:"",image:"",selectedPetOtherTypeKeys:[],pid:""},a.clearAll=function(){a.setState({files:[],updateId:1,selectedRowKeys:[],selectedPetKeys:[],selectedPetTypeKeys:[],loading:!1,filteredInfo:null,sortedInfo:"",visible:!1,editVisible:!1,value:2,imageUrl:"",defaultProductName:"",defalutSizeValue:6,editSizeVisible:!1,showImage:!1,imageSrc:"",image:"",selectedPetOtherTypeKeys:[],pid:""})},a.goodList=function(){var e=Object(r.a)(a);Object(w.a)({method:"get",url:"/good/list"}).then(function(t){if(t.goodList&&t.goodList.length>0){var a=t.goodList.map(function(e,a){var l="",n=!0,i=!1,o=void 0;try{for(var s,r=e.petTypeList[Symbol.iterator]();!(n=(s=r.next()).done);n=!0){var c=s.value;c&&(console.log(c.name),l+=" ".concat(c.name," "))}}catch(d){i=!0,o=d}finally{try{n||null==r.return||r.return()}finally{if(i)throw o}}return{key:e.id,name:e.name,image:e.img?e.img:"",kinds:"".concat(e.level,"\u7ea7\u5206\u7c7b"),size:3===e.level?t.goodList.filter(function(t){return t.id===e.pid})[0].name:"----",status:e.status?e.status:"----",creatTime:e.ct?P()(parseInt(e.ct,10)).format("YYYY-MM-DD H:mm:ss"):"----",modifiedTime:e.mt?P()(parseInt(e.mt,10)).format("YYYY-MM-DD H:mm:ss"):"----",petName:e.petTypeList.length>0?l:"----",operation:"",pid:e.pid,pettypeId:e.pettypeId}});e.setState({tableData:a,resTableData:t.goodList,resPetTypeTableData:t.petTypeList})}})},a.onSelectChange=function(e){a.setState({selectedRowKeys:e})},a.handleChange=function(e,t,l){console.log("Various parameters",e,t,l),a.setState({filteredInfo:t,sortedInfo:l})},a.handleDelete=function(e){console.log(e)},a.addGoodType=function(){a.showDrawer()},a.editGoodType=function(e){console.log(e),a.setState({editVisible:!0,editSizeVisible:"----"!==e.size,defaultProductName:e.name,updateId:e.key,value:"1\u7ea7\u5206\u7c7b"===e.kinds?1:2,selectedPetTypeKeys:e.pid<0?[]:[e.pettypeId.toString()],image:e.image,selectedPetKeys:[e.pid.toString()]})},a.showDrawer=function(){a.setState({visible:!0})},a.deleteGoodType=function(){var e=a.state.selectedRowKeys;Object(w.a)({method:"post",url:"/good/delete",data:{ids:e}}).then(function(e){e?(p.a.success("\u5220\u9664\u6210\u529f"),a.goodList(),a.clearAll()):p.a.error("\u5220\u9664\u5931\u8d25")})},a.submitGoodType=function(){var e=Object(r.a)(a),t=a.state,l=t.defaultProductName,n=t.selectedPetKeys,i=t.selectedPetTypeKeys,o=t.imageUrl,s=t.value,c=n[0]?a.state.selectedPetKeys[0]:-1,d="";i.forEach(function(e,t){t!==i.length-1?d+="".concat(e,","):d+="".concat(e)}),Object(w.a)({method:"post",url:"/good/add",data:{name:l,pid:c,pettypeId:d,img:o,level:s}}).then(function(t){t?(p.a.success("\u6dfb\u52a0\u6210\u529f"),e.goodList(),e.clearAll()):p.a.error("\u6dfb\u52a0\u5931\u8d25")})},a.editSubmitGoodType=function(){var e=a.state,t=e.defaultProductName,l=e.imageUrl,n=e.updateId,i=e.value,o=e.selectedPetKeys,s=e.selectedPetTypeKeys,r=e.image,c=o[0]?parseInt(a.state.selectedPetKeys[0],10):-1,d="";s.forEach(function(e,t){t!==s.length-1?d+="".concat(e,","):d+="".concat(e)}),Object(w.a)({method:"post",url:"/good/edit",data:{id:n,name:t,image:l||r,pid:c,pettypeId:d,level:i}}).then(function(e){e?(p.a.success("\u4fee\u6539\u6210\u529f"),a.goodList(),a.clearAll()):p.a.error("\u4fee\u6539\u5931\u8d25")})},a.handleUpload=function(e){var t=e.fileList,l=e.file,n=l.name,i=localStorage.getItem("adminId"),o=(new Date).getTime().toString();if(i)for(;i.length<36;)i+="x";else alert("\u8bf7\u91cd\u65b0\u767b\u9646");var s="".concat(i).concat(o,"ao12");t.map(function(e,t){e.name===n&&(e.name=s)}),console.log(t,l);var r=localStorage.getItem("uploadToken");r&&Object(x.b)(l,s,r,"ao");var c=Object(x.a)(t);a.setState({files:t,imageUrl:c})},a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.goodList()}},{key:"beforeUpload",value:function(e){var t=this.state.files;return this.setState({files:[].concat(Object(l.a)(t),[e])}),!1}},{key:"render",value:function(){var e,t=this,a=this.state,l=a.selectedRowKeys,n=a.editSizeVisible,i=a.defalutSizeValue,o=a.tableData,s=a.resPetTypeTableData,r=a.files,c=a.selectedPetTypeKeys,m=a.image,p=a.selectedPetKeys,w=this.state.filteredInfo,x=[{title:"\u5206\u7c7b\u540d",dataIndex:"name",key:"name"},{title:"\u56fe\u7247",dataIndex:"image",key:"image",render:function(e,a){return""!==a.image?a.image.split(",").map(function(e,a){return d.createElement("a",{href:"javascript:void(0);",key:a,onClick:function(){t.setState({showImage:!0,imageSrc:e})}},"\u70b9\u51fb\u67e5\u770b")}):d.createElement("span",null,"\u6682\u65e0")}},{title:"\u5546\u54c1\u79cd\u7c7b",dataIndex:"kinds",key:"kinds",filters:[{text:"1\u7ea7\u5206\u7c7b",value:"1"},{text:"2\u7ea7\u5206\u7c7b",value:"2"}],filteredValue:(w=w||{}).kinds||null,onFilter:function(e,t){return t.kinds.toString().includes(e)}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"creatTime",key:"creatTime"},{title:"\u6700\u540e\u4fee\u6539\u65f6\u95f4",dataIndex:"modifiedTime",key:"modifiedTime"},{title:"\u5546\u54c1\u79cd\u7c7b\u540d\u79f0",dataIndex:"petName",key:"petName"},{title:"\u64cd\u4f5c",dataIndex:"operation",key:"operation",render:function(e,a){return d.createElement("a",{href:"javascript:;",onClick:t.editGoodType.bind(t,a)},"\u7f16\u8f91")}}],I={selectedRowKeys:l,onChange:this.onSelectChange},P=l.length>0,K=[{label:"\u4e3b\u98df",value:"1"},{label:"\u96f6\u98df",value:"2"},{label:"\u4fdd\u5065",value:"3"},{label:"\u65e5\u7528",value:"4"}],D=[{label:"\u6c6a\u6c6a",value:"1"},{label:"\u55b5\u55b5",value:"2"},{label:"\u9e1f",value:"3"},{label:"\u9c7c",value:"4"},{label:"\u5c0f\u5ba0\u7269",value:"5"}],N=Object(T.a)(s,2);return d.createElement("div",null,d.createElement("div",{style:{marginBottom:16,textAlign:"left"}},d.createElement(f.a,{type:"primary",onClick:this.addGoodType.bind(this),style:{marginRight:20}},"\u6dfb\u52a0"),d.createElement(f.a,{type:"danger",disabled:!P,onClick:function(){t.deleteGoodType()}},"\u5220\u9664"),d.createElement("span",{style:{marginLeft:8}},P?"\u9009\u62e9\u4e86".concat(l.length,"\u9879"):"")),d.createElement("div",null,d.createElement(g.a,{rowSelection:I,columns:x,dataSource:o,pagination:{pageSize:10},onChange:this.handleChange,locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}})),d.createElement("div",null,d.createElement(h.a,{width:500,title:"\u6dfb\u52a0\u5546\u54c1\u7c7b\u578b",placement:"right",closable:!0,onClose:function(){t.setState({visible:!1,files:[]})},visible:this.state.visible},d.createElement(k,{onChange:function(e){t.setState({value:e.target.value})},value:this.state.value},d.createElement(u.a,{value:1},"\u6839\u76ee\u5f55"),d.createElement(u.a,{value:2},"\u5546\u54c1\u79cd\u7c7b")),d.createElement("div",{style:{margin:"20px 0"}},2===this.state.value?d.createElement("span",null,"\u5546\u54c1\u5c42\u7ea7\uff1a"):"",2===this.state.value?d.createElement(y.a,{style:{width:"70%"},options:K,onChange:function(e){return t.setState({selectedPetKeys:e})},placeholder:"\u9009\u62e9\u4e0a\u4e00\u5c42\u7ea7"}):""),d.createElement("div",null,d.createElement("span",null,"\u5546\u54c1\u5206\u7c7b\uff1a"),d.createElement(v.a,{style:{width:"70%"},placeholder:"\u8bf7\u8f93\u5165\u5206\u7c7b\u540d",onChange:function(e){t.setState({defaultProductName:e.target.value})}})),2===this.state.value?d.createElement("div",{style:{margin:"20px 0",display:"flex",alignItems:"center"}},d.createElement("span",null,"\u5ba0\u7269\u79cd\u7c7b\uff1a"),d.createElement(b.a.Group,{options:D,value:c,onChange:function(e){return t.setState({selectedPetTypeKeys:e})}}),d.createElement(y.a,{style:{width:"70%",display:"none"},options:N,onChange:function(e){return t.setState({selectedPetTypeKeys:e})},changeOnSelect:!0,placeholder:"\u9009\u62e9\u5ba0\u7269\u79cd\u7c7b"})):"",d.createElement("div",{className:"Box"},d.createElement("span",null,"\u5546\u54c1\u56fe\u7247\uff1a"),d.createElement(C,{className:"Dragger",fileList:r,beforeUpload:this.beforeUpload.bind(this),onChange:this.handleUpload},d.createElement("p",{className:"ant-upload-drag-icon"},d.createElement(E.a,{type:"inbox"})),d.createElement("p",{className:"ant-upload-hint"},"\u70b9\u51fb\u6216\u62d6\u62fd\u56fe\u7247\u81f3\u6b64\u5904"))),d.createElement("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},d.createElement(f.a,{onClick:function(){t.setState({visible:!1})},style:{marginRight:8}},"\u53d6\u6d88"),d.createElement(f.a,{onClick:function(){t.setState({visible:!0}),t.submitGoodType()},type:"primary"},"\u786e\u5b9a")))),d.createElement("div",null,d.createElement(h.a,{width:500,title:"\u7f16\u8f91\u5546\u54c1\u7c7b\u578b",placement:"right",closable:!0,onClose:this.clearAll,visible:this.state.editVisible},d.createElement(k,{onChange:function(e){t.setState({value:e.target.value})},value:this.state.value},d.createElement(u.a,{value:1},"\u6839\u76ee\u5f55"),d.createElement(u.a,{value:2},"\u5546\u54c1\u79cd\u7c7b")),d.createElement("div",{style:{margin:"20px 0"}},2===this.state.value?d.createElement("span",null,"\u5546\u54c1\u5c42\u7ea7\uff1a"):"",2===this.state.value?d.createElement(y.a,{style:{width:"70%"},value:p,options:K,onChange:function(e){return t.setState({selectedPetKeys:e})},placeholder:"\u9009\u62e9\u4e0a\u4e00\u5c42\u7ea7"}):""),d.createElement("div",null,d.createElement("span",null,"\u5546\u54c1\u5206\u7c7b\uff1a"),d.createElement(v.a,{style:{width:"70%"},placeholder:"\u8bf7\u8f93\u5165\u5206\u7c7b\u540d",onChange:function(e){t.setState({defaultProductName:e.target.value})},defaultValue:this.state.defaultProductName,value:this.state.defaultProductName})),2===this.state.value?d.createElement("div",{style:{margin:"20px 0",display:"flex",alignItems:"center"}},d.createElement("span",null,"\u5ba0\u7269\u79cd\u7c7b\uff1a"),d.createElement(b.a.Group,{options:D,value:c,onChange:function(e){return t.setState({selectedPetTypeKeys:e})}}),d.createElement(y.a,{style:{width:"70%",display:"none"},options:N,onChange:function(e){return t.setState({selectedPetTypeKeys:e})},changeOnSelect:!0,placeholder:"\u9009\u62e9\u5ba0\u7269\u79cd\u7c7b"})):"",d.createElement("div",{className:"Box"},d.createElement("span",null,"\u5546\u54c1\u56fe\u7247\uff1a"),d.createElement(C,{className:"Dragger",fileList:r,beforeUpload:this.beforeUpload.bind(this),onChange:this.handleUpload},d.createElement("p",{className:"ant-upload-drag-icon"},d.createElement(E.a,{type:"inbox"})),d.createElement("p",{className:"ant-upload-hint"},"\u70b9\u51fb\u6216\u62d6\u62fd\u56fe\u7247\u81f3\u6b64\u5904"))),m?d.createElement("div",null,d.createElement("img",{src:m,alt:"",style:{width:"70%",marginLeft:"16%"}})):"",n?d.createElement("div",null,d.createElement("span",null,"\u4f53\u578b\uff1a"),d.createElement(k,{onChange:function(e){t.setState({defalutSizeValue:e.target.value})},value:i},d.createElement(u.a,{value:6},"\u5927\u578b\u72ac"),d.createElement(u.a,{value:7},"\u4e2d\u578b\u72ac"),d.createElement(u.a,{value:8},"\u5c0f\u578b\u72ac"))):"",d.createElement("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},d.createElement(f.a,{onClick:function(){t.setState({editVisible:!1})},style:{marginRight:8}},"\u53d6\u6d88"),d.createElement(f.a,{onClick:function(){t.editSubmitGoodType()},type:"primary"},"\u786e\u8ba4"))),d.createElement(S.a,{visible:this.state.showImage,onCancel:function(){return t.setState({showImage:!1})},footer:null,destroyOnClose:!0},(e=this.state.imageSrc,d.createElement("img",{src:e,alt:"",style:{width:"100%"}})))))}}]),t}(d.Component)}}]);
//# sourceMappingURL=10.063e07d6.chunk.js.map