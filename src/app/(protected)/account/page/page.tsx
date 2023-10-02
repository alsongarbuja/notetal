import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import List from '@/layout/List'
import { pageType } from '%/types/models'

const PagesPage = (props: { pages: pageType[] }) => {
  // TODO: similar to list page of chapters
  const handleDelete = async (id: string) => {
    if(window.confirm("Are you sure you want to delete it?")){
      const data = await fetch(`/api/pages/${id}`, { method: "DELETE" }).then(res => res.json())

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
            <div key={page._id} className="flex flex-col justify-between p-4 border border-indigo-300 rounded-md bg-indigo-200/20">
              <h4 className="underline">{page.name}</h4>
              <p className="h-14 overflow-ellipsis">{page.description}</p>
              <div className="flex justify-end gap-2">
                <Link href={`/account/page/edit/${page._id}`}>
                  <span className="cursor-pointer" title="Edit pages">
                    <Edit className="w-5 text-blue-500 dark:text-blue-300" />
                  </span>
                </Link>
                <Trash className="w-5 text-red-500 cursor-pointer dark:text-red-400" onClick={()=>handleDelete(page._id)} />
              </div>
            </div>
          ))
        }
      </>
    </List>
  )
}

export default PagesPage