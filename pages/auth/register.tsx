import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { CustomInput } from "../../components/global/customfields";
import { apiCaller } from "../../helpers/api/fetcher";
import { useErrorContext } from "../../providers/ErrorProvider";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useErrorContext();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => setUser(prev => ({...prev, [e.target.name]: e.target.value }))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(user.password===user.confirmPassword){
      const { response, status, errorMessage } = await apiCaller('/auth/register', "POST", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      
      if(status === 'error'){
        console.log(errorMessage);
        
        setError(errorMessage)
      }else{
        setError({})
        console.log(response);
      }
    }else{
      setError({confirmPassword: "Password not match"})
    }
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Notetal - register</title>
        <meta name="description" content="Register in notetal to add notes for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Register</h3>
      <div className="w-11/12 md:w-2/6 mx-auto my-5 p-6 rounded-md dark:bg-indigo-200/25 shadow-md">
        <form onSubmit={handleSubmit}>
          <CustomInput 
            name="name" 
            value={user.name} 
            onChange={handleChange} 
            placeholder="Full name"
            label="Username"
            hasError={error.hasOwnProperty('name')}
            errorMessage={error.hasOwnProperty('name')?error.name:''} 
          />
          <CustomInput 
            name=
            "email" 
            value={user.email} 
            onChange={handleChange} 
            placeholder="Email" 
            label="Email" 
            type="email"
            hasError={error.hasOwnProperty('email')}
            errorMessage={error.hasOwnProperty('email')?error.email:''} 
          />
          <CustomInput 
            name="password" 
            value={user.password} 
            onChange={handleChange} 
            placeholder="Password" 
            label="Password" 
            type="password"
            hasError={error.hasOwnProperty('password')}
            errorMessage={error.hasOwnProperty('password')?error.password:''} 
          />
          <CustomInput 
            name="confirmPassword" 
            value={user.confirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm Password"
            label="Confirm Password"
            type="password"
            hasError={error.hasOwnProperty('confirmPassword')}
            errorMessage={error.hasOwnProperty('confirmPassword')?error.confirmPassword:''} 
          />
          <button className="bg-indigo-400 text-white py-3 w-full mt-5">Register</button>
        </form>
        <div className="flex justify-between text-center md:text-right flex-col md:flex-row my-5">
            <span></span>
            <div>
                <p className="mb-2">
                    Have a account? <Link href="/auth/login"><span className="text-orange-500 underline cursor-pointer">Log in</span></Link>
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
                <path
                  fillRule="evenodd"
                  d=""
                  clipRule="evenodd"
                />
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

export default Register;
