import Link from 'next/link'
import { Plus } from 'react-feather'

const List = ({ headers, children, title }: {
    headers: string[],
    children: JSX.Element,
    title: string, 
}) => {
  return (
    <div className="min-h-screen">
        <div className="flex justify-between items-center mb-6">
            <h4>{title} you have made</h4>
            <Link href={`/account/${title.toLowerCase()}/create`}>
                <span className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer">
                    <Plus className="inline mr-1" /> Add {title}
                </span>
            </Link>
        </div>
        <div className="my-4">
            <table className="w-full">
                <thead className="border-b">
                    <tr>
                        <th>SN</th>
                        {
                            headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))
                        }
                        <th>Actions</th>
                    </tr>
                </thead>
                {children}
            </table>
        </div>
    </div>
  )
}

export default List