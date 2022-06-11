import React from 'react'

const Layout = ({ children } : {
    children: JSX.Element,
}) => {
  return (
    <>
        <header className="flex justify-between w-4/5 mx-auto py-10">
            <span>LOGO</span>
            <nav>
                <ul className="flex justify-between">
                    <li className='px-2 mr-4'>Git</li>
                    <li className='px-2 mr-4'>Twitter</li>
                    <li className='px-2 mr-4'>Search</li>
                    <li className='px-2 mr-4'>Dark</li>
                    <li className='px-2 mr-4'>Login</li>
                    <li className='px-2 mr-4'>Signup</li>
                </ul>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer></footer>
    </>
  )
}

export default Layout