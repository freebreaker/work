(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{531:function(e,a,t){"use strict";t.r(a);var r=t(27),s=t(28),n=t(30),l=t(29),o=t(31),d=t(0),i=t(476),c=t(477),u=t(470),w=t(465),m=t(37),p=t(21);var f=function(e){function a(){var e,t;Object(r.a)(this,a);for(var s=arguments.length,o=new Array(s),d=0;d<s;d++)o[d]=arguments[d];return(t=Object(n.a)(this,(e=Object(l.a)(a)).call.apply(e,[this].concat(o)))).state={oldpassword:"",newpassword:"",newpassword2:""},t.handleSubmit=function(e){e.preventDefault(),t.props.form.validateFieldsAndScroll(function(e,a){e||(console.log("Received values of form: ",a),Object(p.a)({method:"post",url:"/adminusers/password",data:{oldpassword:a.oldpassword,newpassword:a.newpassword,newpassword2:a.newpassword2}}).then(function(e){e&&(localStorage.setItem("token",e.token),i.a.success(e.msg),setTimeout(function(){window.location.reload()},500))}))})},t.handleDifferPassword=function(e,a,r){var s=t.props.form.getFieldValue;a&&a===s("oldpassword")&&r("\u4e0d\u53ef\u4f7f\u7528\u65e7\u5bc6\u7801\uff01"),r()},t.handleConfirmPassword=function(e,a,r){var s=t.props.form.getFieldValue;a&&a!==s("newpassword")&&r("\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4\uff01"),r()},t}return Object(o.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e,a=this,t=this.props.form,r=t.getFieldDecorator,s=t.getFieldsError,n=this.state,l=n.oldpassword,o=n.newpassword,i=n.newpassword2;return d.createElement("div",null,d.createElement(c.a,{style:{textAlign:"left",marginBottom:25}},d.createElement(c.a.Item,null,"\u7528\u6237\u7ba1\u7406"),d.createElement(c.a.Item,null,d.createElement("a",{href:""},"\u4fee\u6539\u5bc6\u7801"))),d.createElement(u.a,Object.assign({},{labelCol:{span:2},wrapperCol:{span:4}},{onSubmit:this.handleSubmit}),d.createElement(u.a.Item,{label:"\u65e7\u5bc6\u7801",hasFeedback:!0},r("oldpassword",{initialValue:"",setFieldsValue:l,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u65e7\u5bc6\u7801!"}]})(d.createElement(w.a,{placeholder:"\u65e7\u5bc6\u7801",onChange:function(e){return a.setState({oldpassword:e.target.value})}}))),d.createElement(u.a.Item,{label:"\u65b0\u5bc6\u7801"},r("newpassword",{initialValue:"",setFieldsValue:o,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801!"},{validator:this.handleDifferPassword}]})(d.createElement(w.a.Password,{placeholder:"\u65b0\u5bc6\u7801",onChange:function(e){return a.setState({newpassword:e.target.value})}}))),d.createElement(u.a.Item,{label:"\u786e\u8ba4\u65b0\u5bc6\u7801"},r("newpassword2",{initialValue:"",setFieldsValue:i,rules:[{required:!0,message:"\u518d\u6b21\u8f93\u5165\u65b0\u5bc6\u7801!"},{validator:this.handleConfirmPassword}]})(d.createElement(w.a.Password,{placeholder:"\u518d\u6b21\u8f93\u5165\u65b0\u5bc6\u7801",onChange:function(e){return a.setState({newpassword2:e.target.value})}}))),d.createElement(u.a.Item,null,d.createElement(m.a,{type:"primary",block:!0,htmlType:"submit",className:"login-form-button",style:{marginLeft:"50%"},disabled:(e=s(),Object.keys(e).some(function(a){return e[a]}))},"\u4fee \u6539 \u5bc6 \u7801"))))}}]),a}(d.Component),h=u.a.create({name:"validate_other"})(f);a.default=h}}]);
//# sourceMappingURL=22.e301dc18.chunk.js.map