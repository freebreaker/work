(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{478:function(e,t,a){"use strict";a.d(t,"a",function(){return u});var n=a(27),r=a(28),l=a(30),o=a(29),s=a(31),i=a(0),c=a(466),u=function(e){function t(){return Object(n.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=[{color:"#108ee9",content:"\u5f85\u5ba1\u6838"},{color:"#87d068",content:"\u5ba1\u6838\u901a\u8fc7"},{color:"#f50",content:"\u5ba1\u6838\u9a73\u56de"},{color:"#2db7f5",content:"\u5df2\u4e0b\u67b6"}];return i.createElement("div",null,i.createElement(c.a,{color:e[this.props.type].color},e[this.props.type].content))}}]),t}(i.Component)},520:function(e,t,a){var n=a(521);"string"===typeof n&&(n=[[e.i,n,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};a(55)(n,r);n.locals&&(e.exports=n.locals)},521:function(e,t,a){(e.exports=a(50)(!1)).push([e.i,".UserAuditMsgModal .UserAuditMsgModalContent {\n  display: flex;\n  flex-wrap: wrap;\n}\n.UserAuditMsgModal .UserAuditMsgModalContent p {\n  width: 50%;\n}\n.UserAuditMsgModal .UserAuditMsgModalContent .imgWrap {\n  display: flex;\n  overflow-x: auto;\n  margin: 21px 0;\n}\n.UserAuditMsgModal .UserAuditMsgModalContent .imgWrap div {\n  width: 32%;\n  margin: 0 4px;\n  flex: none;\n}\n.UserAuditMsgModal .UserAuditMsgModalContent .imgWrap div img {\n  width: 100%;\n}\n.UserAuditMsgModal .UserAuditMsgModalContent .ant-table-wrapper {\n  width: 100%;\n  margin-bottom: 0.5rem;\n}\n",""])},542:function(e,t,a){"use strict";a.r(t);var n=a(27),r=a(28),l=a(30),o=a(29),s=a(164),i=a(31),c=a(0),u=a(476),d=a(466),m=a(477),p=a(471),h=a(95),f=a(21),g=a(473),y=a(465),E=a(121),v=a(37),b=a(467),k=(a(520),a(39)),I=a.n(k),w=g.a.TabPane,M=["\u5f85\u5ba1\u6838","\u5ba1\u6838\u901a\u8fc7","\u5ba1\u6838\u9a73\u56de"],x=y.a.TextArea,A=function(e){return c.createElement("img",{src:e,alt:"",style:{width:260}})},C=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(o.a)(t).call(this,e))).onChange=function(e){a.setState({auditValue:e.target.value})},a.submit=function(){Object(f.a)({method:"post",url:"/audit/user",data:{audit:a.state.auditValue,UserAuthId:a.props.UserAuthId,remark:a.state.remark}}).then(function(e){e?(u.a.success("\u5ba1\u6838\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):u.a.error("\u5ba1\u6838\u5931\u8d25")})},a.state={auditValue:a.props.audit,remark:"",UserAuthId:""},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({auditValue:e.audit})}},{key:"render",value:function(){var e=this,t=this.props.data,a=t.realName,n=t.cardNum,r=t.frontPhoto,l=t.endPhoto,o=t.handPhoto,s=t.sex,i=t.nation,u=t.birthday,d=t.cardAddress,m=t.cityCode,f=t.cardFrom,y=this.props.records.map(function(e){return{auditname:e.cadminId.name,status:M[e.status],audittime:e.ct?I()(parseInt(e.ct,10)).format("YYYY-MM-DD H:mm:ss"):"----",remark:e.remark}}),k=2===this.state.auditValue?c.createElement(x,{style:{marginTop:10},placeholder:"\u9a73\u56de\u7406\u7531",rows:3,value:this.state.remark,onChange:function(t){e.setState({remark:t.target.value})}}):"";return c.createElement("div",null,c.createElement(h.a,{width:600,visible:this.props.visible,className:"UserAuditMsgModal",onCancel:this.props.cancelModal,onOk:this.submit,footer:[c.createElement("div",{key:"audit",style:{textAlign:"left",margin:"10px 0"}},c.createElement(E.a.Group,{value:this.state.auditValue,buttonStyle:"solid",onChange:this.onChange.bind(this)},c.createElement(E.a.Button,{value:0},"\u5f85\u5ba1\u6838"),c.createElement(E.a.Button,{value:1},"\u5ba1\u6838\u901a\u8fc7"),c.createElement(E.a.Button,{value:2},"\u5ba1\u6838\u9a73\u56de"))),k,c.createElement(v.a,{key:"back",onClick:this.props.cancelModal},"\u53d6\u6d88"),c.createElement(v.a,{key:"submit",type:"primary",onClick:this.submit},"\u786e\u5b9a")]},c.createElement(g.a,{defaultActiveKey:"1",size:"large"},c.createElement(w,{tab:"\u7528\u6237\u8be6\u60c5",key:"1"},c.createElement("div",{className:"UserAuditMsgModalContent"},c.createElement("p",null,c.createElement("span",null,"\u771f\u5b9e\u59d3\u540d\uff1a"),c.createElement("span",null,a)),c.createElement("p",null,c.createElement("span",null,"\u8eab\u4efd\u8bc1\u53f7\uff1a"),c.createElement("span",null,n)),c.createElement("p",null,c.createElement("span",null,"\u6027\u522b\uff1a"),c.createElement("span",null,0===s?"\u5973":"\u7537")),c.createElement("p",null,c.createElement("span",null,"\u6c11\u65cf\uff1a"),c.createElement("span",null,i)),c.createElement("p",null,c.createElement("span",null,"\u751f\u65e5\uff1a"),c.createElement("span",null,u)),c.createElement("p",null,c.createElement("span",null,"\u8eab\u4efd\u8bc1\u5730\u5740\uff1a"),c.createElement("span",null,d)),c.createElement("p",null,c.createElement("span",null,"\u533a\u57df"),c.createElement("span",null,m)),c.createElement("p",null,c.createElement("span",null,"\u8eab\u4efd\u8bc1\u7b7e\u53d1\u5730\uff1a"),c.createElement("span",null,f)),c.createElement("div",null,c.createElement("span",null,"\u8eab\u4efd\u8bc1\u7167\u7247"),c.createElement("div",{className:"imgWrap"},c.createElement("div",null,c.createElement(b.a,{content:A(r),placement:"top",trigger:"hover",autoAdjustOverflow:!1},c.createElement("img",{src:r,alt:""}))),c.createElement("div",null,c.createElement(b.a,{content:A(l),placement:"top",trigger:"hover",autoAdjustOverflow:!1},c.createElement("img",{src:l,alt:""}))),c.createElement("div",null,c.createElement(b.a,{content:A(o),placement:"top",trigger:"hover",autoAdjustOverflow:!1},c.createElement("img",{src:o,alt:""}))))))),c.createElement(w,{tab:"\u5ba1\u6838\u8bb0\u5f55",key:"3"},c.createElement(p.a,{columns:[{title:"\u5ba1\u6838\u4eba\u5458",dataIndex:"auditname",key:"auditname"},{title:"\u5ba1\u6838\u72b6\u6001",dataIndex:"status",key:"status"},{title:"\u5ba1\u6838\u65f6\u95f4",dataIndex:"audittime",key:"audittime"},{title:"\u5907\u6ce8",dataIndex:"remark",key:"remark"}],dataSource:y,pagination:{pageSize:5},locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}})))))}}]),t}(c.Component),U=a(478),S=a(45);a.d(t,"default",function(){return D});var O=["\u666e\u901a\u7528\u6237","\u5546\u6237","\u4f01\u4e1a\u7528\u6237"],D=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(i)))).state={files:[],updateId:1,selectedRowKeys:[],selectedPetKeys:[],selectedPetTypeKeys:[],loading:!1,filteredInfo:null,sortedInfo:{order:""},visible:!1,authentVisible:!1,cardVisible:!1,value:2,imageUrl:"",defaultProductName:"",defalutSizeValue:6,editSizeVisible:!1,tableData:[],resTableData:[],resPetTypeTableData:[],showImage:!1,imageSrc:"",selectedPetOtherTypeKeys:[],radioValue:"",userId:1,userData:{id:"",name:"CompanyName",realName:"res.realName",cardNum:"res.cardNum",sex:0,nation:"",birthday:"",cardAddress:"",cityCode:"",cardFrom:"",frontPhoto:"",endPhoto:"",handPhoto:""},modalUserDetailShow:!1,records:[],total:0},a.getUserList=function(e,t,n){var r=Object(s.a)(a);Object(S.m)(e,t,n).then(function(e){if(e&&e.data.length>0){var t=e.data.map(function(e,t){return{key:e.id,userType:e.type?O[e.type]:O[0],userName:e.realName,icon:e.userId.icon?e.userId.icon:"----",status:e.status,authtime:e.authtime?I()(parseInt(e.authtime,10)).format("YYYY-MM-DD H:mm:ss"):"----",creatTime:e.ct?e.ct:"----",operation:""}});r.setState({tableData:t,resTableData:e.goodList,total:e.total})}else r.setState({tableData:[],resTableData:e.goodList,total:e.total})})},a.onSelectChange=function(e){console.log("selectedRowKeys changed: ",e),a.setState({selectedRowKeys:e})},a.handleChange=function(e,t,n){console.log("Various parameters",e,t,n),a.props.history.push("/home/userAudit/".concat(e.current)),a.getUserList(e.current,e.pageSize,t.status&&t.status.length>0?t.status:["0","1","2"]),a.setState({filteredInfo:t,sortedInfo:n})},a.modalUserDetail=function(e,t,n){Object(f.a)({method:"get",url:"/detail/user?id=".concat(t)}).then(function(r){console.log(r),r?a.setState({modalUserDetailShow:!0,UserAuthId:t,audit:n,userData:{id:r.id,name:e,realName:r.realName,cardNum:r.cardNum,sex:r.sex,nation:r.nation,birthday:r.birthday,cardAddress:r.cardAddress,cityCode:r.citycode,cardFrom:r.signFrom,frontPhoto:r.frontPhoto,endPhoto:r.backPhoto,handPhoto:r.handPhoto},records:r.records}):u.a.error("\u6570\u636e\u51fa\u9519\u4e86")})},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.page;this.getUserList(e,10,["0","1","2"])}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedRowKeys,n=t.UserAuthId,r=t.audit,l=t.records,o=this.state,s=o.filteredInfo,i=o.sortedInfo;s=s||{};var u,f=this,g=[{title:"\u7528\u6237\u7c7b\u578b",dataIndex:"userType",key:"userType"},{title:"\u771f\u5b9e\u59d3\u540d",dataIndex:"userName",key:"userName"},{title:"\u5934\u50cf",dataIndex:"icon",key:"icon",render:function(e,t){return""!==t.icon?t.icon.split(",").map(function(e,t){return c.createElement("a",{href:"javascript:void(0);",key:t,onClick:function(){f.setState({showImage:!0,imageSrc:e})}},"\u70b9\u51fb\u67e5\u770b")}):c.createElement("span",null,"\u6682\u65e0")}},{title:"\u8ba4\u8bc1\u65f6\u95f4",dataIndex:"authtime",key:"authtime"},{title:"\u533a\u57df",dataIndex:"area",key:"area"},{title:"\u72b6\u6001",dataIndex:"status",key:"status",filters:[{text:"\u5f85\u5ba1\u6838",value:"0"},{text:"\u5ba1\u6838\u901a\u8fc7",value:"1"},{text:"\u5ba1\u6838\u9a73\u56de",value:"2"}],render:function(e,t){return c.createElement(U.a,{type:t.status})}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"creatTime",key:"creatTime",render:function(e,t){return c.createElement("span",null,I()(parseInt(t.creatTime,10)).format("YYYY-MM-DD H:mm:ss"))},sorter:function(e,t){return parseInt(e.creatTime,10)-parseInt(t.creatTime,10)},sortOrder:(i=i||{}).order},{title:"\u6700\u540e\u4fee\u6539\u65f6\u95f4",dataIndex:"modifiedTime",key:"modifiedTime"},{title:"\u64cd\u4f5c",dataIndex:"operation",key:"operation",render:function(t,a){return console.log(a),c.createElement(d.a,{style:{textAlign:"center",cursor:"pointer"},color:"#2db7f5",onClick:function(){return e.modalUserDetail(a.name,a.key,a.status)}},"\u5ba1\u6838")}}],y={selectedRowKeys:a,onChange:this.onSelectChange},E=this.state,v=E.tableData,b=E.modalUserDetailShow,k=E.userData,w=E.total,M=this.props.match.params.page;return c.createElement("div",null,c.createElement(m.a,{style:{textAlign:"left",marginBottom:25}},c.createElement(m.a.Item,null,"\u5ba1\u6838"),c.createElement(m.a.Item,null,c.createElement("a",{href:""},"\u7528\u6237\u5ba1\u6838"))),c.createElement(p.a,{rowSelection:y,columns:g,dataSource:v,pagination:{pageSize:10,total:w,defaultCurrent:parseInt(M,10)},onChange:this.handleChange,locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}}),c.createElement(C,{UserAuthId:n,audit:r,records:l,data:k,cancelModal:function(){return e.setState({modalUserDetailShow:!1})},visible:b}),c.createElement(h.a,{visible:this.state.showImage,onCancel:function(){return e.setState({showImage:!1})},footer:null},(u=this.state.imageSrc,c.createElement("img",{src:u,alt:"",style:{width:"100%"}}))))}}]),t}(c.Component)}}]);
//# sourceMappingURL=9.5a955146.chunk.js.map