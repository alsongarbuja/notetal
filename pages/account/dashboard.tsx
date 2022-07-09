import Head from 'next/head'
import Link from 'next/link'
import { Book, Folder, FolderPlus, List } from 'react-feather'

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
                    <Folder /> Topics
                </h4>
                <Link href="/account/topic">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your topics
                    </span>
                </Link>
            </div>
            <div className="w-full sm:w-52 border px-5 py-4 rounded-md text-center border-indigo-400 bg-indigo-400/10 dark:text-indigo-200">
                <h2>6</h2>
                <h4 className="mb-3 flex gap-2 justify-center">
                    <FolderPlus /> Sub Topic
                </h4>
                <Link href="/account/subtopic">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your Sub topics
                    </span>
                </Link>
            </div>
            {/* <div className="w-full sm:w-52 border px-5 py-4 rounded-md text-center border-indigo-400 bg-indigo-400/10 dark:text-indigo-200">
                <h2>4</h2>
                <h4 className="mb-3 flex gap-2 justify-center">
                    <Folder /> Levels
                </h4>
                <Link href="/account/level">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your levels
                    </span>
                </Link>
            </div>
            
            <div className="w-full sm:w-52 border px-5 py-4 rounded-md text-center border-indigo-400 bg-indigo-400/10 dark:text-indigo-200">
                <h2>9</h2>
                <h4 className="mb-3 flex gap-2 justify-center">
                    <Book className="inline" /> Subject
                </h4>
                <Link href="/account/level">
                    <span className="underline cursor-pointer hover:text-indigo-400">
                        See your subjects
                    </span>
                </Link>
            </div> */}
           
        </div>

    </div>
  )
}

export default Dashboard