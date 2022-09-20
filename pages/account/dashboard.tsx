import Head from 'next/head'
import Link from 'next/link'
import { File, FilePlus, FileText, Folder, FolderPlus } from 'react-feather'

// TODO: Dashboard api
const Dashboard = () => {
  return (
    <div className="min-h-screen">
        <Head>
            <title>Notetal - Dashboard</title>
        </Head>
        <h2>Dashboard</h2>
        <div className="flex gap-5 mt-2 flex-wrap">
            <div className="w-full sm:w-52 border px-5 py-4 rounded-md text-center border-indigo-400 bg-indigo-400/10 dark:text-indigo-200">
                <h2>3</h2>
                <h4 className="mb-3 flex gap-2 justify-center">
                    <Folder /> Notes
                </h4>
                <Link href="/account/notes">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your notes
                    </span>
                </Link>
            </div>
            <div className="w-full sm:w-52 border px-5 py-4 rounded-md text-center border-indigo-400 bg-indigo-400/10 dark:text-indigo-200">
                <h2>6</h2>
                <h4 className="mb-3 flex gap-2 justify-center">
                    <FolderPlus /> Sub Notes
                </h4>
                <Link href="/account/subnotes">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your Sub notes
                    </span>
                </Link>
            </div>
            <div className="w-full sm:w-52 border px-5 py-4 rounded-md text-center border-indigo-400 bg-indigo-400/10 dark:text-indigo-200">
                <h2>4</h2>
                <h4 className="mb-3 flex gap-2 justify-center">
                    <File /> Page
                </h4>
                <Link href="/account/page">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your pages
                    </span>
                </Link>
            </div>
            <div className="w-full sm:w-52 border px-5 py-4 rounded-md text-center border-indigo-400 bg-indigo-400/10 dark:text-indigo-200">
                <h2>9</h2>
                <h4 className="mb-3 flex gap-2 justify-center">
                    <FileText className="inline" /> Chapters
                </h4>
                <Link href="/account/chapters">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your chapters
                    </span>
                </Link>
            </div>
            <div className="w-full sm:w-52 border px-5 py-4 rounded-md text-center border-indigo-400 bg-indigo-400/10 dark:text-indigo-200">
                <h2>12</h2>
                <h4 className="mb-3 flex gap-2 justify-center">
                    <FilePlus className="inline" /> Lessons
                </h4>
                <Link href="/account/lessons">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your lessons
                    </span>
                </Link>
            </div>
           
        </div>

    </div>
  )
}

export default Dashboard