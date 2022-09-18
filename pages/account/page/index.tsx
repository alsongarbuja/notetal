import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import List from '../../../layout/List'
import { pageType } from '../../../types/models'

const Index = (props: { pages: pageType[] }) => {

    const handleDelete = async (id: string) => {
        if(window.confirm("Are you sure you want to delete it?")){
            const data = await fetch(`/api/page/${id}`, { method: "DELETE" }).then(res => res.json())

            if(data.status==='success'){
                window.location.reload()
            }else{
                console.log(data.message);
            }
        }
    }

  return (
    <List title="Page">
        <>
            {
                props.pages?.map(page => (
                    <div key={page._id} className="border border-indigo-300 p-4 rounded-md bg-indigo-200/20 flex flex-col justify-between">
                        <h4 className="underline">{page.name}</h4>
                        <p className="h-14 overflow-ellipsis">{page.description}</p>
                        <div className="flex gap-2 justify-end">
                            <Link href={`/account/page/edit/${page._id}`}>
                                <span className="cursor-pointer" title="Edit pages">
                                    <Edit className="text-blue-500 dark:text-blue-300 w-5" />
                                </span>
                            </Link>
                            <Trash className="cursor-pointer text-red-500 dark:text-red-400 w-5" onClick={()=>handleDelete(page._id)} />
                        </div>
                    </div>
                ))
            }
        </>
    </List>
  )
}

export default Index

export async function getServerSideProps(){
    const res = await fetch(`http://localhost:3000/api/page?createrId=${process.env.TEST_USER_ID}`, { method: "GET" })
    const data = await res.json()

    return {
        props: {
            pages: data.pages,
        }
    }
}