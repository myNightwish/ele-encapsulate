import{f as v}from"./formConfig-BWFMGtM6.js";import{e as C,r,o as k,a as b,b as t,w as e,u as g,g as l,d,E as c}from"./index-C0stvuj4.js";const h={class:"ModalFormDemo"},F=d("div",{style:{color:"pink"}}," jpg/png files with a size less than 500KB. ",-1),M={class:"dialog-footer"},B={__name:"modalFormDemo",setup(y){const n=C(!1),m=()=>{n.value=!0},p=s=>{s.form.selfResetFilds()},_=s=>{s.form.validate()(o=>{o?c.success("验证成功"):c.error("验证成功")})};return(s,i)=>{const o=r("el-button"),f=r("MiModalForm");return k(),b("div",h,[t(f,{visible:n.value,"onUpdate:visible":i[0]||(i[0]=a=>n.value=a),title:"编辑用户",width:"50%",options:g(v)},{uploadArea:e(()=>[t(o,{type:"primary"},{default:e(()=>[l("点击上传")]),_:1})]),uploadTip:e(()=>[F]),footerContent:e(a=>[d("div",M,[t(o,{onClick:u=>p(a)},{default:e(()=>[l("取消")]),_:2},1032,["onClick"]),t(o,{type:"primary",onClick:u=>_(a)},{default:e(()=>[l(" 确认 ")]),_:2},1032,["onClick"])])]),_:1},8,["visible","options"]),t(o,{onClick:m},{default:e(()=>[l("打开弹窗")]),_:1})])}}};export{B as default};
