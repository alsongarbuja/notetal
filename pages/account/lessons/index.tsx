import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import { serverPropHandler } from '../../../helpers/api/serverPropHandler'
import List from '../../../layout/List'
import { lessonType } from '../../../types/models'

const Index = (props: { lessons: lessonType[] }) => {

    const handleDelete = async (id: string) => {
        if(window.confirm("Are you sure you want to delete it?")){
            const data = await fetch(`/api/lessons/${id}`, { method: "DELETE" }).then(res => res.json())

            if(data.status==='success'){
                window.location.reload()
            }else{
                console.log(data.message);
            }
        }
    }

  return (
    <List title="Lessons">
        <>
            {
                props.lessons?.map(lesson => (
                    <div key={lesson._id} className="border border-indigo-300 p-4 rounded-md bg-indigo-200/20 flex flex-col justify-between">
                        <h4 className="underline">{lesson.name}</h4>
                        <p className="h-14 overflow-ellipsis">{lesson.description}</p>
                        <div className="flex gap-2 justify-end">
                            <Link href={`/account/lessons/edit/${lesson._id}`}>
                                <span className="cursor-pointer" title="Edit Lesson">
                                    <Edit className="text-blue-500 dark:text-blue-300 w-5" />
                                </span>
                            </Link>
                            <Trash className="cursor-pointer text-red-500 dark:text-red-400 w-5" onClick={()=>handleDelete(lesson._id)} />
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
    const data = await serverPropHandler(`/lessons?creatorId=${process.env.TEST_USER_ID}`, 'lesson')

    return {
        props: data,
    }
}