import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import Badge from '@/components/global/badge'
import List from '@/layout/List'
import { notesType } from '%/types/models'

const NotesPage = (props: { notes: notesType[] }) => {
  // TODO: similar to list page of chapters
  const handleDelete = async (id: string) => {
    if(window.confirm("Are you sure you want to delete it?")){
      const data = await fetch(`/api/notes/${id}`, { method: "DELETE" }).then(res => res.json())

      if(data.status==='success'){
        window.location.reload()
      }else{
        console.log(data.message);
      }
    }
  }

  return (
    <List title="Notes">
      <>
        {
          props.notes?.map(note => (
            <div key={note._id} className="flex flex-col justify-between p-4 border border-indigo-300 rounded-md bg-indigo-200/20">
              <h4 className="underline">{note.name}</h4>
              <p className="h-14 overflow-ellipsis">{note.description}</p>
              <div className="flex items-center justify-between gap-2">
                {
                  note.hasSubNotes ? (
                    <Badge 
                      label="subnotes"
                      variant='outline'
                      shape='rounded'
                    />
                  ) : <div />
                }
                <div className="flex justify-end gap-2">
                  <Link href={`/account/notes/edit/${note._id}`}>
                    <span className="cursor-pointer" title="Edit notes">
                      <Edit className="w-5 text-blue-500 dark:text-blue-300" />
                    </span>
                  </Link>
                  <Trash className="w-5 text-red-500 cursor-pointer dark:text-red-400" onClick={()=>handleDelete(note._id)} />
                </div>
              </div>
            </div>
          ))
        }
      </>
    </List>
  )
}

export default NotesPage