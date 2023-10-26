"use client";

import React, { useState } from "react";
import { apiCaller } from "%/helpers/api/fetcher";
import {Input, Button, Link} from "@nextui-org/react";
import { dynamicObject } from "%/types/custom";
import { Facebook, GitHub, Twitter } from "react-feather";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState<dynamicObject>({})

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
      <h3 className="text-center">Log In</h3>
      <div className="w-11/12 p-6 mx-auto my-5 rounded-md shadow-md md:w-2/6 dark:bg-indigo-200/25">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input 
            isRequired 
            type="email" 
            label="Email" 
            variant="bordered" 
            radius="sm"
            isInvalid={error.hasOwnProperty('email')} 
            errorMessage={error.hasOwnProperty('email')?error.email:''}
            value={user.email} 
            onValueChange={(v) => setUser(prev => ({...prev, email: v}))} 
          />
          <Input 
            isRequired 
            type="password" 
            label="Password" 
            variant="bordered" 
            radius="sm"
            isInvalid={error.hasOwnProperty('password')}
            errorMessage={error.hasOwnProperty('password')?error.password:''} 
            value={user.password} 
            onValueChange={(v) => setUser(prev => ({...prev, password: v}))} 
          />
          <Button radius="none" color="primary" type="submit">Log in</Button>
        </form>
        <div className="flex flex-col justify-between my-5 text-center md:text-right md:flex-row">
          <span></span>
          <div>
            <p className="mb-2">
              Don&apos;t have account? <Link color="secondary" underline="hover" href="/auth/register">Create one</Link>
            </p>
            <p>
              <Link href="/auth/login" color="secondary" underline="hover">Forgot Password?</Link>
            </p>
          </div>
        </div>
        <p className="my-4 text-center">
          {/* <hr />  */}
          or continue with
          {/* <hr /> */}
        </p>
        <div className="grid grid-cols-3 gap-3 mt-6">
          <Button 
            variant="bordered" 
            color="default" 
            radius="sm"
            href="#"
            as={Link}
          >
            <span className="sr-only">Sign in with Facebook</span>
            <Facebook className="text-gray-400" />
          </Button>
          <Button 
            variant="bordered" 
            color="default" 
            radius="sm"
            href="#"
            as={Link}
          >
            <span className="sr-only">Sign in with Facebook</span>
            <Twitter className="text-gray-400" />
          </Button>
          <Button 
            variant="bordered" 
            color="default" 
            radius="sm"
            href="#"
            as={Link}
          >
            <span className="sr-only">Sign in with Facebook</span>
            <GitHub className="text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
