import { useEffect, useState } from "react";
import { dynamicObject, dynamicStringObject } from "%/types/custom";

/**
 * 
 * @param {string} endpoint 
 * @param {string} method 
 * @param {object} payload 
 * @returns 
 */
export const useFetch = (endpoint: string, method: string, payload: object={}): 
  {response: null | object, error: any, loading: boolean} => 
{
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint, {
          method,
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(payload),
        });
        const json = await res.json();

        if(json?.success){
          setResponse(json);
        }else{
          setError(json);
        }
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchData();
  }, [endpoint, method, payload]);

  return { response, error, loading };
}

export const apiCaller = async (endpoint: string, method: string, payload: object={}):
  Promise<{response: dynamicObject, status: string, errorMessage: dynamicStringObject}> => 
{
  let status: string = 'success';
  let response: dynamicObject = {};
  let errorMessage: dynamicStringObject = {};
  
  let options: any= {
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  }

  if(method === 'POST' || method === 'PUT'){
    options = {
      ...options,
      body: JSON.stringify(payload),
    }
  }
    
  await fetch('http://localhost:3000/api'+endpoint, options).then(res => res.json()).then(data => {
    if(!data?.success){
      status = 'error';
      if(data?.data){
          errorMessage = data.data;
      }else{
            errorMessage = data.message;
      }
    }else{
      response = data?.data;
    }
  }).catch(err => {
    status = 'error';
    errorMessage = err;
  });

  return Promise.resolve({ response, status, errorMessage });
}