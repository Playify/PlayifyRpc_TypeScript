import {RpcId} from "../connection/RpcId.js";
import {callRemoteFunction} from "./functions/FunctionCallContext.js";
import {PendingCall} from "./functions/PendingCall.js";
import {registeredFunctions} from "../internal/RegisteredTypes.js";


type ParamsOrEmpty<T>=T extends (...args: infer Params)=>any?Params: unknown extends T?any[]: [];
type ReturnTypeFromAnything<T>=T extends (...args: any)=>infer ReturnType?ReturnType: T;
type UnwrapPromise<T>=T extends Promise<infer PromiseType>?PromiseType: T;

export type RpcFunction<FuncOrReturnType>=InstanceType<typeof RpcFunction<FuncOrReturnType>>;

export const RpcFunction=class RpcFunction<FuncOrReturnType>
	extends (function Extendable(func: Function){return Object.setPrototypeOf(func,new.target.prototype);} as any as {
		new<FuncOrReturnType=unknown>(func: Function): {
			//Complex call signature from generic, to allow easier definition later on
			(...args: ParamsOrEmpty<FuncOrReturnType>): PendingCall<UnwrapPromise<ReturnTypeFromAnything<FuncOrReturnType>>>;
		}
	})<FuncOrReturnType>{

	constructor(
		public readonly type: string,
		public readonly method: string,
	){super(callRemoteFunction.bind(null,type,method));}

	async getMethodSignatures(typeScript:boolean=false):Promise<[parameters:string[],returns:string][]>{
		return callRemoteFunction(this.type,null,"S",this.method,typeScript);
	}

	toString(){
		return `rpc (...params) => ${this.type??"null"}.${this.method}(...params)`;
	}
};

let nextId: number=Date.now();
const functionCache=new WeakMap<((...args: any)=>any),string>();

export function registerFunction<T extends ((...args: any)=>any)>(func: T): RpcFunction<T>{
	if(func instanceof RpcFunction) return func;
	const already=functionCache.get(func);
	if(already!=null)return new RpcFunction("$"+RpcId,already);
	const id=(nextId++).toString(16);

	registeredFunctions[id]=func;
	functionCache.set(func,id);

	const type="$"+RpcId;
	return new RpcFunction(type,id);
}

export function unregisterFunction(func: RpcFunction<any>){
	const type="$"+RpcId;
	if(func.type!=type) throw new Error("Can't unregister RemoteFunction, that was not registered locally");

	delete registeredFunctions[func.method];
	functionCache.delete(func);
}