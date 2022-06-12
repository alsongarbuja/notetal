import Link from 'next/link'
import React from 'react'
import { ChevronsRight } from 'react-feather'

const LevelBox = ({ title, href, description="" }: { title: string, href: string, description?: string }) => {
  return (
    <Link href={href}>
        <div className="border border-indigo-400 rounded-md cursor-pointer p-5 w-80 hover:bg-indigo-400/25">
        <h4>{title}</h4>
        <p className="my-3">{description}</p>
        <p className="text-indigo-300">
            Read notes <ChevronsRight className="inline-block" />
        </p>
        </div>
    </Link>
  )
}

export default LevelBox