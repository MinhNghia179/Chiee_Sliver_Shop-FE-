import client from '.';

export const sendContactAPI = (payload:any) => {
  return client.post("contact",payload).then(res => res.data);
}