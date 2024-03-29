import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { CustomInput } from "../../components/global/customfields";
import { apiCaller } from "../../helpers/api/fetcher";
import { useErrorContext } from "../../providers/ErrorProvider";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useErrorContext()

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => setUser(prev => ({...prev, [e.target.name]: e.target.value }))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { response, errorMessage, status } = await apiCaller("/auth/login", "POST", user);

    if(status==='error'){
      setError(errorMessage)
    }else{
      setError({})
      console.log(response)
    }
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Notetal - login</title>
        <meta name="description" content="Login in notetal to continue adding notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Log In</h3>
      <div className="w-11/12 md:w-2/6 mx-auto my-5 p-6 rounded-md dark:bg-indigo-200/25 shadow-md">
        <form onSubmit={handleSubmit}>
          <CustomInput 
            name="email" 
            value={user.email} 
            placeholder="Email" 
            onChange={handleChange} 
            label="Email" 
            type="email"
            hasError={error.hasOwnProperty('email')}
            errorMessage={error.hasOwnProperty('email')?error.email:''} 
          />
          <CustomInput 
            name="password" 
            value={user.password} 
            placeholder="Password" 
            onChange={handleChange} 
            label="Password" 
            type="password"
            hasError={error.hasOwnProperty('password')}
            errorMessage={error.hasOwnProperty('password')?error.password:''}
          />
          <button className="bg-indigo-400 text-white py-3 w-full mt-5">Log in</button>
        </form>
        <div className="flex justify-between text-center md:text-right flex-col md:flex-row my-5">
            <span></span>
            <div>
                <p className="mb-2">
                    Don&apos;t have account? <Link href="/auth/register"><span className="text-orange-500 underline cursor-pointer">Create one</span></Link>
                </p>
                <p>
                    <Link href="/auth/login"><span className="text-orange-500 underline cursor-pointer">Forgot Password?</span></Link>
                </p>
            </div>
        </div>
        <p className="my-4 text-center">
          {/* <hr />  */}
          or continue with
          {/* <hr /> */}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with Google</span>
              {/* <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg> */}
              <span className="ml-3">Google</span>
            </a>
          </div>

          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with GitHub</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
