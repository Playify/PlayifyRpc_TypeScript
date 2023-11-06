const te = globalThis?.process?.versions?.node != null;
let d;
if (te)
  d = "node@" + (await import("os")).hostname() + "@" + process.pid;
else if ("document" in globalThis)
  d = "web@" + globalThis.document.location + "@" + Date.now().toString(36) + "X" + Math.random().toString(36).substring(2);
else
  throw new Error("Unknown Platform");
const J = /* @__PURE__ */ Object.create(null), C = /* @__PURE__ */ new Map();
C.set("$" + d, J);
async function ne(t, e) {
  if (!C.has(t) && (C.set(t, e), k))
    try {
      await w(null, "+", t);
    } catch (n) {
      console.log(n);
    }
}
async function ue(t) {
  if (C.has(t)) {
    if (k)
      try {
        await w(null, "-", t);
      } catch (e) {
        console.log(e);
      }
    C.delete(t);
  }
}
class X {
  [Symbol.toStringTag] = "PendingCall";
  finished = !1;
  promise;
  constructor() {
    this.promise = new Promise((e, n) => {
      S.set(this, (r) => {
        e(r), this.finished = !0;
      }), l.set(this, (r) => {
        n(r), this.finished = !0;
      });
    });
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  then(e, n) {
    return this.promise.then(e, n);
  }
  // noinspection JSUnusedLocalSymbols
  sendMessage(...e) {
    return this;
  }
  addMessageListener(e) {
    return $(this, e), this;
  }
  cancel() {
  }
  //overridden by callFunction and callLocal
  [Symbol.asyncIterator]() {
    return j(this);
  }
}
function j(t) {
  let e = [], n = [], r = t.finished;
  return t.promise.finally(() => {
    r = !0;
    for (let i of n)
      i(void 0);
  }), t.addMessageListener((...i) => e.push(i)), {
    async next() {
      if (r || t.finished)
        return { done: !0, value: void 0 };
      if (e.length)
        return { done: !1, value: e.shift() };
      const i = await new Promise((s) => n.push(s));
      return i == null ? { done: !0, value: void 0 } : { done: !1, value: i[0] };
    }
  };
}
const S = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new WeakMap();
function $(t, e) {
  if (v.has(t))
    v.get(t).push(e);
  else {
    v.set(t, [e]);
    const n = B.get(t) ?? [];
    for (let r of n)
      try {
        e(...r);
      } catch (i) {
        console.warn("Error receiving pending: ", i);
      }
  }
}
function A(t, e) {
  if (!t.finished)
    if (v.has(t))
      for (let n of v.get(t))
        try {
          n(...e);
        } catch (r) {
          console.warn("Error receiving: ", r);
        }
    else
      B.has(t) ? B.set(t, [...B.get(t), e]) : B.set(t, [e]);
}
let x = null;
function re(t, e) {
  const n = x;
  x = e;
  try {
    return t();
  } finally {
    x = n;
  }
}
function fe() {
  if (x == null)
    throw new Error("FunctionCallContext not available");
  return x;
}
let ge = 0;
function w(t, e, ...n) {
  if (t != null) {
    const c = C.get(t);
    if (c)
      return ie(t, e, () => c[e](...n));
  }
  const r = new X(), i = [];
  r.finally(() => {
  });
  const s = new _(), o = ge++;
  try {
    s.writeByte(M.FunctionCall), s.writeLength(o), s.writeString(t), s.writeString(e), s.writeArray(n, (c) => s.writeDynamic(c, i));
  } catch (c) {
    return l.get(r)?.(c), r;
  }
  return k || t == null && T != null ? (r.sendMessage = (...c) => {
    if (r.finished)
      return r;
    const a = new _();
    a.writeByte(M.MessageToExecutor), a.writeLength(o);
    const y = [];
    return a.writeArray(c, (h) => a.writeDynamic(h, i)), i.push(...y), R(a), r;
  }, r.cancel = () => {
    if (r.finished)
      return;
    const c = new _();
    c.writeByte(M.FunctionCancel), c.writeLength(o), R(c);
  }, be(o, r, s), r) : (l.get(r)?.(new Error("Not connected")), r);
}
function we(t) {
  return ie(null, null, t);
}
function ie(t, e, n) {
  const r = new X(), i = new AbortController(), s = {
    type: t,
    method: e,
    sendMessage: (...o) => (r.finished || A(r, o), s),
    get finished() {
      return r.finished;
    },
    promise: r,
    addMessageListener: (o) => ($(s, o), s),
    cancelToken: i.signal,
    cancel: () => i.abort(),
    [Symbol.asyncIterator]: () => j(s)
  };
  r.sendMessage = (...o) => (r.finished || A(s, o), r), r.cancel = () => r.finished || s.cancel();
  try {
    const o = re(n, s);
    o instanceof Promise ? o.then((c) => S.get(r)?.(c), (c) => l.get(r)?.(c)) : S.get(r)?.(o);
  } catch (o) {
    l.get(r)?.(o);
  }
  return r;
}
const m = class extends function(n) {
  return Object.setPrototypeOf(n, new.target.prototype);
} {
  constructor(e, n) {
    super(w.bind(null, e, n)), this.type = e, this.method = n;
  }
  toString() {
    return `rpc (...params) => ${this.type ?? "null"}.${this.method}(...params)`;
  }
};
let de = Date.now();
const W = /* @__PURE__ */ new WeakMap();
function G(t) {
  if (t instanceof m)
    return t;
  const e = W.get(t);
  if (e != null)
    return new m("$" + d, e);
  const n = (de++).toString(16);
  J[n] = t, W.set(t, n);
  const r = "$" + d;
  return new m(r, n);
}
function se(t) {
  const e = "$" + d;
  if (t.type != e)
    throw new Error("Can't unregister RemoteFunction, that was not registered locally");
  delete J[t.method], W.delete(t);
}
class I extends Error {
  name;
  from;
  stackTrace;
  constructor(e, n, r, i) {
    typeof i == "string" ? (super(r), this.stackTrace = i) : i ? (super(r, { cause: i }), this.stackTrace = this.stack.substring(this.stack.indexOf(`
`) + 1) + `
caused by: ` + i.stack) : (super(r), this.stackTrace = this.stack.substring(this.stack.indexOf(`
`) + 1)), this.name = e ?? "UnknownRemoteError", this.from = n, this.stack = this.name + "(" + n + ")", r != null && (this.stack += ": " + r), i != null && (this.stack += `
`, this.stackTrace = this.stackTrace.replaceAll(/^  +/gm, "	"), this.stack += this.stackTrace);
  }
}
const F = Symbol("RpcObjectType");
function U(t, e = new class {
  [F] = t;
}()) {
  const n = /* @__PURE__ */ new Map();
  return new Proxy(e, {
    get(r, i) {
      if (i == F)
        return t;
      if (typeof i != "string" || i == "then")
        return e[i];
      if (n.has(i))
        return n.get(i);
      const s = new m(
        t,
        i
      );
      return n.set(i, s), s;
    },
    construct(r, i) {
      return new r(...i);
    },
    has(r, i) {
      return i == F || i in e;
    }
  });
}
const oe = new Proxy({}, {
  get: (t, e) => typeof e == "string" ? U(e) : void 0,
  has: (t, e) => !(e in globalThis) && e != "then"
}), ce = [], ae = /* @__PURE__ */ new Map();
function P(t, e) {
  let n = t.readLength();
  if (n < 0) {
    switch (n = -n, n % 4) {
      case 0:
        return e[n / 4];
      case 1:
        return new TextDecoder().decode(t.readBuffer((n - 1) / 4));
      case 2: {
        const r = {};
        e.push(r);
        for (let i = 0; i < (n - 2) / 4; i++) {
          const s = t.readString();
          r[s] = P(t, e);
        }
        return r;
      }
      case 3: {
        const r = new Array((n - 3) / 4);
        e.push(r);
        for (let i = 0; i < r.length; i++)
          r[i] = P(t, e);
        return r;
      }
    }
    throw new Error("Unreachable code reached");
  } else if (n >= 128) {
    const r = new TextDecoder().decode(t.readBuffer(n - 128)), i = ae.get(r);
    if (i)
      return i(t, e);
    throw new Error("Unknown data type: " + r);
  } else
    switch (String.fromCodePoint(n)) {
      case "n":
        return null;
      case "t":
        return !0;
      case "f":
        return !1;
      case "i":
        return t.readInt();
      case "d":
        return t.readDouble();
      case "l":
        return t.readLong();
      case "b":
        return t.readBuffer(t.readLength());
      case "D":
        return new Date(Number(t.readLong()));
      case "R": {
        const r = t.readString(), i = t.readByte();
        return new RegExp(
          r,
          "g" + (i & 1 ? "i" : "") + (i & 2 ? "m" : "")
        );
      }
      case "E":
        return t.readError();
      case "O":
        return U(t.readString());
      case "F":
        return t.readFunction();
      default:
        throw new Error("Unknown data type number: " + n);
    }
}
function q(t, e, n) {
  if (e == null)
    t.writeLength("n".charCodeAt(0));
  else if (e === !0)
    t.writeLength("t".charCodeAt(0));
  else if (e === !1)
    t.writeLength("f".charCodeAt(0));
  else if (typeof e == "number" && (e | 0) === e)
    t.writeLength("i".charCodeAt(0)), t.writeInt(e);
  else if (typeof e == "number")
    t.writeLength("d".charCodeAt(0)), t.writeDouble(e);
  else if (typeof e == "bigint")
    t.writeLength("l".charCodeAt(0)), t.writeLong(e);
  else if (e instanceof Uint8Array)
    t.writeLength("b".charCodeAt(0)), t.writeLength(e.length), t.writeBuffer(e);
  else if (e instanceof Date)
    t.writeLength("D".charCodeAt(0)), t.writeLong(+e);
  else if (e instanceof RegExp) {
    t.writeLength("R".charCodeAt(0)), t.writeString(e.source);
    const r = e.flags;
    t.writeByte(
      (r.includes("i") ? 1 : 0) || (r.includes("m") ? 2 : 0)
    );
  } else if (e instanceof Error)
    t.writeLength("E".charCodeAt(0)), t.writeError(e);
  else if (typeof e == "object" && F in e)
    t.writeLength("O".charCodeAt(0)), t.writeString(e[F]);
  else if (typeof e == "function")
    t.writeLength("F".charCodeAt(0)), t.writeFunction(e);
  else if (n.includes(e))
    t.writeLength(-(n.indexOf(e) * 4));
  else if (typeof e == "string") {
    const r = new TextEncoder().encode(e);
    t.writeLength(-(r.length * 4 + 1)), t.writeBytes(r);
  } else if (Array.isArray(e)) {
    n.push(e), t.writeLength(-(e.length * 4 + 3));
    for (let r of e)
      q(t, r, n);
  } else {
    for (let [r, i, s] of ce) {
      if (!i(e))
        continue;
      const o = new TextEncoder().encode(r);
      t.writeLength(o.length + 128), t.writeBytes(o), s(t, e, n);
      return;
    }
    if (typeof e == "object") {
      n.push(e);
      const r = Object.entries(e);
      t.writeLength(-(r.length * 4 + 2));
      for (let [i, s] of r)
        t.writeString(i), q(t, s, n);
    } else
      throw new Error("Unknown type for " + e);
  }
}
class _ {
  _buf;
  _data;
  _count = 0;
  constructor(e = 32) {
    this._buf = typeof e == "number" ? new Uint8Array(e) : e, this._data = new DataView(this._buf.buffer);
  }
  ensureCapacity(e) {
    if (e += this._count, e > this._buf.byteLength) {
      let n = new Uint8Array(Math.max(this._buf.byteLength * 2, e));
      this._data = new DataView(n.buffer), n.set(this._buf), this._buf = n;
    }
  }
  writeByte(e) {
    this.ensureCapacity(1), this._buf[this._count] = e, this._count++;
  }
  writeBytes(e) {
    this.ensureCapacity(e.length), this._buf.set(e, this._count), this._count += e.length;
  }
  writeBuffer(e) {
    this.writeBytes(e);
  }
  writeBoolean(e) {
    this.writeByte(e ? 1 : 0);
  }
  writeNullBoolean(e) {
    this.writeByte(e == null ? 2 : e ? 1 : 0);
  }
  writeShort(e) {
    this.ensureCapacity(2), this._data.setInt16(this._count, e), this._count += 2;
  }
  writeChar(e) {
    this.writeShort(e.charCodeAt(0));
  }
  writeInt(e) {
    this.ensureCapacity(4), this._data.setInt32(this._count, e), this._count += 4;
  }
  writeLong(e) {
    typeof e == "number" ? (this.writeInt(e / 2 ** 32), this.writeInt(e % 2 ** 32)) : (this.writeInt(Number(e / BigInt(2 ** 32))), this.writeInt(Number(e % BigInt(2 ** 32))));
  }
  writeFloat(e) {
    this.ensureCapacity(4), this._data.setFloat32(this._count, e), this._count += 4;
  }
  writeDouble(e) {
    this.ensureCapacity(8), this._data.setFloat64(this._count, e), this._count += 8;
  }
  writeString(e) {
    if (e == null) {
      this.writeLength(-1);
      return;
    }
    let n = new TextEncoder().encode(e);
    this.writeLength(n.length), this.writeBytes(n);
  }
  writeLength(e) {
    let n = (e < 0 ? ~e : e) >>> 0;
    for (; n >= 128; )
      this.writeByte(n | 128), n >>= 7;
    e < 0 ? (this.writeByte(n | 128), this.writeByte(0)) : this.writeByte(n);
  }
  writeByteArray(e) {
    e ? (this.writeLength(e.length), this.writeBytes(e)) : this.writeLength(-1);
  }
  writeArray(e, n) {
    if (!e)
      this.writeLength(-1);
    else {
      this.writeLength(e.length);
      for (let r = 0; r < e.length; r++)
        n.call(this, e[r]);
    }
  }
  toBuffer(e = 0) {
    return this._buf.slice(e, this._count - e);
  }
  writeFunction(e) {
    let n;
    e instanceof m ? n = e : n = G(e), this.writeString(n.type), this.writeString(n.method);
  }
  writeError(e) {
    const n = e instanceof I ? e : new I(e.name, g, e.message, e.stack);
    this.writeString(n.name), this.writeString(n.from), this.writeString(n.message), this.writeString(n.stackTrace);
  }
  /*writeError(error: Error){
  	const remote=error instanceof RemoteError?
  		error:
  		new UserRemoteError(error);
  	remote.writeError(this);
  }*/
  writeObject(e, n) {
    n.push(e);
    for (const r in e)
      this.writeString(r), this.writeDynamic(e[r], n);
    this.writeString(null);
  }
  writeDynamic(e, n = []) {
    q(this, e, n);
  }
}
const p = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map();
function ye(t) {
  for (let e of p.values())
    l.get(e)?.(t);
  p.clear();
  for (let e of E.values())
    e.cancel();
}
function R(t) {
  if (T == null)
    throw new Error("Not connected");
  T.send(t.toBuffer());
}
function be(t, e, n) {
  p.set(t, e);
  try {
    R(n);
  } catch (r) {
    l.get(e)?.(r);
  }
}
var M = /* @__PURE__ */ ((t) => (t[t.FunctionCall = 0] = "FunctionCall", t[t.FunctionSuccess = 1] = "FunctionSuccess", t[t.FunctionError = 2] = "FunctionError", t[t.FunctionCancel = 3] = "FunctionCancel", t[t.MessageToExecutor = 4] = "MessageToExecutor", t[t.MessageToCaller = 5] = "MessageToCaller", t))(M || {});
let O = !1;
globalThis.process ? process.on("unhandledRejection", () => {
  O = !1;
}) : window.addEventListener("unhandledrejection", (t) => {
  O && t.reason instanceof I && (O = !1, t.preventDefault());
});
async function pe(t) {
  try {
    switch (t.readByte()) {
      case 0: {
        const n = t.readLength(), r = [];
        let i = !1, s = null, o = null;
        const c = new Promise((a, y) => {
          s = (h) => {
            a(h), i = !0;
            const f = new _();
            f.writeByte(
              1
              /* FunctionSuccess */
            ), f.writeLength(n), f.writeDynamic(h), R(f), E.delete(n);
          }, o = (h) => {
            y(h), i = !0;
            const f = new _();
            f.writeByte(
              2
              /* FunctionError */
            ), f.writeLength(n), f.writeError(h), R(f), E.delete(n);
          };
        });
        try {
          const a = t.readString();
          if (a == null)
            throw new Error("Client can't use null as a type for function calls");
          const y = C.get(a);
          if (!y)
            throw new Error(`Type "${a}" is not registered on client ${g}`);
          const h = t.readString(), f = t.readArray(() => t.readDynamic(r)) ?? [], z = new AbortController(), L = {
            type: a,
            method: h,
            get finished() {
              return i;
            },
            promise: c,
            sendMessage(...u) {
              if (i)
                return L;
              const b = new _();
              b.writeByte(
                5
                /* MessageToCaller */
              ), b.writeLength(n);
              const D = [];
              return b.writeArray(u, (he) => b.writeDynamic(he, D)), r.push(...D), R(b), L;
            },
            addMessageListener(u) {
              return $(L, u), L;
            },
            cancelToken: z.signal,
            cancel: () => z.abort(),
            [Symbol.asyncIterator]: () => j(L)
          };
          E.set(n, L);
          const N = re(() => {
            let u = y[h];
            if (u == null) {
              let b = Object.keys(y).find((D) => D.toLowerCase() == h.toLowerCase());
              b != null && (u = y[b]);
            }
            if (u == null)
              throw new Error(`Method "${h}" not found in "${a}"`);
            return u.call(y, ...f);
          }, L);
          N instanceof Promise ? N.then((u) => s(u), (u) => o(u)) : s(N);
        } catch (a) {
          o(a);
        }
        break;
      }
      case 1: {
        const n = t.readLength(), r = p.get(n);
        if (r == null) {
          console.log(`${g} has no activeRequest with id: ${n}`);
          break;
        }
        try {
          S.get(r)?.(t.readDynamic());
        } catch (i) {
          l.get(r)?.(i);
        } finally {
          p.delete(n), S.delete(r), l.delete(r);
        }
        break;
      }
      case 2: {
        const n = t.readLength(), r = p.get(n);
        if (r == null) {
          console.log(`${g} has no activeRequest with id: ${n}`);
          break;
        }
        try {
          O = !0, l.get(r)?.(t.readError());
        } catch (i) {
          l.get(r)?.(i);
        } finally {
          p.delete(n), S.delete(r), l.delete(r);
        }
        break;
      }
      case 3: {
        const n = t.readLength();
        let r = E.get(n);
        if (!r) {
          console.log(`${g} has no CurrentlyExecuting with id: ${n}`);
          break;
        }
        r.cancel();
        break;
      }
      case 4: {
        const n = t.readLength();
        let r = E.get(n);
        if (!r) {
          console.log(`${g} has no CurrentlyExecuting with id: ${n}`);
          break;
        }
        const i = [], s = t.readArray(() => t.readDynamic(i)) ?? [];
        A(r, s);
        break;
      }
      case 5: {
        const n = t.readLength();
        let r = p.get(n);
        if (!r) {
          console.log(`${g} has no ActiveRequest with id: ${n}`);
          break;
        }
        const i = [], s = t.readArray(() => t.readDynamic(i)) ?? [];
        A(r, s);
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
}
class H {
  _buf;
  _data;
  _pos;
  _count;
  constructor(e, n = 0, r = e.length) {
    this._buf = e, this._data = new DataView(e.buffer), this._pos = n, this._count = n + r;
  }
  readFully(e, n = 0, r = e.length) {
    let i = this._pos;
    if (this._count - i < r)
      throw new RangeError("not enough bytes available to use readFully");
    for (let o = n; o < n + r; o++)
      e[o] = this._buf[i++];
    this._pos = i;
  }
  skip(e) {
    let n = this.available();
    return e < n && (n = e < 0 ? 0 : e), this._pos += n, n;
  }
  available() {
    return this._count - this._pos;
  }
  readAll() {
    return this._buf.slice(this._pos, this._pos = this._count);
  }
  readBuffer(e) {
    if (e > this.available())
      throw new RangeError();
    return this._buf.slice(this._pos, this._pos += e);
  }
  readByte() {
    return this._data.getUint8(this._pos++);
  }
  readBoolean() {
    return this.readByte() != 0;
  }
  readNullBoolean() {
    const e = this.readByte();
    return e < 2 ? e == 1 : null;
  }
  readShort() {
    const e = this._data.getInt16(this._pos);
    return this._pos += 2, e;
  }
  readUShort() {
    const e = this._data.getUint16(this._pos);
    return this._pos += 2, e;
  }
  readChar() {
    return String.fromCharCode(this.readUShort());
  }
  readInt() {
    const e = this._data.getInt32(this._pos);
    return this._pos += 4, e;
  }
  readLong() {
    return BigInt(this.readInt()) * BigInt(2 ** 32) + BigInt(this.readInt() >>> 0);
  }
  readFloat() {
    const e = this._data.getFloat32(this._pos);
    return this._pos += 4, e;
  }
  readDouble() {
    const e = this._data.getFloat64(this._pos);
    return this._pos += 8, e;
  }
  readString() {
    let e = this.readLength();
    return e == -1 ? null : new TextDecoder().decode(this.readBuffer(e));
  }
  readLength() {
    let e = 0, n = 0;
    for (; ; ) {
      const r = this.readByte();
      if (r == 0)
        return n == 0 ? 0 : ~e;
      if (!(r & 128))
        return e |= r << n, e;
      e |= (r & 127) << n, n += 7;
    }
  }
  readArray(e) {
    const n = this.readLength();
    if (n == -1)
      return null;
    const r = [];
    for (let i = 0; i < n; i++)
      r[i] = e.call(this);
    return r;
  }
  readFunction() {
    const e = this.readString(), n = this.readString();
    if (n == null)
      throw new Error("InvalidOperation");
    return new m(e, n);
  }
  readError() {
    return new I(this.readString(), this.readString() ?? "???", this.readString(), this.readString());
  }
  readDynamic(e = []) {
    return P(this, e);
  }
}
let k = !1, Q, K, le = new Promise((t, e) => [Q, K] = [t, e]);
async function me() {
  for (; ; )
    if (await le.then(() => !0, () => !1))
      return;
}
let V;
if (te) {
  const t = (await import("ws")).WebSocket;
  V = () => new t(process.env.RPC_URL, process.env.RPC_TOKEN == null ? {} : {
    headers: {
      Cookie: "RPC_TOKEN=" + process.env.RPC_TOKEN
    }
  });
} else if ("document" in globalThis)
  V = () => new WebSocket("ws" + globalThis.document.location.origin.substring(4) + "/rpc");
else
  throw new Error("Unknown Platform");
function ee(t) {
  const e = K;
  le = new Promise((n, r) => [Q, K] = [n, r]), e(t), ye(t);
}
let T = null;
(function t() {
  const e = V();
  e.onclose = () => {
    T = null, k = !1, console.log("Websocket disconnected");
    const n = new Error("Connection closed");
    ee(n), setTimeout(t, 1e3);
  }, e.onopen = async () => {
    console.log("Websocket connected");
    try {
      T = e, await w(null, "N", g), await w(null, "+", ...C.keys()), k = !0, Q();
    } catch (n) {
      console.error(n.stack), ee(n), e?.close(4e3, "Error registering types");
      return;
    }
  }, e.binaryType = "arraybuffer", e.onmessage = function(r) {
    const i = r.data;
    typeof i == "string" ? console.log(i) : pe(new H(new Uint8Array(i)));
  };
})();
let g = d;
async function _e(t) {
  g = t != null ? `${t} (${d})` : d;
  try {
    k && await w(null, "N", g);
  } catch (e) {
    console.error(e);
  }
}
function Ce(t) {
  return function(e) {
    ne(t ?? e.prototype.constructor.name, e).catch(console.error);
  };
}
function Le(t) {
  return function(e) {
    ce.push([t, (n) => n instanceof e, (n, r, i) => r.write(n, i)]), ae.set(t, (n, r) => e.read(n, r));
  };
}
Promise.resolve().then(() => Ee).then((t) => Object.assign(globalThis, t));
class Y {
  //Rpc
  static id = d;
  static get nameOrId() {
    return g;
  }
  static setName(e) {
    return _e(e);
  }
  //Connection	
  static get isConnected() {
    return k;
  }
  static get waitUntilConnected() {
    return me();
  }
  //Functions
  static createObject = U;
  static createFunction = (e, n) => new m(e, n);
  static registerFunction = G;
  static unregisterFunction = se;
  static callLocal = we;
  //Call function and get a PendingCall, this allows the use of the FunctionCallContext within the function
  static callFunction = w;
  //Call remote function
  static getContext = fe;
  //Types
  static registerType = ne;
  static unregisterType = ue;
  static getObjectWithFallback = async (e, ...n) => await w(null, "O", e, ...n);
  static checkTypes = async (...e) => await w(null, "?", ...e);
  static checkType = async (e) => await Y.checkTypes(e) != 0;
  static getAllTypes = async () => await w(null, "T");
  static getAllConnections = async () => await w(null, "C");
  static objects = oe;
}
let Z = new _();
Z.writeDynamic({
  key: null,
  val: !0
});
console.log(Z.toBuffer());
let Se = new H(Z.toBuffer()), ke = Se.readDynamic();
console.log(ke);
const Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CustomDynamicType: Le,
  DataInput: H,
  DataOutput: _,
  PendingCall: X,
  RPC_ROOT: oe,
  Rpc: Y,
  RpcError: I,
  RpcFunction: m,
  RpcObjectType: F,
  RpcProvider: Ce,
  createRemoteObject: U,
  getAsyncIterator: j,
  listenersMap: v,
  pendingMap: B,
  registerFunction: G,
  registerReceive: $,
  rejectCall: l,
  resolveCall: S,
  runReceiveMessage: A,
  unregisterFunction: se
}, Symbol.toStringTag, { value: "Module" }));
export {
  Le as CustomDynamicType,
  H as DataInput,
  _ as DataOutput,
  X as PendingCall,
  oe as RPC_ROOT,
  Y as Rpc,
  I as RpcError,
  m as RpcFunction,
  F as RpcObjectType,
  Ce as RpcProvider,
  U as createRemoteObject,
  j as getAsyncIterator,
  v as listenersMap,
  B as pendingMap,
  G as registerFunction,
  $ as registerReceive,
  l as rejectCall,
  S as resolveCall,
  A as runReceiveMessage,
  se as unregisterFunction
};
//# sourceMappingURL=rpc.js.map