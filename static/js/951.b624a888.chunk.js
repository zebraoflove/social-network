"use strict";(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[951],{4951:(e,s,r)=>{r.r(s),r.d(s,{default:()=>f});var t=r(5043),o=r(6051),a=r(5030),l=r(8271),n=r(4394),c=r(3003),i=r(7097);const h=e=>e.chat.messages,d=e=>e.chat.status;var u=r(5558),x=r(579);const j=()=>{const e=(0,c.d4)(d),s=(0,c.wA)();return(0,t.useEffect)((()=>(s((0,i._E)()),()=>{s((0,i.Ui)())})),[]),(0,x.jsxs)("div",{children:["error"===e&&(0,x.jsx)("div",{children:"Chat error. Refresh page."}),(0,x.jsx)(v,{}),(0,x.jsx)(m,{})]})},g=t.memo((e=>{let{message:s}=e;return console.log(">>>>>>>>Message"),(0,x.jsxs)("div",{children:[(0,x.jsx)("img",{alt:"None ava",src:s.photo?s.photo:u,width:40}),(0,x.jsxs)("b",{children:[" ",s.userName]}),(0,x.jsx)("br",{}),s.message,(0,x.jsx)("hr",{})]})})),v=()=>{const e=(0,t.useRef)(null);let s=(0,c.d4)(h);const[r,o]=(0,t.useState)(!0);return(0,t.useEffect)((()=>{var s;r&&(null===(s=e.current)||void 0===s||s.scrollIntoView({behavior:"smooth"}))}),[s]),(0,x.jsxs)("div",{style:{height:"500px",overflowY:"auto"},onScroll:e=>{let s=e.currentTarget;Math.abs(s.scrollHeight-s.scrollTop-s.clientHeight)<50?!r&&o(!0):r&&o(!1)},children:[s.map(((e,s)=>(0,x.jsx)(g,{message:e},e.id))),(0,x.jsx)("div",{ref:e})]})},m=()=>{const e=(0,c.d4)(d),[s,r]=(0,t.useState)(""),h=(0,c.wA)();return(0,x.jsx)(o.A,{children:(0,x.jsxs)(o.A.Compact,{children:[(0,x.jsx)(a.A,{onChange:e=>{r(e.currentTarget.value)},placeholder:"Enter new message",value:s}),(0,x.jsx)(l.Ay,{disabled:"ready"!==e,onClick:()=>{s&&(h((0,i._z)(s)),r(""))},icon:(0,x.jsx)(n.A,{})})]})})},f=()=>(0,x.jsx)(j,{})}}]);
//# sourceMappingURL=951.b624a888.chunk.js.map