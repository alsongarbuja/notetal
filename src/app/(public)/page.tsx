"use client"
import Image from "next/image"
import { Button, Link } from "@nextui-org/react"

export default function HomePage() {
  return (
    <>
      <article className="py-5">
        <section className='text-center my-11'>
          <h1>Welcome to <span className="text-indigo-400">Notetal</span></h1>
          <p>
            Complete portal for all the notes you are ever looking for.
          </p>
          <Button color="primary" radius="full" className="mt-2" href="/notes" as={Link}>
            Get Started
          </Button>
        </section>
        <section className="my-10">
          <div className="flex flex-col items-center justify-between gap-4 my-5 md:flex-row">
            <Image src="/editor.png" alt="powerful editor" width="500" height="500" />
            <div className="w-full md:w-1/2">
              <h4 className="text-indigo-400">Powerful Editor</h4>
              <p>
                With the inbuilt powerful editor not only for normal notes but also
                for mathematical equations take notes in seconds.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 my-5 md:flex-row-reverse">
            <Image src="/something.png" alt="powerful editor" width="500" height="500" />
            <div className="w-full md:w-1/2">
              <h4 className="text-indigo-400">Some features</h4>
              <p>
                With the inbuilt powerful editor not only for normal notes but also
                for mathematical equations take notes in seconds.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 my-5 md:flex-row">
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
    </>
  )
}