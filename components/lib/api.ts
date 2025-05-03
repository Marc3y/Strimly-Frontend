import { apiLink } from "@/config/site";

const dataMap = new Map<string, any>();

export const login = async (params:any, cookieStore:any): Promise<any> => {
  console.log(cookieStore.get("cacheCode"));
  if(dataMap.has("userData")) return dataMap.get("userData");
  if (!cookieStore.has("cacheCode") && !params.code) {
   return undefined;
  }
  if(params.code){
    let response = await fetch(apiLink + "/account/register?code=" + params.code, {
    });
    if(!response.ok) return undefined;
    let data = await response.json();
    if(data) dataMap.set("userData", data);
    return data;
  }
  const cacheCode = cookieStore.get("cacheCode").value;
  console.log("ok");
  let response = await fetch(
    apiLink + "/account/login?cacheCode=" + cacheCode, {
    });
  if (!response.ok) return undefined;
  let data = await response.json();
  dataMap.set("userData", data);
  return data;
}

//window.history.pushState(null, '', '/');