(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{524:function(e,t,n){"use strict";n.r(t);n(175);var a=n(94),r=(n(237),n(185)),o=(n(523),n(522)),c=(n(102),n(8)),i=(n(144),n(39)),l=(n(235),n(177)),u=(n(52),n(18)),s=n(223),p=(n(109),n(46)),m=n(57),d=(n(176),n(79)),f=n(0),g=n(93),b=n(126),y=(n(244),n(224)),O=n(19),E=n(20),j=n(23),v=n(21),h=n(22),S=function(e){function t(){return Object(O.a)(this,t),Object(j.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(E.a)(t,[{key:"render",value:function(){var e=[{color:"#108ee9",content:"banner"},{color:"#87d068",content:"\u4e2d\u95f4"},{color:"#f50",content:"\u5e95\u90e8"}];return f.createElement("div",null,f.createElement(y.a,{color:e[this.props.type].color},e[this.props.type].content))}}]),t}(f.Component),w=d.a.Option,x=i.a.create({name:"coordinated"})(function(e){var t=Object(f.useState)([]),n=Object(m.a)(t,2),y=n[0],O=n[1],E=Object(f.useState)([]),j=Object(m.a)(E,2),v=j[0],h=j[1],x=Object(f.useState)(!1),k=Object(m.a)(x,2),C=k[0],F=k[1],I=Object(f.useState)(),D=Object(m.a)(I,2),T=D[0],R=D[1],A=Object(f.useState)(),L=Object(m.a)(A,2),V=L[0],N=(L[1],Object(f.useState)(!1)),q=Object(m.a)(N,2),B=q[0],J=q[1],M=Object(f.useState)(),U=Object(m.a)(M,2),z=U[0],K=U[1],P=Object(f.useState)(),G=Object(m.a)(P,2),H=G[0],Q=G[1],W=Object(f.useState)(!1),X=Object(m.a)(W,2),Y=X[0],Z=X[1],$=Object(f.useState)(),_=Object(m.a)($,2),ee=_[0],te=_[1];Object(f.useEffect)(function(){Object(g.i)().then(function(e){if(e){var t=e.map(function(e,t){return{key:e.id,page:e.page,position:e.type,imgSrc:e.imgSrc,cuser:e.cuser?e.cuser.name:"----"}});O(t)}})},[]);var ne=v.length>0,ae=[{title:"\u5bfc\u822a\u680f\u9875\u9762",dataIndex:"page",key:"page",filters:[{text:"\u7b2c1\u9875",value:"1"},{text:"\u7b2c2\u9875",value:"2"}],filterMultiple:!1,onFilter:function(e,t){return console.log(t,e),0===t.page.toString().indexOf(e)},render:function(e,t){return f.createElement("span",null,"\u7b2c".concat(t.page,"\u9875"))}},{title:"\u56fe\u7247\u4f4d\u7f6e",dataIndex:"position",key:"position",filters:[{text:"banner",value:"1"},{text:"\u4e2d\u95f4",value:"2"},{text:"\u5e95\u90e8",value:"3"}],filterMultiple:!1,onFilter:function(e,t){return console.log(t,e),0===t.position.toString().indexOf(e)},render:function(e,t){return f.createElement(S,{type:t.position-1})}},{title:"\u56fe\u7247",dataIndex:"imgSrc",key:"imgSrc",render:function(e,t){return f.createElement("img",{src:"/app/".concat(t.imgSrc),alt:"",style:{width:70,cursor:"pointer"},onClick:function(){te("/app/".concat(t.imgSrc)),Z(!0)}})}},{title:"\u64cd\u4f5c\u4eba",dataIndex:"cuser",key:"cuser"},{title:"\u64cd\u4f5c",render:function(t,n){return f.createElement("a",{onClick:function(){F(!0),J(!0),K(n.key),Q(n.imgSrc),e.form.setFieldsValue({page:n.page,type:n.position})}},"\u7f16\u8f91")}}],re={selectedRowKeys:v,onChange:function(e){h(e)}},oe={onRemove:function(e){var t=T.indexOf(e),n=T.slice();n.splice(t,1),R(n)},beforeUpload:function(e){return T?(R([].concat(Object(s.a)(T),[e])),!1):(R([].concat([e])),!1)}};return f.createElement("div",null,f.createElement("div",{style:{marginBottom:16,textAlign:"left"}},f.createElement(u.a,{type:"primary",onClick:function(){F(!0)},style:{marginRight:20}},"\u6dfb\u52a0"),f.createElement(u.a,{type:"danger",disabled:!ne,onClick:function(){Object(g.e)(v).then(function(e){e?(p.a.success("\u5220\u9664\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):p.a.error("\u5220\u9664\u5931\u8d25")})}},"\u5220\u9664"),f.createElement("span",{style:{marginLeft:8}},ne?"\u9009\u62e9\u4e86".concat(v.length,"\u9879"):"")),f.createElement(l.a,{rowSelection:re,columns:ae,dataSource:y,pagination:{pageSize:10},locale:{filterConfirm:"\u786e\u5b9a",filterReset:"\u91cd\u7f6e",emptyText:"\u6682\u65e0\u6570\u636e"}}),f.createElement(r.a,{width:500,title:B?"\u7f16\u8f91":"\u6dfb\u52a0",placement:"right",closable:!0,onClose:function(){F(!1),J(!1),K(void 0),Q(void 0),e.form.setFieldsValue({page:void 0,type:void 0})},visible:C},f.createElement(i.a,{labelCol:{span:5},wrapperCol:{span:17},onSubmit:function(t){t.preventDefault(),e.form.validateFields(function(e,t){if(!e){var n=new FormData;T&&T.forEach(function(e){n.append("files",e)}),n.append("page",t.page),n.append("type",t.type),n.append("title","title"),n.append("content","content"),B?(n.append("editId",z),n.append("imgSrc",H),Object(g.g)(n).then(function(e){e?(p.a.success("\u7f16\u8f91\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):p.a.error("\u7f16\u8f91\u5931\u8d25")})):Object(g.j)(n).then(function(e){e?(p.a.success("\u6dfb\u52a0\u6210\u529f"),setTimeout(function(){window.location.reload()},500)):p.a.error("\u6dfb\u52a0\u5931\u8d25")})}})}},f.createElement(i.a.Item,{label:"\u5bfc\u822a\u680f"},e.form.getFieldDecorator("page",{initialValue:V,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5bfc\u822a\u680f"}]})(f.createElement(d.a,{style:{width:320},onChange:function(){}},f.createElement(w,{value:1},"\u9996\u9875"),f.createElement(w,{value:2},"\u7b2c\u4e8c\u9875")))),f.createElement(i.a.Item,{label:"\u4f4d\u7f6e"},e.form.getFieldDecorator("type",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4f4d\u7f6e"}]})(f.createElement(d.a,{style:{width:320},onChange:function(){}},f.createElement(w,{value:1},"Banner"),f.createElement(w,{value:2},"\u4e2d\u95f4"),f.createElement(w,{value:3},"\u5e95\u90e8")))),f.createElement(i.a.Item,{label:"\u56fe\u7247"},e.form.getFieldDecorator("fileList",{valuePropName:"fileList",getValueFromEvent:function(e){return console.log("Upload event:",e),Array.isArray(e)?e:e&&e.fileList}})(f.createElement(o.a.Dragger,Object.assign({name:"files"},oe,{style:{width:320}}),f.createElement("p",{className:"ant-upload-drag-icon"},f.createElement(c.a,{type:"inbox"})),f.createElement("p",{className:"ant-upload-text"},"\u70b9\u51fb\u4e0a\u4f20")))),f.createElement("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},f.createElement(u.a,{onClick:function(){F(!1)},style:{marginRight:8}},"\u53d6\u6d88"),f.createElement(u.a,{type:"primary",htmlType:"submit",disabled:Object(b.a)(e.form.getFieldsError())},"\u786e\u8ba4")))),f.createElement(a.a,{visible:Y,onCancel:function(){return Z(!1)},footer:null,destroyOnClose:!0},f.createElement("img",{src:ee,alt:"",style:{width:"100%"}})))});t.default=x}}]);
//# sourceMappingURL=5.fd355437.chunk.js.map