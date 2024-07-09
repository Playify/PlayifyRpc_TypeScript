"use strict";var Ge=Object.create;var oe=Object.defineProperty;var qe=Object.getOwnPropertyDescriptor;var ze=Object.getOwnPropertyNames;var Ve=Object.getPrototypeOf,He=Object.prototype.hasOwnProperty;var o=(t,e)=>oe(t,"name",{value:e,configurable:!0});var Je=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of ze(e))!He.call(t,i)&&i!==r&&oe(t,i,{get:()=>e[i],enumerable:!(n=qe(e,i))||n.enumerable});return t};var Xe=(t,e,r)=>(r=t!=null?Ge(Ve(t)):{},Je(e||!t||!t.__esModule?oe(r,"default",{value:t,enumerable:!0}):r,t));Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const ce=[new Map,new Map];function A(t){return function(e){const[r,n]=ce;r.set(t,e),n.set(e,t)}}o(A,"RpcCustomError");var _e=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Qe(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}o(Qe,"getDefaultExportFromCjs");var Ne={exports:{}},ae={exports:{}},Re;function Ye(){return Re||(Re=1,function(t,e){(function(r,n){t.exports=n()})(_e,function(){function r(h){return!isNaN(parseFloat(h))&&isFinite(h)}o(r,"_isNumber");function n(h){return h.charAt(0).toUpperCase()+h.substring(1)}o(n,"_capitalize");function i(h){return function(){return this[h]}}o(i,"_getter");var s=["isConstructor","isEval","isNative","isToplevel"],a=["columnNumber","lineNumber"],l=["fileName","functionName","source"],c=["args"],y=["evalOrigin"],u=s.concat(a,l,c,y);function f(h){if(h)for(var p=0;p<u.length;p++)h[u[p]]!==void 0&&this["set"+n(u[p])](h[u[p]])}o(f,"StackFrame"),f.prototype={getArgs:function(){return this.args},setArgs:function(h){if(Object.prototype.toString.call(h)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=h},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(h){if(h instanceof f)this.evalOrigin=h;else if(h instanceof Object)this.evalOrigin=new f(h);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var h=this.getFileName()||"",p=this.getLineNumber()||"",_=this.getColumnNumber()||"",W=this.getFunctionName()||"";return this.getIsEval()?h?"[eval] ("+h+":"+p+":"+_+")":"[eval]:"+p+":"+_:W?W+" ("+h+":"+p+":"+_+")":h+":"+p+":"+_}},f.fromString=o(function(p){var _=p.indexOf("("),W=p.lastIndexOf(")"),je=p.substring(0,_),De=p.substring(_+1,W).split(","),be=p.substring(W+1);if(be.indexOf("@")===0)var se=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(be,""),Ue=se[1],Ke=se[2],We=se[3];return new f({functionName:je,args:De||void 0,fileName:Ue,lineNumber:Ke||void 0,columnNumber:We||void 0})},"StackFrame$$fromString");for(var g=0;g<s.length;g++)f.prototype["get"+n(s[g])]=i(s[g]),f.prototype["set"+n(s[g])]=function(h){return function(p){this[h]=!!p}}(s[g]);for(var d=0;d<a.length;d++)f.prototype["get"+n(a[d])]=i(a[d]),f.prototype["set"+n(a[d])]=function(h){return function(p){if(!r(p))throw new TypeError(h+" must be a Number");this[h]=Number(p)}}(a[d]);for(var w=0;w<l.length;w++)f.prototype["get"+n(l[w])]=i(l[w]),f.prototype["set"+n(l[w])]=function(h){return function(p){this[h]=String(p)}}(l[w]);return f})}(ae)),ae.exports}o(Ye,"requireStackframe");(function(t,e){(function(r,n){t.exports=n(Ye())})(_e,o(function(n){var i=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,a=/^(eval@)?(\[native code])?$/;return{parse:o(function(c){if(typeof c.stacktrace<"u"||typeof c["opera#sourceloc"]<"u")return this.parseOpera(c);if(c.stack&&c.stack.match(s))return this.parseV8OrIE(c);if(c.stack)return this.parseFFOrSafari(c);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:o(function(c){if(c.indexOf(":")===-1)return[c];var y=/(.+?)(?::(\d+))?(?::(\d+))?$/,u=y.exec(c.replace(/[()]/g,""));return[u[1],u[2]||void 0,u[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:o(function(c){var y=c.stack.split(`
`).filter(function(u){return!!u.match(s)},this);return y.map(function(u){u.indexOf("(eval ")>-1&&(u=u.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=u.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),g=f.match(/ (\(.+\)$)/);f=g?f.replace(g[0],""):f;var d=this.extractLocation(g?g[1]:f),w=g&&f||void 0,h=["eval","<anonymous>"].indexOf(d[0])>-1?void 0:d[0];return new n({functionName:w,fileName:h,lineNumber:d[1],columnNumber:d[2],source:u})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:o(function(c){var y=c.stack.split(`
`).filter(function(u){return!u.match(a)},this);return y.map(function(u){if(u.indexOf(" > eval")>-1&&(u=u.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),u.indexOf("@")===-1&&u.indexOf(":")===-1)return new n({functionName:u});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,g=u.match(f),d=g&&g[1]?g[1]:void 0,w=this.extractLocation(u.replace(f,""));return new n({functionName:d,fileName:w[0],lineNumber:w[1],columnNumber:w[2],source:u})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:o(function(c){return!c.stacktrace||c.message.indexOf(`
`)>-1&&c.message.split(`
`).length>c.stacktrace.split(`
`).length?this.parseOpera9(c):c.stack?this.parseOpera11(c):this.parseOpera10(c)},"ErrorStackParser$$parseOpera"),parseOpera9:o(function(c){for(var y=/Line (\d+).*script (?:in )?(\S+)/i,u=c.message.split(`
`),f=[],g=2,d=u.length;g<d;g+=2){var w=y.exec(u[g]);w&&f.push(new n({fileName:w[2],lineNumber:w[1],source:u[g]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:o(function(c){for(var y=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,u=c.stacktrace.split(`
`),f=[],g=0,d=u.length;g<d;g+=2){var w=y.exec(u[g]);w&&f.push(new n({functionName:w[3]||void 0,fileName:w[2],lineNumber:w[1],source:u[g]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:o(function(c){var y=c.stack.split(`
`).filter(function(u){return!!u.match(i)&&!u.match(/^Error created at/)},this);return y.map(function(u){var f=u.split("@"),g=this.extractLocation(f.pop()),d=f.shift()||"",w=d.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,h;d.match(/\(([^)]*)\)/)&&(h=d.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var p=h===void 0||h==="[arguments not available]"?void 0:h.split(",");return new n({functionName:w,args:p,fileName:g[0],lineNumber:g[1],columnNumber:g[2],source:u})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))})(Ne);var Ze=Ne.exports;const X=Qe(Ze);function le(t){return t.replaceAll("\r","").replaceAll(/^\n+|\n+$/g,"").replaceAll(/^  +/gm,"	")}o(le,"fixString");function Q(t){let e="";for(let r of t){if(r.functionName?.includes("$RPC_MARKER_BEGIN$"))break;e+=`
	at `+r}return e}o(Q,"framesToString");function Se(t){return t===void 0?"":t instanceof b?`
caused by: `+t.toString():t instanceof Error?`
caused by: `+le(t.toString())+Q(X.parse(t))+Se(t.cause):`
caused by: `+le(t?.toString()??"null")}o(Se,"causeToString");function Oe(t,e){return(t===b||Oe(t.__proto__,e))&&e[0].functionName?.replace(/^new /,"")===t.name?(e.shift(),!0):!1}o(Oe,"removeFromStackTrace");class b extends Error{static{o(this,"RpcError")}from;data={};#t=[];get stackTrace(){let e=this.#e;return e+=Q(this.#t),e+=this.#n,e.replaceAll(/^\n+/g,"")}#e="";#r=!1;#n="";constructor(...e){let r=null,n=null,i=null,s={},a;switch(e.length){case 1:[n]=e;break;case 2:[n,a]=e;break;case 4:[n,r,n,i]=e;break;case 5:e[4]instanceof b?[n,r,n,i,a]=e:[n,r,n,i,s]=e;break;case 6:[n,r,n,i,s,a]=e;break;default:throw new Error("Invalid arg count")}a!=null?super(n??void 0,{cause:a}):super(n??void 0),this.name=this.constructor.name,this.from=r??R.prettyName;const l=ce[1].get(this.constructor);if(l!=null&&(this.data.$type=l),Object.assign(this.data,s??{}),i==null)this.#r=!0,this.#t=X.parse(this),Oe(this.constructor,this.#t);else{this.#e=`
`+le(i);const c=this.#e.indexOf(`
caused by: `);c!=-1&&(this.#n+=this.#e.substring(c),this.#e=this.#e.substring(0,c))}this.#n+=Se(a),this.stack=this.toString()}toString(){let e=this.name+"("+this.from+")";this.message?.trim()&&(e+=": "+this.message);const r=this.stackTrace;return r?.trim()&&(e+=`
`+r),e}write(e){e.writeString(this.name),e.writeString(this.from),e.writeString(this.message),e.writeString(this.stackTrace),e.writeString(Object.keys(this.data).length==0?null:JSON.stringify(this.data))}static read(e){const r=e.readString(),n=e.readString()??"???",i=e.readString(),s=e.readString()??"";let a;try{a=JSON.parse(e.readString()??"null")}catch(l){if(l instanceof RangeError)a={$info:"JsonData was not included, due to an old PlayifyRpc version"};else throw l}return b.create(r,n,i,s,a)}static create(e,r,n,i,s){const a=s?.$type,l=ce[0].get(a)??b;return new l(e,r,n,i,s)}static wrapAndFreeze(e){return e instanceof b?(e.#r&&(e.#r=!1,e.#e+=Q(e.#t),e.#t=[],e.stack=e.toString()),e):new b(e.name,e instanceof b?e.from:null,e.message,Q(X.parse(e)).substring(1),{},e.cause)}unfreeze(e,r){return this.#r?this:(this.#r=!0,this.#t=X.parse(e).slice(r),this.stack=this.toString(),this)}trashLocalStack(){return this.#r=!1,this.#t=[],this.stack=this.toString(),this}append(e,r,n){return this.#e+=`
	rpc `+(n==null?"<<callLocal>>":(e??"<<null>>")+"."+(r??"<<null>>")+"("+n.map(i=>JSON.stringify(i)).join(",")+")"),this.stack=this.toString(),this}}const Fe=globalThis?.process?.versions?.node!=null,Ee="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",ue=o(()=>Date.now().toString(36)+Array(10).fill(void 0).map(()=>Ee[Math.floor(Math.random()*Ee.length)]).join(""),"randomId");let E;if(Fe)try{process?.versions.bun?E="bun@"+require("os").hostname()+"@"+process.pid:E="node@"+process.binding("os").getHostname()+"@"+process.pid}catch{E="node-alternative@"+process.platform+":"+process.arch+"@"+process.pid}else"document"in globalThis?E="web@"+document.location+"#"+ue():E="js@"+ue();var Te=Object.defineProperty,et=Object.getOwnPropertyDescriptor,tt=o((t,e,r)=>e in t?Te(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,"__defNormalProp"),z=o((t,e,r,n)=>{for(var i=n>1?void 0:n?et(e,r):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&Te(e,r,i),i},"__decorateClass"),te=o((t,e,r)=>(tt(t,typeof e!="symbol"?e+"":e,r),r),"__publicField");const G=o(t=>t==null?"null":'"'+t+'"',"quoted");class K extends b{static{o(this,"RpcCallError")}}exports.RpcTypeNotFoundError=class extends K{static{o(this,"RpcTypeNotFoundError")}};te(exports.RpcTypeNotFoundError,"new",t=>new exports.RpcTypeNotFoundError(null,null,`Type ${G(t)} does not exist`,"",{type:t}));exports.RpcTypeNotFoundError=z([A("$type")],exports.RpcTypeNotFoundError);exports.RpcMethodNotFoundError=class extends K{static{o(this,"RpcMethodNotFoundError")}};te(exports.RpcMethodNotFoundError,"new",(t,e)=>new exports.RpcMethodNotFoundError(null,null,`Method ${G(e)} does not exist on type ${G(t)}`,"",{type:t,method:e}));exports.RpcMethodNotFoundError=z([A("$method")],exports.RpcMethodNotFoundError);exports.RpcMetaMethodNotFoundError=class extends exports.RpcMethodNotFoundError{static{o(this,"RpcMetaMethodNotFoundError")}};te(exports.RpcMetaMethodNotFoundError,"new",(t,e)=>new exports.RpcMetaMethodNotFoundError(null,null,`Meta-Method ${G(e)} does not exist on type ${G(t)}`,"",{type:t,method:null,meta:e}));exports.RpcMetaMethodNotFoundError=z([A("$method-meta")],exports.RpcMetaMethodNotFoundError);exports.RpcConnectionError=class extends K{static{o(this,"RpcConnectionError")}};te(exports.RpcConnectionError,"new",t=>new exports.RpcConnectionError(null,null,t,""));exports.RpcConnectionError=z([A("$connection")],exports.RpcConnectionError);exports.RpcEvalError=class extends K{static{o(this,"RpcEvalError")}};exports.RpcEvalError=z([A("$eval")],exports.RpcEvalError);const pe=Object.create(null),C=new Map;C.set("$"+E,pe);async function rt(){return"$"+E+"$"+ue()}o(rt,"generateTypeName");async function Me(t,e){if(!C.has(t)){C.set(t,e);try{P&&await m(null,"+",t)}catch(r){console.warn(r),C.delete(t)}}}o(Me,"registerType");async function nt(t){if(C.has(t)){try{P&&await m(null,"-",t)}catch(e){console.warn(e)}C.delete(t)}}o(nt,"unregisterType");async function ve(t){const e=t[U];return e?await e.call(t):Object.getOwnPropertyNames(t).filter(r=>typeof t[r]=="function")}o(ve,"getMethods");async function Le(t,e,r,...n){if(r!=null){let s=t[r];if(s==null){let l=(await ve(t)).find(c=>c.toLowerCase()==r.toLowerCase());l!=null&&(s=t[l])}const a={}[r];if(s==null||s===a)throw exports.RpcMethodNotFoundError.new(e,r);try{return await{async $RPC_MARKER_BEGIN$(){return await s.call(t,...n)}}.$RPC_MARKER_BEGIN$()}catch(l){throw b.wrapAndFreeze(l)}}const i=n.length==0?null:n[0];switch(i){case"M":return ve(t);default:throw exports.RpcMetaMethodNotFoundError.new(e,i)}}o(Le,"invoke");class re{static{o(this,"PendingCall")}[Symbol.toStringTag]="PendingCall";finished=!1;promise;constructor(e,r){try{throw new Error}catch(n){this.promise=new Promise((i,s)=>{x.set(this,a=>{x.delete(this),v.delete(this),this.finished=!0,i(a),Z(r)}),v.set(this,a=>{x.delete(this),v.delete(this),this.finished=!0,s(a instanceof b?a.unfreeze(n,e):a),Z(r)})})}}catch(e){return this.promise.catch(e)}finally(e){return this.promise.finally(e)}then(e,r){return this.promise.then(e,r)}sendMessage(...e){return this}addMessageListener(e){return H(this,e)}cancel(){}getCaller(){return Promise.resolve(R.prettyName)}[Symbol.asyncIterator](){return V(this)}}function V(t){let e=[],r=[];return t.promise.catch(()=>{}),t.promise.finally(()=>{for(let n of r)n({done:!0,value:void 0})}),t.addMessageListener((...n)=>{(r.shift()??e.push)({done:!1,value:n})}),{async next(){return t.finished?{done:!0,value:void 0}:e.shift()??await new Promise(n=>r.push(n))}}}o(V,"getAsyncIterator");const x=new WeakMap,v=new WeakMap,L=new WeakMap,$=new WeakMap;function H(t,e){if($.has(t))$.get(t).push(e);else{$.set(t,[e]);const r=L.get(t)??[];for(let n of r)try{e(...n)}catch(i){console.warn("Error receiving pending: ",i)}}return t}o(H,"registerReceive");function D(t,e){if(!t.finished)if($.has(t))for(let r of $.get(t))try{r(...e)}catch(n){console.warn("Error receiving: ",n)}else L.has(t)?L.set(t,[...L.get(t),e]):L.set(t,[e])}o(D,"runReceiveMessage");let O=null;function it(t,e){const r=O;O=e;try{return t()}finally{O=r}}o(it,"runWithContext");function st(){if(O==null)throw new Error("FunctionCallContext not available");return O}o(st,"getFunctionContext");let ot=0;function m(t,e,...r){if(t!=null){const l=C.get(t);if(l)return xe(Le.bind(null,l,t,e,...r),t,e,r,3)}const n=[],i=new re(2,n),s=new T,a=ot++;try{s.writeByte(Y.FunctionCall),s.writeLength(a),s.writeString(t),s.writeString(e),s.writeArray(r,l=>s.writeDynamic(l,n))}catch(l){return v.get(i)?.(l),i}return P||t==null&&j!=null?(i.sendMessage=(...l)=>{if(i.finished)return i;const c=new T;c.writeByte(Y.MessageToExecutor),c.writeLength(a);const y=[];return c.writeArray(l,u=>c.writeDynamic(u,y)),n.push(...y),B(c),i},i.cancel=()=>{if(i.finished)return;const l=new T;l.writeByte(Y.FunctionCancel),l.writeLength(a),B(l)},i.getCaller=()=>m(null,"c",a),ut(a,i,s),i):(v.get(i)?.(exports.RpcConnectionError.new("Not connected")),i)}o(m,"callRemoteFunction");function at(t){return xe(t,null,null,null,3)}o(at,"callLocal");function xe(t,e,r,n,i){const s=new re(i,[]),a=new AbortController,l={type:e,method:r,sendMessage:(...c)=>(s.finished||D(s,c),l),get finished(){return s.finished},promise:s,addMessageListener:c=>H(l,c),cancelToken:a.signal,cancelSelf:()=>a.abort(),[Symbol.asyncIterator]:()=>V(l)};return s.sendMessage=(...c)=>(s.finished||D(l,c),s),s.cancel=()=>s.finished||l.cancelSelf(),$e(t,l,x.get(s),v.get(s),e,r,n),s}o(xe,"callLocalFunction");async function $e(t,e,r,n,i,s,a){try{let l;const c=O;O=e;try{l=await{async $RPC_MARKER_BEGIN$(){return await t()}}.$RPC_MARKER_BEGIN$()}finally{O=c}r?.(await l)}catch(l){n?.(b.wrapAndFreeze(l).append(i,s,a))}}o($e,"invokeForPromise");const N=class extends o(function(r){return Object.setPrototypeOf(r,new.target.prototype)},"Extendable"){static{o(this,"RpcFunction2")}constructor(e,r){super(m.bind(null,e,r)),this.type=e,this.method=r}toString(){return`rpc (...params) => ${this.type??"null"}.${this.method}(...params)`}};let ct=Date.now();const he=new WeakMap;function ne(t){if(t instanceof N)return t;const e=he.get(t);if(e!=null)return new N("$"+E,e);const r=(ct++).toString(16);pe[r]=t,he.set(t,r);const n="$"+E;return new N(n,r)}o(ne,"registerFunction");function ie(t){const e="$"+E;if(t.type!=e)throw new Error("Can't unregister RemoteFunction, that was not registered locally");delete pe[t.method],he.delete(t)}o(ie,"unregisterFunction");const F=Symbol("RpcObjectType"),q=Symbol("RpcObjectExists"),U=Symbol("RpcObjectGetMethods");function J(t,e=new class{static{o(this,"RpcObject")}[F]=t}){const r=new Map;return new Proxy(e,{get(n,i){if(i==F)return t;if(i==q)return()=>m(null,"E",t);if(i==U)return()=>m(t,null,"M");if(typeof i!="string"||i=="then")return e[i];if(r.has(i))return r.get(i);const s=new N(t,i);return r.set(i,s),s},construct(n,i){return new n(...i)},has(n,i){return i==F||i==U||i==q||i in e}})}o(J,"createRemoteObject");const we=new Proxy({},{get:(t,e)=>typeof e=="string"?J(e):void 0,has:(t,e)=>typeof e=="string"&&e!="then"}),Pe=[],Ae=new Map;function fe(t,e){let r=t.readLength();if(r<0){switch(r=-r,r%4){case 0:return e[r/4];case 1:return new TextDecoder().decode(t.readBuffer((r-1)/4));case 2:{const n={};e.push(n);for(let i=0;i<(r-2)/4;i++){const s=t.readString();n[s]=fe(t,e)}return n}case 3:{const n=new Array((r-3)/4);e.push(n);for(let i=0;i<n.length;i++)n[i]=fe(t,e);return n}}throw new Error("Unreachable code reached")}else if(r>=128){const n=new TextDecoder().decode(t.readBuffer(r-128)),i=Ae.get(n);if(i)return i(t,e);throw new Error("Unknown data type: "+n)}else switch(String.fromCodePoint(r)){case"n":return null;case"t":return!0;case"f":return!1;case"i":return t.readInt();case"d":return t.readDouble();case"l":return t.readLong();case"b":return t.readBuffer(t.readLength());case"D":return new Date(Number(t.readLong()));case"R":{const l=t.readString(),c=t.readByte();return new RegExp(l,"g"+(c&1?"i":"")+(c&2?"m":""))}case"E":return t.readError();case"O":const n=t.readString();if(n==null)throw new Error("Type can't be null");return J(n);case"F":const i=t.readString();if(i==null)throw new Error("Type can't be null");const s=t.readString();if(s==null)throw new Error("Method can't be null");const a=new N(i,s);return e.push(a),a;default:throw new Error("Unknown data type number: "+r)}}o(fe,"readDynamic");function ge(t,e,r){if(e==null)t.writeLength(110);else if(e===!0)t.writeLength(116);else if(e===!1)t.writeLength(102);else if(typeof e=="number"&&(e|0)===e)t.writeLength(105),t.writeInt(e);else if(typeof e=="number")t.writeLength(100),t.writeDouble(e);else if(typeof e=="bigint")t.writeLength(108),t.writeLong(e);else if(e instanceof Uint8Array)t.writeLength(98),t.writeLength(e.length),t.writeBuffer(e);else if(e instanceof Date)t.writeLength(68),t.writeLong(+e);else if(e instanceof RegExp){t.writeLength(82),t.writeString(e.source);const n=e.flags;t.writeByte((n.includes("i")?1:0)||(n.includes("m")?2:0))}else if(e instanceof Error)t.writeLength(69),t.writeError(e);else if(typeof e=="object"&&F in e)t.writeLength(79),t.writeString(e[F]);else if(typeof e=="function"){r.push(e),t.writeLength(70);let n;e instanceof N?n=e:(n=ne(e),ke.set(e,()=>ie(n))),t.writeString(n.type),t.writeString(n.method)}else if(r.includes(e))t.writeLength(-(r.indexOf(e)*4));else if(typeof e=="string"){const n=new TextEncoder().encode(e);t.writeLength(-(n.length*4+1)),t.writeBytes(n)}else if(Array.isArray(e)){r.push(e),t.writeLength(-(e.length*4+3));for(let n of e)ge(t,n,r)}else{for(let[n,i,s]of Pe){if(!i(e))continue;const a=new TextEncoder().encode(n);t.writeLength(a.length+128),t.writeBytes(a),s(t,e,r);return}if(typeof e=="object"){r.push(e);const n=Object.entries(e);t.writeLength(-(n.length*4+2));for(let[i,s]of n)t.writeString(i),ge(t,s,r)}else throw new Error("Unknown type for "+e)}}o(ge,"writeDynamic");const ke=new WeakMap;function Z(t){for(let e of t)ke.get(e)?.()}o(Z,"freeDynamic");class T{static{o(this,"DataOutput")}_buf;_data;_count=0;constructor(e=32){this._buf=typeof e=="number"?new Uint8Array(e):e,this._data=new DataView(this._buf.buffer)}ensureCapacity(e){if(e+=this._count,e>this._buf.byteLength){let r=new Uint8Array(Math.max(this._buf.byteLength*2,e));this._data=new DataView(r.buffer),r.set(this._buf),this._buf=r}}writeByte(e){this.ensureCapacity(1),this._buf[this._count]=e,this._count++}writeBytes(e){this.ensureCapacity(e.length),this._buf.set(e,this._count),this._count+=e.length}writeBuffer(e){this.writeBytes(e)}writeBoolean(e){this.writeByte(e?1:0)}writeNullBoolean(e){this.writeByte(e==null?2:e?1:0)}writeShort(e){this.ensureCapacity(2),this._data.setInt16(this._count,e),this._count+=2}writeChar(e){this.writeShort(e.charCodeAt(0))}writeInt(e){this.ensureCapacity(4),this._data.setInt32(this._count,e),this._count+=4}writeLong(e){typeof e=="number"?(this.writeInt(e/2**32),this.writeInt(e%2**32)):(this.writeInt(Number(e/BigInt(2**32))),this.writeInt(Number(e%BigInt(2**32))))}writeFloat(e){this.ensureCapacity(4),this._data.setFloat32(this._count,e),this._count+=4}writeDouble(e){this.ensureCapacity(8),this._data.setFloat64(this._count,e),this._count+=8}writeString(e){if(e==null){this.writeLength(-1);return}let r=new TextEncoder().encode(e);this.writeLength(r.length),this.writeBytes(r)}writeLength(e){let r=(e<0?~e:e)>>>0;for(;r>=128;)this.writeByte(r|128),r>>=7;e<0?(this.writeByte(r|128),this.writeByte(0)):this.writeByte(r)}writeByteArray(e){e?(this.writeLength(e.length),this.writeBytes(e)):this.writeLength(-1)}writeArray(e,r){if(!e)this.writeLength(-1);else{this.writeLength(e.length);for(let n=0;n<e.length;n++)r.call(this,e[n])}}toBuffer(e=0){return this._buf.slice(e,this._count-e)}writeError(e){try{throw b.wrapAndFreeze(e)}catch(r){r.write(this)}}writeDynamic(e,r=[]){ge(this,e,r)}}const S=new Map,k=new Map;function lt(t){for(let e of S.values())v.get(e)?.(t);S.clear();for(let e of k.values())e.cancelSelf()}o(lt,"disposeConnection");function B(t){if(j==null)throw exports.RpcConnectionError.new("Not connected");j.send(t.toBuffer())}o(B,"sendRaw");function ut(t,e,r){S.set(t,e);try{B(r)}catch(n){v.get(e)?.(n)}}o(ut,"sendCall");var Y=(t=>(t[t.FunctionCall=0]="FunctionCall",t[t.FunctionSuccess=1]="FunctionSuccess",t[t.FunctionError=2]="FunctionError",t[t.FunctionCancel=3]="FunctionCancel",t[t.MessageToExecutor=4]="MessageToExecutor",t[t.MessageToCaller=5]="MessageToCaller",t))(Y||{});async function ht(t){try{switch(t.readByte()){case 0:{const r=t.readLength(),n=[];let i=!1,s=null,a=null;const l=new Promise((c,y)=>{s=o(u=>{c(u),i=!0;const f=new T;f.writeByte(1),f.writeLength(r),f.writeDynamic(u),B(f),k.delete(r),Z(n)},"resolve"),a=o(u=>{y(u),i=!0;const f=new T;f.writeByte(2),f.writeLength(r),f.writeError(u),B(f),k.delete(r),Z(n)},"reject")});l.catch(()=>{});try{const c=t.readString();if(c==null)throw exports.RpcTypeNotFoundError.new(null);const y=C.get(c);if(!y)throw exports.RpcTypeNotFoundError.new(c);const u=t.readString(),f=t.readArray(()=>t.readDynamic(n))??[],g=new AbortController,d={type:c,method:u,get finished(){return i},promise:l,sendMessage(...w){if(i)return d;const h=new T;h.writeByte(5),h.writeLength(r);const p=[];return h.writeArray(w,_=>h.writeDynamic(_,p)),n.push(...p),B(h),d},addMessageListener(w){return H(d,w),d},cancelToken:g.signal,cancelSelf:()=>g.abort(),[Symbol.asyncIterator]:()=>V(d)};k.set(r,d),await $e(Le.bind(null,y,c,u,...f),d,s,a,c,u,f)}catch(c){a(c)}break}case 1:{const r=t.readLength(),n=S.get(r);if(n==null){console.warn(`${R.prettyName} has no activeRequest with id: ${r}`);break}try{x.get(n)?.(t.readDynamic())}catch(i){v.get(n)?.(i)}finally{S.delete(r)}break}case 2:{const r=t.readLength(),n=S.get(r);if(n==null){console.warn(`${R.prettyName} has no activeRequest with id: ${r}`);break}try{throw t.readError()}catch(i){v.get(n)?.(i)}finally{S.delete(r)}break}case 3:{const r=t.readLength();let n=k.get(r);if(!n){console.warn(`${R.prettyName} has no CurrentlyExecuting with id: ${r}`);break}n.cancelSelf();break}case 4:{const r=t.readLength();let n=k.get(r);if(!n){console.warn(`${R.prettyName} has no CurrentlyExecuting with id: ${r}`);break}const i=[],s=t.readArray(()=>t.readDynamic(i))??[];D(n,s);break}case 5:{const r=t.readLength();let n=S.get(r);if(!n){console.warn(`${R.prettyName} has no ActiveRequest with id: ${r}`);break}const i=[],s=t.readArray(()=>t.readDynamic(i))??[];D(n,s);break}}}catch(e){console.error(e)}}o(ht,"receiveRpc");class ye{static{o(this,"DataInput")}_buf;_data;_pos;_count;constructor(e,r=0,n=e.length){this._buf=e,this._data=new DataView(e.buffer),this._pos=r,this._count=r+n}readFully(e,r=0,n=e.length){let i=this._pos;if(this._count-i<n)throw new RangeError("not enough bytes available to use readFully");for(let a=r;a<r+n;a++)e[a]=this._buf[i++];this._pos=i}skip(e){let r=this.available();return e<r&&(r=e<0?0:e),this._pos+=r,r}available(){return this._count-this._pos}readAll(){return this._buf.slice(this._pos,this._pos=this._count)}readBuffer(e){if(e>this.available())throw new RangeError;return this._buf.slice(this._pos,this._pos+=e)}readByte(){return this._data.getUint8(this._pos++)}readBoolean(){return this.readByte()!=0}readNullBoolean(){const e=this.readByte();return e<2?e==1:null}readShort(){const e=this._data.getInt16(this._pos);return this._pos+=2,e}readUShort(){const e=this._data.getUint16(this._pos);return this._pos+=2,e}readChar(){return String.fromCharCode(this.readUShort())}readInt(){const e=this._data.getInt32(this._pos);return this._pos+=4,e}readLong(){return BigInt(this.readInt())*BigInt(2**32)+BigInt(this.readInt()>>>0)}readFloat(){const e=this._data.getFloat32(this._pos);return this._pos+=4,e}readDouble(){const e=this._data.getFloat64(this._pos);return this._pos+=8,e}readString(){let e=this.readLength();return e==-1?null:new TextDecoder().decode(this.readBuffer(e))}readLength(){let e=0,r=0;for(;;){const n=this.readByte();if(n==0)return r==0?0:~e;if(!(n&128))return e|=n<<r,e;e|=(n&127)<<r,r+=7}}readArray(e){const r=this.readLength();if(r==-1)return null;const n=[];for(let i=0;i<r;i++)n[i]=e.call(this);return n}readError(){return b.read(this)}readDynamic(e=[]){return fe(this,e)}}let P=!1,me,de,ee=new Promise((t,e)=>[me,de]=[t,e]);ee.catch(()=>{});async function ft(){for(;;)if(await ee.then(()=>!0,()=>!1))return}o(ft,"waitConnected");let I;if(Fe){const t="RPC_URL"in globalThis?globalThis.RPC_URL:process.env.RPC_URL,e="RPC_TOKEN"in globalThis?globalThis.RPC_TOKEN:process.env.RPC_TOKEN;t?I=o(async r=>{const n=new URL(t);return n.search=r.toString(),new(await import("ws")).WebSocket(n,e==null?{}:{headers:{Cookie:"RPC_TOKEN="+e}})},"createWebSocket"):(console.warn("RPC_URL is not defined => RPC will not connect"),I=o(async()=>({}),"createWebSocket"))}else if("document"in globalThis)I=o(async t=>new WebSocket("ws"+document.location.origin.substring(4)+"/rpc?"+t),"createWebSocket");else{const t="RPC_URL"in globalThis?globalThis.RPC_URL:process.env.RPC_URL,e="RPC_TOKEN"in globalThis?globalThis.RPC_TOKEN:process.env.RPC_TOKEN;t?I=o(async r=>{const n=new URL(t);return n.search=r.toString(),new WebSocket(n,e==null?{}:{headers:{Cookie:"RPC_TOKEN="+e}})},"createWebSocket"):(console.warn("RPC_URL is not defined => RPC will not connect"),I=o(async()=>({}),"createWebSocket"))}function Ce(t){const e=de;ee=new Promise((r,n)=>[me,de]=[r,n]),ee.catch(()=>{}),e(t),lt(t)}o(Ce,"closeRpc");let j=null;async function gt(t){let e=M,r=new Set;const n=new URLSearchParams;n.set("id",E),r.add("$"+E),e!=null&&n.set("name",e);for(let s of C.keys())r.has(s)||(r.add(s),n.append("type",s));const i=await I(n);i.onclose=()=>{setTimeout(t,1e3),j&&(j=null,P=!1,console.log("Reconnecting to RPC"),Ce(exports.RpcConnectionError.new("Connection closed by "+R.prettyName)))},i.onopen=async()=>{console.log("Connected to RPC");try{j=i;const s=new Set(C.keys()),a=new Set(r);for(let l of s)a.delete(l)&&s.delete(l);s.size||a.size?M!=e?await m(null,"H",M,[...s.keys()],[...a.keys()]):await m(null,"H",[...s.keys()],[...a.keys()]):M!=e&&await m(null,"H",M),P=!0,me()}catch(s){console.error("Error registering types: ",s),Ce(s),i?.close(4e3,"Error registering types");return}},i.binaryType="arraybuffer",i.onmessage=s=>{const a=s.data;typeof a=="string"?console.log(a):ht(new ye(new Uint8Array(a)))}}o(gt,"connectOnce");o(async function(){for(await Promise.resolve();;)await new Promise(e=>gt(e))},"connectLoop")();let M=null;async function dt(t){M=t;try{P&&await m(null,"N",t)}catch(e){console.error(e)}}o(dt,"setName");function Ie(t){return function(e){Pe.push([t,r=>r instanceof e,(r,n,i)=>n.write(r,i)]),Ae.set(t,(r,n)=>e.read(r,n))}}o(Ie,"CustomDynamicType");function Be(t){return function(e){Me(t??e.prototype.constructor.name,e).catch(console.error)}}o(Be,"RpcProvider");Promise.resolve().then(()=>pt).then(t=>Object.assign(globalThis,t));class R{static id=E;static get prettyName(){return R.name!=null?`${R.name} (${R.id})`:R.id}static get name(){return M}static setName=dt;static get isConnected(){return P}static get waitUntilConnected(){return ft()}static createObject=J;static createFunction=(e,r)=>new N(e,r);static registerFunction=ne;static unregisterFunction=ie;static callLocal=at;static callFunction=m;static getContext=st;static runWithContext=it;static registerType=Me;static unregisterType=nt;static generateTypeName=rt;static getObjectWithFallback=async(e,...r)=>await m("Rpc","getObjectWithFallback",e,...r);static checkTypes=async(...e)=>await m("Rpc","checkTypes",...e);static checkType=async e=>await m("Rpc","checkType",e);static getAllTypes=async()=>await m("Rpc","getAllTypes");static getAllConnections=async()=>await m("Rpc","getAllConnections");static getRegistrations=async(e=!1)=>await m("Rpc","getRegistrations",e);static evalObject=async e=>await m("Rpc","evalObject",e);static evalString=async e=>await m("Rpc","evalString",e);static listenCalls=()=>m("Rpc","listenCalls");static root=we;static type=F;static exists=q;static getMethods=U}const pt=Object.freeze(Object.defineProperty({__proto__:null,CustomDynamicType:Ie,DataInput:ye,DataOutput:T,PendingCall:re,RPC_ROOT:we,Rpc:R,RpcCallError:K,get RpcConnectionError(){return exports.RpcConnectionError},RpcCustomError:A,RpcError:b,get RpcEvalError(){return exports.RpcEvalError},RpcFunction:N,get RpcMetaMethodNotFoundError(){return exports.RpcMetaMethodNotFoundError},get RpcMethodNotFoundError(){return exports.RpcMethodNotFoundError},RpcObjectExists:q,RpcObjectGetMethods:U,RpcObjectType:F,RpcProvider:Be,get RpcTypeNotFoundError(){return exports.RpcTypeNotFoundError},createRemoteObject:J,getAsyncIterator:V,listenersMap:$,pendingMap:L,registerFunction:ne,registerReceive:H,rejectCall:v,resolveCall:x,runReceiveMessage:D,unregisterFunction:ie},Symbol.toStringTag,{value:"Module"}));exports.CustomDynamicType=Ie;exports.DataInput=ye;exports.DataOutput=T;exports.PendingCall=re;exports.RPC_ROOT=we;exports.Rpc=R;exports.RpcCallError=K;exports.RpcCustomError=A;exports.RpcError=b;exports.RpcFunction=N;exports.RpcObjectExists=q;exports.RpcObjectGetMethods=U;exports.RpcObjectType=F;exports.RpcProvider=Be;exports.createRemoteObject=J;exports.getAsyncIterator=V;exports.listenersMap=$;exports.pendingMap=L;exports.registerFunction=ne;exports.registerReceive=H;exports.rejectCall=v;exports.resolveCall=x;exports.runReceiveMessage=D;exports.unregisterFunction=ie;
//# sourceMappingURL=rpc.cjs.map