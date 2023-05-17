import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import Badge from '../../../components/global/badge'
import { serverPropHandler } from '../../../helpers/api/serverPropHandler'
import List from '../../../layout/List'
import { subNotesType } from '../../../types/models'

const Index = (props: { subNotes: subNotesType[] }) => {

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
                    <div key={subnote._id} className="border border-indigo-300 p-4 rounded-md bg-indigo-200/20 flex flex-col justify-between">
                        <h4 className="underline">{subnote.name}</h4>
                        <p className="h-14 overflow-ellipsis">{subnote.description}</p>
                        <div className="flex justify-between items-center">
                            {
                                subnote.hasPage ? (
                                    <Badge 
                                        label="pages"
                                        color="red"
                                        shape="rounded"
                                    />
                                ) : <div />
                            }
                            <div className="flex gap-2 justify-end">
                                <Link href={`/account/subnotes/edit/${subnote._id}`}>
                                    <span className="cursor-pointer" title="Edit Sub Notes">
                                        <Edit className="text-blue-500 dark:text-blue-300 w-5" />
                                    </span>
                                </Link>
                                <Trash className="cursor-pointer text-red-500 dark:text-red-400 w-5" onClick={()=>handleDelete(subnote._id)} />
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
    const data = await serverPropHandler(`/subnotes?createrId=${process.env.TEST_USER_ID}`, 'subnote') 

    return {
        props: data
    }
}