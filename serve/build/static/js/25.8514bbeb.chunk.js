(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{337:function(e,t,n){"use strict";n.d(t,"l",function(){return l}),n.d(t,"n",function(){return i}),n.d(t,"q",function(){return u}),n.d(t,"s",function(){return d}),n.d(t,"i",function(){return s}),n.d(t,"t",function(){return m}),n.d(t,"r",function(){return p}),n.d(t,"h",function(){return f}),n.d(t,"v",function(){return h}),n.d(t,"c",function(){return y}),n.d(t,"m",function(){return g}),n.d(t,"g",function(){return E}),n.d(t,"u",function(){return b}),n.d(t,"e",function(){return v}),n.d(t,"b",function(){return I}),n.d(t,"k",function(){return k}),n.d(t,"j",function(){return O}),n.d(t,"o",function(){return j}),n.d(t,"a",function(){return w}),n.d(t,"d",function(){return P}),n.d(t,"f",function(){return M}),n.d(t,"p",function(){return T});var a=n(338),r=n.n(a),o=n(339),c=n(71),l=function(){var e=Object(o.a)(r.a.mark(function e(t,n,a){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)({method:"post",url:"/audit/petList",data:{page:t,size:n,status:a}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t,n,a){return e.apply(this,arguments)}}(),i=function(e,t,n){return Object(c.a)({method:"post",url:"/audit/productList",data:{page:e,size:t,status:n}})},u=function(e,t,n){return Object(c.a)({method:"post",url:"/audit/serviceList",data:{page:e,size:t,status:n}})},d=function(e,t,n){return Object(c.a)({method:"post",url:"/audit/userList",data:{page:e,size:t,status:n}})},s=function(e,t,n){return Object(c.a)({method:"post",url:"/audit/companyList",data:{page:e,size:t,status:n}})},m=function(e,t){return Object(c.a)({method:"post",url:"/user/list",data:{page:e,size:t}})},p=function(e){return Object(c.a)({method:"post",url:"/user/search",data:{keyword:e}})},f=function(){return Object(c.a)({method:"get",url:"/round/list"})},h=function(e,t){return Object(c.a)({method:"post",url:"/round/add",data:{area:e[e.length-1],round:t}})},y=function(e){return Object(c.a)({method:"post",url:"/round/delete",data:{id:e}})},g=function(e,t){return Object(c.a)({method:"get",url:"/picture/list?current=".concat(e,"&limit=").concat(t)})},E=function(e,t){return Object(c.a)({method:"post",url:"/advertisement/list",data:{page:e,size:t}})},b=function(e,t,n,a,r,o,l,i){return Object(c.a)({method:"post",url:"/advertisement/add",data:{type:e,relateType:t,relateId:n,url:a,title:r,content:o,image:l,cityCode:i}})},v=function(e,t,n,a,r,o,l,i,u){return Object(c.a)({method:"post",url:"/advertisement/edit",data:{id:e,type:t,relateType:n,relateId:a,url:r,title:o,content:l,image:i,cityCode:u}})},I=function(e){return Object(c.a)({method:"post",url:"/advertisement/delete",data:{ids:e}})},k=function(e,t,n){return Object(c.a)({method:"post",url:"/personalRound/list",data:{type:e,page:t,size:n}})},O=function(e,t,n,a){return Object(c.a)({method:"post",url:"/inform/list",data:{type:e,page:t,size:n,relatedType:a}})},j=function(e,t){return Object(c.a)({method:"post",url:"/recommend/list",data:{page:e,size:t}})},w=function(e,t,n,a,r,o,l,i,u,d,s){return Object(c.a)({method:"post",url:"/recommend/add",data:{type:e,relateType:t,relateId:n,name:a,startTime:r,endTime:o,cityCode:l,deviceType:3,deviceName:"pc",deviceId:"pc",userId:i}})},P=function(e){return Object(c.a)({method:"post",url:"/recommend/delete",data:{ids:e}})},M=function(e,t,n,a,r,o,l,i,u,d,s,m){return Object(c.a)({method:"post",url:"/recommend/edit",data:{id:e,type:t,relateType:n,relateId:a,name:r,startTime:o,endTime:l,cityCode:i,deviceType:3,deviceName:"pc",deviceId:"pc",userId:u}})},T=function(e,t){return Object(c.a)({method:"post",url:"/recommend/relateTypeList",data:{type:e,userId:t}})}},348:function(e,t,n){"use strict";n.d(t,"a",function(){return d});var a=n(45),r=n(46),o=n(49),c=n(47),l=n(48),i=n(0),u=n(351),d=function(e){function t(){return Object(a.a)(this,t),Object(o.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=[{color:"#108ee9",content:"\u5f85\u5ba1\u6838"},{color:"#87d068",content:"\u5ba1\u6838\u901a\u8fc7"},{color:"#f50",content:"\u5ba1\u6838\u9a73\u56de"},{color:"#2db7f5",content:"\u5df2\u4e0b\u67b6"}];return i.createElement("div",null,i.createElement(u.a,{color:e[this.props.type].color},e[this.props.type].content))}}]),t}(i.Component)},354:function(e,t,n){"use strict";n.d(t,"a",function(){return f});var a=n(0),r=n(123),o=n(8),c=n(12);function l(e){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function u(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function d(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&(n[a[r]]=e[a[r]])}return n},f=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=d(this,s(t).apply(this,arguments))).saveTooltip=function(t){e.tooltip=t},e.renderPopover=function(t){var n=t.getPrefixCls,o=e.props,c=o.prefixCls,l=p(o,["prefixCls"]);delete l.title;var u=n("popover",c);return a.createElement(r.a,i({},l,{prefixCls:u,ref:e.saveTooltip,overlay:e.getOverlay(u)}))},e}var n,l,f;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,a["Component"]),n=t,(l=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"getOverlay",value:function(e){var t=this.props,n=t.title,r=t.content;return Object(c.a)(!("overlay"in this.props),"Popover","`overlay` is removed, please use `content` instead, see: https://u.ant.design/popover-content"),a.createElement("div",null,n&&a.createElement("div",{className:"".concat(e,"-title")},n),a.createElement("div",{className:"".concat(e,"-inner-content")},r))}},{key:"render",value:function(){return a.createElement(o.a,null,this.renderPopover)}}])&&u(n.prototype,l),f&&u(n,f),t}();f.defaultProps={placement:"top",transitionName:"zoom-big",trigger:"hover",mouseEnterDelay:.1,mouseLeaveDelay:.1,overlayStyle:{}}},500:function(e,t,n){var a=n(501);"string"===typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(72)(a,r);a.locals&&(e.exports=a.locals)},501:function(e,t,n){(e.exports=n(61)(!1)).push([e.i,".ProductAuditMsgModal .ProductAuditMsgModalContent {\n  display: flex;\n  flex-wrap: wrap;\n}\n.ProductAuditMsgModal .ProductAuditMsgModalContent p {\n  width: 50%;\n}\n.ProductAuditMsgModal .ProductAuditMsgModalContent .imgWrap {\n  display: flex;\n  overflow-x: auto;\n  margin: 21px 0;\n}\n.ProductAuditMsgModal .ProductAuditMsgModalContent .imgWrap div {\n  width: 20%;\n  margin: 0 4px;\n  flex: none;\n}\n.ProductAuditMsgModal .ProductAuditMsgModalContent .imgWrap div img {\n  width: 100%;\n}\n.ProductAuditMsgModal .ProductAuditMsgModalContent .ant-table-wrapper {\n  width: 100%;\n  margin-bottom: 0.5rem;\n}\n",""])},549:function(e,t,n){"use strict";n.r(t);var a=n(45),r=n(46),o=n(49),c=n(47),l=n(122),i=n(48),u=n(0),d=n(540),s=n(335),m=n(70),p=n(351),f=n(352),h=n(538),y=n(71),g=n(525),E=n(329),b=n(354),v=n(388),I=n(22),k=(n(500),n(336)),O=n.n(k),j=g.a.TabPane,w=E.a.TextArea,P=["","\u5f85\u5ba1\u6838","\u5ba1\u6838\u901a\u8fc7","\u5ba1\u6838\u9a73\u56de"],M=function(e){return u.createElement("img",{src:e,alt:"",style:{width:260}})},T=function(e){function t(){var e,n;Object(a.a)(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(n=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={auditValue:n.props.audit,auditcontent:"",productAuthId:""},n.onChange=function(e){n.setState({auditValue:e.target.value})},n.submit=function(){Object(y.a)({method:"post",url:"/audit/product",data:{audit:n.state.auditValue,remark:n.state.auditcontent,productAuthId:n.props.productAuthId}}).then(function(e){e?(s.a.success("\u5ba1\u6838\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):s.a.error("\u5ba1\u6838\u5931\u8d25")})},n}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({auditValue:e.audit})}},{key:"render",value:function(){var e=this,t=this.props.data,n=t.images,a=t.productKind,r=t.productname,o=t.title,c=t.price,l=t.introduction,i=this.props.brandData,d=i.name,s=i.logoImg,p=this.props.merchantData,f=p.merchantName,y=p.merchantAddress,E=p.merchantBeginTime,k=p.merchantEndTime,T=p.merchantCity,C=p.merchantTel,x=p.merchantIcon,A=this.props.stockData,D=A.stockAttribute,S=A.stockPrice,N=A.stockNum,z=A.stockSalesVolume,K=n.map(function(e,t){return u.createElement("div",{key:t},u.createElement(b.a,{content:M(e.addr),placement:"top",trigger:"hover",autoAdjustOverflow:!1},u.createElement("img",{src:e.addr,alt:""})))}),Y=this.props.records.map(function(e){return{auditname:e.cadminId.name,status:P[e.status],audittime:e.ct?O()(parseInt(e.ct,10)).format("YYYY-MM-DD H:mm:ss"):"----",remark:e.remark}}),V=2===this.state.auditValue?u.createElement(w,{style:{marginBottom:10},placeholder:"\u9a73\u56de\u7406\u7531",rows:3,value:this.state.auditcontent,onChange:function(t){e.setState({auditcontent:t.target.value})}}):"";return u.createElement("div",null,u.createElement(m.a,{width:800,visible:this.props.visible,className:"ProductAuditMsgModal",onCancel:this.props.cancelModal,onOk:this.submit,footer:[u.createElement("div",{key:"audit",style:{textAlign:"left",margin:"10px 0"}},u.createElement(v.a.Group,{value:this.state.auditValue,buttonStyle:"solid",onChange:this.onChange.bind(this)},u.createElement(v.a.Button,{value:0},"\u5f85\u5ba1\u6838"),u.createElement(v.a.Button,{value:1},"\u5ba1\u6838\u901a\u8fc7"),u.createElement(v.a.Button,{value:2},"\u5ba1\u6838\u9a73\u56de"))),V,u.createElement(I.a,{key:"back",onClick:this.props.cancelModal},"\u53d6\u6d88"),u.createElement(I.a,{key:"submit",type:"primary",onClick:this.submit},"\u786e\u5b9a")]},u.createElement(g.a,{defaultActiveKey:"1",size:"large"},u.createElement(j,{tab:"\u5546\u54c1\u8be6\u60c5",key:"1"},u.createElement("div",{className:"ProductAuditMsgModalContent"},u.createElement("p",null,u.createElement("span",null,"\u5546\u54c1\u540d\u79f0\uff1a"),u.createElement("span",null,r)),u.createElement("p",null,u.createElement("span",null,"\u5546\u54c1\u6807\u9898\uff1a"),u.createElement("span",null,o)),u.createElement("p",null,u.createElement("span",null,"\u5546\u54c1\u7c7b\u522b\uff1a"),u.createElement("span",null,a)),u.createElement("p",null,u.createElement("span",null,"\u5546\u54c1\u4ef7\u683c\uff1a"),u.createElement("span",null,c)),u.createElement("p",null,u.createElement("span",null,"\u5546\u54c1\u91cd\u91cf\uff1a"),u.createElement("span",null,"100")),u.createElement("p",null,u.createElement("span",null,"\u5546\u54c1\u63cf\u8ff0\uff1a"),u.createElement("span",null,l)),u.createElement("p",null,u.createElement("span",null,"\u53d1\u5e03\u533a\u57df\uff1a"),u.createElement("span",null,"100")),u.createElement("p",null,u.createElement("span",null,"\u8054\u7cfb\u4eba\uff1a"),u.createElement("span",null,"100")),u.createElement("div",null,u.createElement("span",null,"\u5546\u54c1\u5934\u90e8\u7167\u7247"),u.createElement("div",{className:"imgWrap"},K),u.createElement("span",null,"\u5546\u54c1\u7167\u7247"),u.createElement("div",{className:"imgWrap"},K)))),u.createElement(j,{tab:"\u5546\u54c1\u54c1\u724c",key:"2"},u.createElement("div",{className:"ProductAuditMsgModalContent"},u.createElement("p",null,u.createElement("span",null,"\u54c1\u724c\u540d\uff1a"),u.createElement("span",null,d)),u.createElement("div",{style:{width:"100%"}},u.createElement("span",null,"\u54c1\u724clogo:"),u.createElement("div",{className:""},u.createElement(b.a,{content:M(s),placement:"right",trigger:"hover",autoAdjustOverflow:!1},u.createElement("img",{src:s,alt:"",style:{width:80,marginTop:20}})))))),u.createElement(j,{tab:"\u5e97\u94fa\u4fe1\u606f",key:"3"},u.createElement("div",{className:"ProductAuditMsgModalContent"},u.createElement("p",null,u.createElement("span",null,"\u5e97\u94fa\u540d\uff1a"),u.createElement("span",null,f)),u.createElement("p",null,u.createElement("span",null,"\u5e97\u94fa\u5730\u5740\uff1a"),u.createElement("span",null,T,"  ",y)),u.createElement("p",null,u.createElement("span",null,"\u5e97\u94fa\u7535\u8bdd\uff1a"),u.createElement("span",null,C)),u.createElement("p",null,u.createElement("span",null,"\u5e97\u94faicon\uff1a"),u.createElement("span",null,x)),u.createElement("p",null,u.createElement("span",null,"\u8425\u4e1a\u65f6\u95f4\uff1a"),u.createElement("span",null,E,"\u81f3",k)),u.createElement("div",{style:{width:"100%"}},u.createElement("span",null,"\u54c1\u724clogo:"),u.createElement("div",{className:""},u.createElement(b.a,{content:M(s),placement:"right",trigger:"hover",autoAdjustOverflow:!1},u.createElement("img",{src:s,alt:"",style:{width:80,marginTop:20}})))))),u.createElement(j,{tab:"\u5e93\u5b58\u4fe1\u606f",key:"4"},u.createElement("div",{className:"ProductAuditMsgModalContent"},u.createElement("p",null,u.createElement("span",null,"\u5e93\u5b58\u5c5e\u6027\uff1a"),u.createElement("span",null,D)),u.createElement("p",null,u.createElement("span",null,"\u5e93\u5b58\u91cf\uff1a"),u.createElement("span",null,N)),u.createElement("p",null,u.createElement("span",null,"\u5e93\u5b58\u9500\u91cf\uff1a"),u.createElement("span",null,z)),u.createElement("p",null,u.createElement("span",null,"\u4ef7\u683c\uff1a"),u.createElement("span",null,S)))),u.createElement(j,{tab:"\u5ba1\u6838\u8bb0\u5f55",key:"6"},u.createElement(h.a,{columns:[{title:"\u5ba1\u6838\u4eba\u5458",dataIndex:"auditname",key:"auditname"},{title:"\u5ba1\u6838\u72b6\u6001",dataIndex:"status",key:"status"},{title:"\u5ba1\u6838\u65f6\u95f4",dataIndex:"audittime",key:"audittime"},{title:"\u5907\u6ce8",dataIndex:"remark",key:"remark"}],dataSource:Y,pagination:{pageSize:5},locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}})))))}}]),t}(u.Component),C=n(337),x=n(348);n.d(t,"default",function(){return D});var A=d.a.Paragraph,D=function(e){function t(){var e,n;Object(a.a)(this,t);for(var r=arguments.length,i=new Array(r),u=0;u<r;u++)i[u]=arguments[u];return(n=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).state={selectedRowKeys:[],loading:!1,filteredInfo:null,sortedInfo:{order:""},tableData:[],productAuthId:0,audit:0,productData:{order:"",productKind:"",productname:"",title:"",price:0,time:"",address:"",images:[],introduction:""},brandData:{name:"",logoImg:""},merchantData:{merchantName:"",merchantAddress:"",merchantTel:"",merchantIcon:"",merchantCity:"",merchantBeginTime:"",merchantEndTime:""},stockData:{stockAttribute:"",stockPrice:"",stockNum:0,stockSalesVolume:0},modalProductDetailShow:!1,records:[],total:0},n.getProductList=function(e,t,a){var r=Object(l.a)(n);Object(C.n)(e,t,a).then(function(e){if(e&&e.data&&e.data.length>0){var t=e.data.map(function(e,t){return{key:e.id,name:e.userid.nickname?e.userid.nickname:"----",publisher:e.userid.username?e.userid.username:"----",productKind:e.productId.typeId.name?e.productId.typeId.name:"----",price:e.productId.price?e.productId.price:"----",title:e.title?e.title:"----",productname:e.productId.name?e.productId.name:"----",status:e.audit,creatTime:e.ct?e.ct:"----",modifiedTime:e.mt?O()(parseInt(e.mt,10)).format("YYYY-MM-DD H:mm:ss"):"----",productId:e.productId.id}});r.setState({tableData:t,resTableData:e.data,total:e.total})}else r.setState({tableData:[],resTableData:[],total:0})})},n.onSelectChange=function(e){console.log("selectedRowKeys changed: ",e),n.setState({selectedRowKeys:e})},n.handleChange=function(e,t,a){n.props.history.push("/home/productAudit/".concat(e.current)),n.getProductList(e.current,e.pageSize,t.status?t.status:["0","1","2"]),console.log("Various parameters",e,t,a),n.setState({filteredInfo:t,sortedInfo:a})},n.modalProductDetail=function(e,t,a,r,o,c,l,i){Object(y.a)({method:"get",url:"/detail/product?id=".concat(t)}).then(function(t){console.log(t),t?n.setState({modalProductDetailShow:!0,productAuthId:e,audit:l,auditcontent:i,productData:{order:"string",productKind:a,productname:r,price:c,title:o,time:"string",address:"string",images:t.imgMsgs?t.imgMsgs:[],introduction:t.content?t.content:"----"},brandData:{name:t.brandId.name,logoImg:t.brandId.logoImg},merchantData:{merchantName:t.merchantId.name,merchantAddress:t.merchantId.address,merchantTel:t.merchantId.tel,merchantIcon:t.merchantId.icon,merchantCity:t.merchantId.city,merchantBeginTime:t.merchantId.beginTime,merchantEndTime:t.merchantId.endTime},stockData:{stockAttribute:t.stockId.attribute,stockPrice:t.stockId.price,stockNum:t.stockId.num,stockSalesVolume:t.stockId.salesVolume},records:t.records}):s.a.error("\u6570\u636e\u51fa\u9519\u4e86")})},n}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getProductList(1,10,["0","1","2"])}},{key:"render",value:function(){var e=this,t=this.state.selectedRowKeys,n=this.state,a=n.filteredInfo,r=n.sortedInfo;a=a||{};var o=[{title:"\u7528\u6237\u540d",dataIndex:"name",key:"name"},{title:"\u53d1\u5e03\u4eba",dataIndex:"publisher",key:"publisher"},{title:"\u5546\u54c1\u7c7b\u522b",dataIndex:"productKind",key:"productKind"},{title:"\u4ef7\u683c",dataIndex:"price",key:"price"},{title:"\u5546\u54c1\u6807\u9898",dataIndex:"title",key:"title",render:function(e,t){return u.createElement("div",{onClick:function(){m.a.success({title:"\u5546\u54c1\u6807\u9898",content:t.title,okText:"\u786e\u5b9a"})},style:{cursor:"pointer"}},u.createElement(A,{ellipsis:!0,style:{width:100}},t.title))}},{title:"\u5546\u54c1\u540d\u79f0",dataIndex:"productname",key:"productname"},{title:"\u72b6\u6001",dataIndex:"status",key:"status",filters:[{text:"\u5f85\u5ba1\u6838",value:"0"},{text:"\u5ba1\u6838\u901a\u8fc7",value:"1"},{text:"\u5ba1\u6838\u9a73\u56de",value:"2"}],render:function(e,t){return u.createElement(x.a,{type:t.status})}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"creatTime",key:"creatTime",render:function(e,t){return u.createElement("span",null,O()(parseInt(t.creatTime,10)).format("YYYY-MM-DD H:mm:ss"))},sorter:function(e,t){return parseInt(e.creatTime,10)-parseInt(t.creatTime,10)},sortOrder:(r=r||{}).order},{title:"\u6700\u540e\u4fee\u6539\u65f6\u95f4",dataIndex:"modifiedTime",key:"modifiedTime"},{title:"\u64cd\u4f5c",dataIndex:"operation",key:"operation",render:function(t,n){return u.createElement(p.a,{style:{textAlign:"center",cursor:"pointer"},color:"#2db7f5",onClick:function(){return e.modalProductDetail(n.key,n.productId,n.productKind,n.productname,n.title,n.price,n.status,n.auditcontent)}},"\u5ba1\u6838")}}],c={selectedRowKeys:t,onChange:this.onSelectChange},l=this.state,i=l.tableData,d=l.modalProductDetailShow,s=l.productData,y=l.brandData,g=l.merchantData,E=l.stockData,b=l.productAuthId,v=l.audit,I=l.records,k=l.total,j=this.props.match.params.page;return u.createElement("div",null,u.createElement(f.a,{style:{textAlign:"left",marginBottom:25}},u.createElement(f.a.Item,null,"\u5ba1\u6838"),u.createElement(f.a.Item,null,u.createElement("a",{href:""},"\u5546\u54c1\u5ba1\u6838"))),u.createElement(h.a,{rowSelection:c,columns:o,dataSource:i,pagination:{pageSize:10,total:k,defaultCurrent:parseInt(j,10)},onChange:this.handleChange,locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}}),u.createElement(T,{productAuthId:b,audit:v,records:I,data:s,brandData:y,merchantData:g,stockData:E,cancelModal:function(){return e.setState({modalProductDetailShow:!1})},visible:d}))}}]),t}(u.Component)}}]);
//# sourceMappingURL=25.8514bbeb.chunk.js.map