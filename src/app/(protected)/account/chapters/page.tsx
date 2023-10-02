import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import Badge from '@/components/global/badge'
import List from '@/layout/List'
import { chapterType } from '%/types/models'

const ChaptersPage = async (props: { chapters: chapterType[] }) => {
  // TODO: either use the controller to fetch chapters or make it client component and call api
  const handleDelete = async (id: string) => {
    if(window.confirm("Are you sure you want to delete it?")){
      const data = await fetch(`/api/chapters/${id}`, { method: "DELETE" }).then(res => res.json())

      if(data.status==='success'){
        window.location.reload()
      }else{
        console.log(data.message);
      }
    }
  }

  return (
    <List title="Chapters">
      <>
        {
          props.chapters?.map(chapter => (
            <div key={chapter._id} className="flex flex-col justify-between p-4 border border-indigo-300 rounded-md bg-indigo-200/20">
              <h4 className="underline">{chapter.name}</h4>
              <p className="h-14 overflow-ellipsis">{chapter.description}</p>
              <div className="flex items-center justify-between">
                {
                  chapter.hasLesson ? (
                    <Badge 
                      label="lessons"
                      color="green"
                      shape="rounded"
                    />
                  ) : <div />
                }
                <div className="flex justify-end gap-2">
                  <Link href={`/account/chapters/edit/${chapter._id}`}>
                    <span className="cursor-pointer" title="Edit Chapter">
                      <Edit className="w-5 text-blue-500 dark:text-blue-300" />
                    </span>
                  </Link>
                  <Trash className="w-5 text-red-500 cursor-pointer dark:text-red-400" onClick={()=>handleDelete(chapter._id)} />
                </div>
              </div>
            </div>
          ))
        }
      </>
    </List>
  )
}

export default ChaptersPage