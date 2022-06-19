import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Notetal</title>
        <meta name="description" content="Portal for note taking as well as reading" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="py-5">
        <section className='text-center my-11'>
            <h1>Welcome to <span className="text-indigo-400">Notetal</span></h1>
            <p>
              Complete portal for all the notes you are ever looking for.
            </p>
            <Link href="/level">
              <button className="py-2 px-5 w-64 bg-indigo-400 text-white rounded-full mt-10">
                Get Started
              </button>
            </Link>
        </section>
        <section className="my-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-5">
            <Image src="/editor.png" alt="powerful editor" width="500" height="500" />
            <div className="w-full md:w-1/2">
              <h4 className="text-indigo-400">Powerful Editor</h4>
              <p>
                With the inbuilt powerful editor not only for normal notes but also
                for mathematical equations take notes in seconds.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4 my-5">
            <Image src="/something.png" alt="powerful editor" width="500" height="500" />
            <div className="w-full md:w-1/2">
              <h4 className="text-indigo-400">Some features</h4>
              <p>
                With the inbuilt powerful editor not only for normal notes but also
                for mathematical equations take notes in seconds.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-5">
            <Image src="/mobileUI.png" alt="powerful editor" width="500" height="500" />
            <div className="w-full md:w-1/2">
              <h4 className="text-indigo-400">Mobile friendly</h4>
              <p>
                Want to read outside, on bed, while waiting for someone. With the mobile
                friendly UI of notetal you can read and write anywhere and anytime.
              </p>
            </div>
          </div>
        </section>
        <section></section>
      </article>
    </div>
  )
}

export default Home
