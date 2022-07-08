import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowLeft, Plus } from 'react-feather'

const List = ({ children, title }: {
    children: JSX.Element,
    title: string, 
}) => {

    const navigate = useRouter()

  return (
    <div className="min-h-screen">
        <div className="flex justify-between items-center mb-6">
            <h4><ArrowLeft className="inline mr-2 cursor-pointer" onClick={()=>navigate.back()} /> {title} you have made</h4>
            <Link href={`/account/${title.toLowerCase().split(" ").join("")}/create`}>
                <span className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer">
                    <Plus className="inline mr-1" /> Add {title}
                </span>
            </Link>
        </div>
        <div className="my-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {children}
            </div>
        </div>
    </div>
  )
}

export default List