import {RpcName,setName} from "./connection/RpcName.js";
import {isConnected,waitConnected} from "./connection/WebSocketConnection.js";
import {
	createRemoteObject,
	RPC_ROOT,
	RpcObject,
	RpcObjectExists,
	RpcObjectGetMethods,
	RpcObjectType,
} from "./types/RpcObject.js";
import {registerFunction,RpcFunction,unregisterFunction} from "./types/RpcFunction.js";
import {
	callLocal,
	callRemoteFunction,
	FunctionCallContext,
	getFunctionContext,
	runWithContext,
} from "./types/functions/FunctionCallContext.js";
import {generateTypeName,registerType,unregisterType} from "./internal/RegisteredTypes.js";
import {RpcId} from "./connection/RpcId.js";
import {PendingCall} from "./types/functions/PendingCall.js";


export * from "./types/data/DataInput.js";
export * from "./types/data/DataOutput.js";
export {CustomDynamicType} from "./types/data/CustomDynamicTypeDecorator.js";

export type {FunctionCallContext} from "./types/functions/FunctionCallContext.js";
export * from "./types/functions/PendingCall.js";

export * from "./types/RpcObject.js";
export * from "./types/RpcFunction.js";
export * from "./types/RpcError.js";
export {RpcCustomError} from "./types/errors/RpcCustomErrorDecorator.js";
export * from "./types/errors/PredefinedErrors.js";
export {RpcProvider} from "./types/RpcProviderDecorator.js";

import("./rpc.js").then((m)=>Object.assign(globalThis,m));

// noinspection JSUnusedGlobalSymbols
export class Rpc{

	//Rpc
	public static readonly id:string=RpcId;

	public static get prettyName():string{
		return Rpc.name!=null?`${Rpc.name} (${Rpc.id})`:Rpc.id;
	}

	public static get name():string | null{
		return RpcName;
	}
	
	public static setName=setName;

	//Connection
	public static get isConnected():boolean{
		return isConnected;
	}

	public static get waitUntilConnected():Promise<void>{
		return waitConnected();
	}

	//Functions
	public static createObject=createRemoteObject;
	public static createFunction=<T>(type:string,method:string)=>new RpcFunction<T>(type,method);
	public static registerFunction=registerFunction;
	public static unregisterFunction=unregisterFunction;

	public static callLocal=callLocal;//Call function and get a PendingCall, this allows the use of the FunctionCallContext within the function
	public static callFunction=callRemoteFunction;//Call remote function

	public static getContext:()=>FunctionCallContext=getFunctionContext;
	public static runWithContext=runWithContext;

	//Types
	public static registerType=registerType;
	public static unregisterType=unregisterType;
	public static generateTypeName=generateTypeName;
	

	public static getObjectWithFallback=async(type:string,...types:string[]):Promise<number>=>await callRemoteFunction("Rpc","getObjectWithFallback",type,...types);
	public static checkTypes=async(...types:string[]):Promise<number>=>await callRemoteFunction("Rpc","checkTypes",...types);
	public static checkType=async(type:string):Promise<boolean>=>await callRemoteFunction("Rpc","checkType",type);
	public static getAllTypes=async():Promise<string[]>=>await callRemoteFunction("Rpc","getAllTypes");
	public static getAllConnections=async():Promise<string[]>=>await callRemoteFunction("Rpc","getAllConnections");
	public static getRegistrations=async(includeHidden:boolean=false):Promise<(Record<string,string[]>)>=>await callRemoteFunction("Rpc","getRegistrations",includeHidden);
	public static evalObject=async(expression:string):Promise<any>=>await callRemoteFunction("Rpc","evalObject",expression);
	public static evalString=async(expression:string):Promise<string>=>await callRemoteFunction("Rpc","evalString",expression);
	public static listenCalls=():PendingCall=>callRemoteFunction("Rpc","listenCalls");

	public static root=RPC_ROOT;
	
	public static getObjectMethods=(o:RpcObject|string)=>(typeof o==="string"?createRemoteObject(o):o)[RpcObjectGetMethods]();
	public static getObjectExists=(o:RpcObject|string)=>(typeof o==="string"?createRemoteObject(o):o)[RpcObjectExists]();
	public static getObjectType=(o:RpcObject)=>o[RpcObjectType];
	public static getMethodSignatures=(type:string,method:string,ts=false)=>new RpcFunction(type,method).getMethodSignatures(ts);
}


//import "./_test/webTest.js"