"use strict";var o=Object.defineProperty;var a=(i,t)=>o(i,"name",{value:t,configurable:!0});Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=a((i="http://127.0.0.1:4590",t=process.env.RPC_TOKEN)=>({name:"playify-rpc",transform(r,s,l){if(!l?.ssr)return;const e='import "/rpc.js"';if(r.includes(e))return{code:r.replaceAll(e,""),map:null}},config(r,s){const l=(r.build??={}).rollupOptions??={};let e=l.external;if(Array.isArray(e))e.push("/rpc.js");else if(typeof e=="function"){const p=e;e=a((u,...c)=>u=="/rpc.js"||p(u,...c),"external")}else e!=null?e=[e,"/rpc.js"]:e=["/rpc.js"];l.external=e,l.makeAbsoluteExternalsRelative=!1;const n=(r.ssr??={}).external??=[];if(n!=!0&&n.push("playify-rpc","/rpc.js"),((r.optimizeDeps??={}).exclude??=[]).push("playify-rpc","/rpc.js"),((r.server??={}).proxy??={})["/rpc"]??={target:i,changeOrigin:!0,ws:!0,prependPath:!1,headers:t==null?void 0:{Cookie:"RPC_TOKEN="+t}},s.command=="build"&&!(s.isSsrBuild||"ssrBuild"in s&&s.ssrBuild)){const p=(r.resolve??={}).alias??={};Array.isArray(p)?p.push({find:"playify-rpc",replacement:"/rpc.js"}):p["playify-rpc"]="/rpc.js"}}}),"playifyRpcPlugin");exports.playifyRpcPlugin=y;
//# sourceMappingURL=vite.cjs.map