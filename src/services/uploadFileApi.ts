import client from ".";

export const uploadFileAPI = (payload:any) =>{
  return client.post(`upload`,payload).then(res => res.data);
}