import{r as n,o as t,a as l,b as e,u as o,d as a}from"./index-C0stvuj4.js";const m=[{name:"导航 1",icon:"location",children:[{name:"导航 1-1",icon:"bell"},{name:"导航 1-2",icon:"location"}]},{name:"导航 2",icon:"setting",children:[{name:"导航 2-1",icon:"edit"},{name:"导航 2-2",icon:"magnet"}]},{name:"导航 2",icon:"menu",children:[{name:"导航 3-1",icon:"calendar"},{name:"导航 3-2",icon:"document"}]}],s=[{name:"导航 1",icon:"location",children:[{name:"导航 1-1",icon:"magnet"},{name:"导航 1-2",icon:"location"}]},{name:"导航 2",icon:"setting",children:[{name:"导航 2-1",icon:"setting",children:[{name:"导航 2-1-1",icon:"postcard"},{name:"导航 2-1-2",icon:"location"}]},{name:"导航 2-2",icon:"setting",children:[{name:"导航 2-2-1",icon:"list",children:[{name:"导航 2-2-1-1",icon:"bell"},{name:"导航 2-2-2-1",icon:"location",children:[{name:"导航 2-2-2-1-1",icon:"calendar"},{name:"导航 2-2-2-2-2",icon:"location"}]}]},{name:"导航 2-2-2",icon:"location"}]}]}],r={class:"menu-demo"},d=a("h2",null,"1、普通层级",-1),u=a("h2",null,"2、无限菜单",-1),g={__name:"menuDemo",setup(_){return(h,p)=>{const c=n("TemplateMenu"),i=n("InfiniteMenu");return t(),l("div",r,[d,e(c,{data:o(m),defaultActive:"2",router:!1},null,8,["data"]),u,e(i,{data:o(s),defaultActive:"2",router:!1},null,8,["data"])])}}};export{g as default};
