import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import Badge from '@/components/global/badge'
import List from '@/layout/List'
import { subNotesType } from '%/types/models'

const Index = (props: { subNotes: subNotesType[] }) => {
  // TODO: similar to list page of chapters

  const handleDelete = async (id: string) => {
    if(window.confirm("Are you sure you want to delete it?")){
      const data = await fetch(`/api/subnote/${id}`, { method: "DELETE" }).then(res => res.json())
      if(data.status==='success'){
        window.location.reload()
      }else{
        console.log(data.message);
      }
    }
  }

  return (
    <List title="Sub Notes">
      <>
        {
          props.subNotes?.map(subnote => (
            <div key={subnote._id} className="flex flex-col justify-between p-4 border border-indigo-300 rounded-md bg-indigo-200/20">
              <h4 className="underline">{subnote.name}</h4>
              <p className="h-14 overflow-ellipsis">{subnote.description}</p>
              <div className="flex items-center justify-between">
                {
                  subnote.hasPage ? (
                    <Badge 
                      label="pages"
                      color="red"
                      shape="rounded"
                    />
                  ) : <div />
                }
                <div className="flex justify-end gap-2">
                  <Link href={`/account/subnotes/edit/${subnote._id}`}>
                    <span className="cursor-pointer" title="Edit Sub Notes">
                      <Edit className="w-5 text-blue-500 dark:text-blue-300" />
                    </span>
                  </Link>
                  <Trash className="w-5 text-red-500 cursor-pointer dark:text-red-400" onClick={()=>handleDelete(subnote._id)} />
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