(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{484:function(e,t,a){var n=a(485);"string"===typeof n&&(n=[[e.i,n,""]]);var l={hmr:!0,transform:void 0,insertInto:void 0};a(55)(n,l);n.locals&&(e.exports=n.locals)},485:function(e,t,a){(e.exports=a(50)(!1)).push([e.i,".cardMsgs {\n  display: flex;\n  flex-wrap: wrap;\n}\n.cardMsgs .photos {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n}\n.cardMsgs .photos p {\n  width: 30%;\n}\n.cardMsgs .msgs {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n}\n.cardMsgs .msgs p {\n  width: 50%;\n}\n",""])},536:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return k});var n=a(45),l=a(46),r=a(49),i=a(47),s=a(48),o=a(0),c=a(476),d=a(477),u=a(31),m=a(471),h=a(125),p=a(120),f=a(467),g=(a(484),a(37)),y=a.n(g),E=a(21),b=["\u666e\u901a\u7528\u6237","\u5546\u6237","\u4f01\u4e1a\u7528\u6237"],v=["\u5f85\u5ba1\u6838","\u5ba1\u6838\u901a\u8fc7","\u5ba1\u6838\u5931\u8d25"],w=function(e){return o.createElement("img",{src:e,alt:"",style:{width:"100%"}})},k=function(e){function t(){var e,a;Object(n.a)(this,t);for(var l=arguments.length,s=new Array(l),o=0;o<l;o++)s[o]=arguments[o];return(a=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(s)))).state={files:[],updateId:1,selectedRowKeys:[],selectedPetKeys:[],selectedPetTypeKeys:[],loading:!1,filteredInfo:null,sortedInfo:"",visible:!1,authentVisible:!1,cardVisible:!1,value:2,imageUrl:"",defaultProductName:"",defalutSizeValue:6,editSizeVisible:!1,tableData:[],resTableData:[],resPetTypeTableData:[],showImage:!1,imageSrc:"",selectedPetOtherTypeKeys:[],radioValue:"",userId:1,cardMsg:{frontPhoto:"",backPhoto:"",handPhoto:"",realName:"",cardNum:"",sex:"",nation:"",birthday:"",cardAddress:"",cityCode:"",signFrom:"",beginTime:"",endTime:""}},a.onSelectChange=function(e){a.setState({selectedRowKeys:e})},a.handleChange=function(e,t,n){console.log("Various parameters",e,t,n),a.setState({filteredInfo:t,sortedInfo:n})},a.handleDelete=function(e){console.log(e)},a.addGoodType=function(){a.showDrawer()},a.editAuthentCard=function(e){console.log(e),a.setState({cardVisible:!0,cardMsg:e})},a.editAuthentStatus=function(e){console.log("----"===e.size,e),a.setState({authentVisible:!0,updateId:e.key})},a.showDrawer=function(){a.setState({visible:!0})},a.deleteGoodType=function(){var e=a.state.selectedRowKeys;Object(E.a)({method:"post",url:"/good/delete",data:{ids:e}}).then(function(e){e.data?(c.a.success("\u5220\u9664\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):c.a.error("\u5220\u9664\u5931\u8d25")})},a.handleOk=function(){var e=a.state,t=e.radioValue,n=e.updateId;Object(E.a)({method:"post",url:"/user/status",data:{status:t,userId:n}}).then(function(e){e.data?(c.a.success("\u4fee\u6539\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):c.a.error("\u4fee\u6539\u5931\u8d25")})},a.handleCancel=function(){a.setState({authentVisible:!1})},a.handleCardOk=function(){a.setState({cardVisible:!1})},a.handleCardCancel=function(){a.setState({cardVisible:!1})},a.radioChange=function(e){console.log(e.target.value),a.setState({radioValue:e.target.value})},a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(E.a)({method:"get",url:"/user/authentlist"}).then(function(t){if(t.data.length>0){var a=t.data.map(function(e,t){return{key:e.id,userType:e.type?b[e.type]:b[0],userName:e.realName,icon:e.icon?e.icon:"----",status:e.status?v[e.status]:v[0],card:{frontPhoto:e.frontPhoto,backPhoto:e.backPhoto,handPhoto:e.handPhoto,realName:e.realName,cardNum:e.cardNum,sex:e.sex,nation:e.nation,birthday:e.birthday,cardAddress:e.cardAddress,cityCode:e.cityCode,signFrom:e.signFrom,beginTime:e.beginTime,endTime:e.endTime},authtime:e.authtime?y()(parseInt(e.authtime,10)).format("YYYY-MM-DD H:mm:ss"):"----",ct:e.ct?y()(parseInt(e.ct,10)).format("YYYY-MM-DD H:mm:ss"):"----",operation:""}});e.setState({tableData:a,resTableData:t.data.goodList})}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedRowKeys,n=t.tableData,l=t.cardMsg,r=this,i=this.state.filteredInfo;i=i||{};var s=[{title:"\u7528\u6237\u7c7b\u578b",dataIndex:"userType",key:"userType"},{title:"\u5ba1\u6838\u60c5\u51b5",dataIndex:"status",key:"status"},{title:"\u771f\u5b9e\u59d3\u540d",dataIndex:"userName",key:"userName"},{title:"\u5934\u50cf",dataIndex:"icon",key:"icon",render:function(e,t){return""!==t.icon?t.icon.split(",").map(function(e,t){return o.createElement("a",{href:"javascript:void(0);",key:t,onClick:function(){r.setState({showImage:!0,imageSrc:e})}},"\u70b9\u51fb\u67e5\u770b")}):o.createElement("span",null,"\u6682\u65e0")}},{title:"\u8ba4\u8bc1\u65f6\u95f4",dataIndex:"authtime",key:"authtime"},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"ct",key:"ct"},{title:"\u8eab\u4efd\u8bc1\u4fe1\u606f",dataIndex:"card",key:"card",render:function(t,a){return o.createElement("a",{href:"javascript:;",onClick:e.editAuthentCard.bind(e,a.card)},"\u8eab\u4efd\u8bc1\u4fe1\u606f")}},{title:"\u64cd\u4f5c",dataIndex:"operation",key:"operation",render:function(t,a){return o.createElement("a",{href:"javascript:;",onClick:e.editAuthentStatus.bind(e,a)},"\u5ba1\u6838")}}],c={selectedRowKeys:a,onChange:this.onSelectChange},g=a.length>0;return o.createElement("div",null,o.createElement(d.a,{style:{textAlign:"left",marginBottom:25}},o.createElement(d.a.Item,null,"\u7528\u6237\u7ba1\u7406"),o.createElement(d.a.Item,null,o.createElement("a",{href:""},"\u5ba1\u6838\u62a5\u8868"))),o.createElement("div",{style:{marginBottom:16,textAlign:"left"}},o.createElement(u.a,{type:"primary",onClick:this.addGoodType.bind(this),style:{marginRight:20}},"\u6dfb\u52a0"),o.createElement(u.a,{type:"danger",disabled:!g,onClick:function(){e.deleteGoodType()}},"\u5220\u9664"),o.createElement("span",{style:{marginLeft:8}},g?"\u9009\u62e9\u4e86".concat(a.length,"\u9879"):"")),o.createElement("div",null,o.createElement(m.a,{rowSelection:c,columns:s,dataSource:n,pagination:{pageSize:10},onChange:this.handleChange,locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}})),o.createElement(h.a,{visible:this.state.showImage,onCancel:function(){return e.setState({showImage:!1})},footer:null},w(this.state.imageSrc)),o.createElement(h.a,{title:"\u9009\u62e9\u89d2\u8272",visible:this.state.authentVisible,onOk:this.handleOk,onCancel:this.handleCancel,okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},o.createElement("div",null,o.createElement(p.a.Group,{defaultValue:"a",buttonStyle:"solid",onChange:this.radioChange.bind(this)},o.createElement(p.a.Button,{value:0},"\u5f85\u5ba1\u6838"),o.createElement(p.a.Button,{value:1},"\u5ba1\u6838\u901a\u8fc7"),o.createElement(p.a.Button,{value:2},"\u5ba1\u6838\u5931\u8d25")))),o.createElement(h.a,{title:"\u8eab\u4efd\u8bc1\u4fe1\u606f",width:600,visible:this.state.cardVisible,onOk:this.handleCardOk,onCancel:this.handleCardCancel,okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},o.createElement("div",{className:"cardMsgs"},o.createElement("div",{className:"msgs"},o.createElement("p",null,o.createElement("span",null,"\u8eab\u4efd\u8bc1\u53f7\uff1a"),o.createElement("span",null,l.cardNum)),o.createElement("p",null,o.createElement("span",null,"\u771f\u5b9e\u59d3\u540d\uff1a"),o.createElement("span",null,l.realName)),o.createElement("p",null,o.createElement("span",null,"\u6027\u522b\uff1a"),o.createElement("span",null,l.sex)),o.createElement("p",null,o.createElement("span",null,"\u6c11\u65cf\uff1a"),o.createElement("span",null,l.nation)),o.createElement("p",null,o.createElement("span",null,"\u751f\u65e5\uff1a"),o.createElement("span",null,l.birthday)),o.createElement("p",null,o.createElement("span",null,"\u8eab\u4efd\u8bc1\u5730\u5740\uff1a"),o.createElement("span",null,l.cardAddress)),o.createElement("p",null,o.createElement("span",null,"\u533a\u57df"),o.createElement("span",null,l.cityCode)),o.createElement("p",null,o.createElement("span",null,"\u8eab\u4efd\u8bc1\u7b7e\u53d1\u5730\uff1a"),o.createElement("span",null,l.signFrom))),o.createElement("div",{className:"photos"},o.createElement("p",null,o.createElement(f.a,{content:w(l.frontPhoto),placement:"right",trigger:"click",autoAdjustOverflow:!1,title:"\u6b63\u9762\u7167\u7247"},o.createElement("img",{src:l.frontPhoto,alt:"",style:{width:"100%"}}))),o.createElement("p",null,o.createElement(f.a,{content:w(l.backPhoto),placement:"right",trigger:"click",autoAdjustOverflow:!1,title:"\u53cd\u9762\u7167\u7247"},o.createElement("img",{src:l.backPhoto,alt:"",style:{width:"100%"}}))),o.createElement("p",null,o.createElement(f.a,{content:w(l.handPhoto),placement:"right",trigger:"click",autoAdjustOverflow:!1,title:"\u624b\u6301\u7167\u7247"},o.createElement("img",{src:l.handPhoto,alt:"",style:{width:"100%"}})))))))}}]),t}(o.Component)}}]);
//# sourceMappingURL=19.bf440015.chunk.js.map