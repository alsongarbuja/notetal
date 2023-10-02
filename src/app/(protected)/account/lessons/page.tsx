import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import List from '@/layout/List'
import { lessonType } from '%/types/models'

const LessonsPage = (props: { lessons: lessonType[] }) => {
  // TODO: similar to list page of chapters
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
            <div key={lesson._id} className="flex flex-col justify-between p-4 border border-indigo-300 rounded-md bg-indigo-200/20">
              <h4 className="underline">{lesson.name}</h4>
              <p className="h-14 overflow-ellipsis">{lesson.description}</p>
              <div className="flex justify-end gap-2">
                <Link href={`/account/lessons/edit/${lesson._id}`}>
                  <span className="cursor-pointer" title="Edit Lesson">
                    <Edit className="w-5 text-blue-500 dark:text-blue-300" />
                  </span>
                </Link>
                <Trash className="w-5 text-red-500 cursor-pointer dark:text-red-400" onClick={()=>handleDelete(lesson._id)} />
              </div>
            </div>
          ))
        }
      </>
    </List>
  )
}

export default LessonsPage