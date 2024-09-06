import {isConnected} from "../connection/WebSocketConnection.js";
import {randomId,RpcId} from "../connection/RpcId.js";
import {callRemoteFunction} from "../types/functions/FunctionCallContext.js";
import {RpcObjectGetMethods,RpcObjectGetMethodSignatures,RpcObjectGetRpcVersion} from "../types/RpcObject.js";
import {RpcError} from "../types/RpcError.js";
import {RpcMetaMethodNotFoundError,RpcMethodNotFoundError} from "../types/errors/PredefinedErrors.js";
import {getFunctionParameterNames} from "./functionParameterNames";
import {version} from "../../package.json";


export type Func=((...args:any[])=>Promise<any>)&{
	[RpcObjectGetMethodSignatures]?:(ts:boolean)=>Promise<[parameters:string[],returns:string][]>
};
export type Invoker={
	[RpcObjectGetMethods]?:()=>Promise<string[]>,
	[RpcObjectGetMethodSignatures]?:(method:string,ts:boolean)=>Promise<[parameters:string[],returns:string][]>,
	[RpcObjectGetRpcVersion]?:()=>Promise<string>,
	[s:string]:Func | any,
};
export const registeredFunctions:Invoker=Object.create(null);
export const registeredTypes=new Map<string,Invoker>();
registeredTypes.set("$"+RpcId,registeredFunctions);


export function generateTypeName(){
	return "$"+RpcId+"$"+randomId();
}

export async function registerType(type:string,invoker:Invoker):Promise<void>{
	if(registeredTypes.has(type)) return;
	registeredTypes.set(type,invoker);
	
	try{
		if(isConnected)
			await callRemoteFunction(null,'+',type);
	}catch(e){
		console.error(`[Rpc] Error registering type "${type}":`,e);

		registeredTypes.delete(type);
	}
}

export async function unregisterType(type:string):Promise<void>{
	if(!registeredTypes.has(type)) return;

	try{
		if(isConnected)
			await callRemoteFunction(null,'-',type);
	}catch(e){
		console.error(`[Rpc] Error unregistering type "${type}":`,e);

		//Also delete locally, as it won't be listened to, and on the server it probably is already unregistered
	}
	registeredTypes.delete(type);
}



export async function invoke(invoker:Invoker,type:string,method:string | null,...args:any[]):Promise<any>{
	if(method!=null){
		let func=invoker[method];
		if(func==null){
			let ignoreCase=(await getMethods(invoker)).find(s=>s.toLowerCase()==method.toLowerCase());
			if(ignoreCase!=null) func=invoker[ignoreCase];
		}
		//Try finding the same method on a default object, if it is reference equals, then it is a builtin function, that should not be available via RPC
		const reference=({})[method];

		if(func==null||func===reference)throw RpcMethodNotFoundError.new(type,method);
		try{
			return await (({
				async $RPC_MARKER_BEGIN$(){
					return await func.call(invoker,...args);
				}
			})["$RPC_MARKER_BEGIN$"])();
			//return await rpcMarkInternal(async()=>await func.call(invoker,...args));
		}catch(e){
			throw RpcError.wrapAndFreeze(e as Error);
		}
	}

	const meta=args.length==0?null:args[0];
	switch(meta){
		case "M":
			return getMethods(invoker);
		case "S":
			return getMethodSignatures(invoker,type,args[1]==null?null:""+args[1],!!args[2]);
		case "V":
			return getRpcVersion(invoker);
		default:
			throw RpcMetaMethodNotFoundError.new(type,meta);
	}
}
async function getMethodSignatures(invoker:Invoker,type:string,method:string|null,ts:boolean):Promise<[parameters:string[],returns:string][]>{
	if(method==null)return [
		[["M"],"string[]"],
		[["S",ts?"method:string|null":"string? method",ts?"ts:boolean":"bool ts"],ts?"[parameters:string[],returns:string][]":"(string[] parameters,string @return)[]"],
		[["V"],"string"],
	];
	const getter=invoker[RpcObjectGetMethodSignatures];
	if(getter) return await getter.call(invoker,method,ts);
	
	const func:Func=invoker[method];
	if(!func) throw new RpcMethodNotFoundError(type,method);
	if(func[RpcObjectGetMethodSignatures]) return func[RpcObjectGetMethodSignatures].call(func,ts);

	return [
		[getFunctionParameterNames(func),ts?"unknown":"object?"]
	];
}

async function getMethods(invoker:Invoker):Promise<string[]>{
	const getter=invoker[RpcObjectGetMethods];
	if(getter) return await getter.call(invoker);

	return Object.getOwnPropertyNames(invoker).filter(key=>typeof invoker[key]=="function");
}

async function getRpcVersion(invoker:Invoker):Promise<string>{
	const getter=invoker[RpcObjectGetRpcVersion];
	if(getter) return await getter.call(invoker);
	return version+" JS";
}