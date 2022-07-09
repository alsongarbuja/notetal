import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import List from '../../../layout/List'
import { subTopicType } from '../../../types/models'

const Index = (props: { subtopics: subTopicType[] }) => {

    const handleDelete = async (id: string) => {
        if(window.confirm("Are you sure you want to delete it?")){
            const data = await fetch(`/api/subtopic/${id}`, { method: "DELETE" }).then(res => res.json())

            if(data.status==='success'){
                window.location.reload()
            }else{
                console.log(data.message);
            }
        }
    }

  return (
    <List title="Sub Topic">
        <>
            {
                props.subtopics?.map(subtopic => (
                    <div key={subtopic._id} className="border border-indigo-300 p-4 rounded-md bg-indigo-200/20 flex flex-col justify-between">
                        <h4 className="underline">{subtopic.name}</h4>
                        <p className="h-14 overflow-ellipsis">{subtopic.description}</p>
                        <div>
                            <div className="flex gap-2 justify-end mt-3">
                                <Link href={`/account/subtopic/edit/${subtopic._id}`}>
                                    <span className="cursor-pointer" title="Edit Sub Topic">
                                        <Edit className="text-blue-500 dark:text-blue-300 w-5" />
                                    </span>
                                </Link>
                                <Trash className="cursor-pointer text-red-500 dark:text-red-400 w-5" onClick={()=>handleDelete(subtopic._id)} />
                            </div>
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
    const res = await fetch(`http://localhost:3000/api/subtopic?createrId=${process.env.TEST_USER_ID}`, { method: "GET" })
    const data = await res.json()

    return {
        props: {
            subtopics: data.subtopics,
        }
    }
}