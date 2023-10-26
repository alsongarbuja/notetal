"use client";

import { useState } from "react";
import { apiCaller } from "%/helpers/api/fetcher";
import { dynamicObject } from "%/types/custom";
import {Input, Button, Link} from "@nextui-org/react";
import { Facebook, GitHub, Twitter } from "react-feather";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<dynamicObject>({});

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
      <h3 className="text-center">Register</h3>
      <div className="w-11/12 p-6 mx-auto my-5 rounded-md shadow-md md:w-2/6 dark:bg-indigo-200/25">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input 
            isRequired 
            type="text" 
            label="Username" 
            variant="bordered" 
            radius="sm"
            isInvalid={error.hasOwnProperty('name')}
            errorMessage={error.hasOwnProperty('name')?error.name:''} 
            value={user.name} 
            onValueChange={(v) => setUser(prev => ({...prev, name: v}))} 
          />
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
          <Input 
            isRequired 
            type="password" 
            label="ConfirmPassword" 
            variant="bordered" 
            radius="sm"
            isInvalid={error.hasOwnProperty('confirmPassword')}
            errorMessage={error.hasOwnProperty('confirmPassword')?error.confirmPassword:''} 
            value={user.confirmPassword} 
            onValueChange={(v) => setUser(prev => ({...prev, confirmPassword: v}))} 
          />
          <Button color="primary" radius="none" type="submit">Register</Button>
        </form>
        <div className="flex flex-col justify-between my-5 text-center md:text-right md:flex-row">
          <span></span>
          <div>
            <p className="mb-2">
              Have a account? <Link href="/auth/login" color="secondary" underline="hover">Log in</Link>
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

export default Register;
