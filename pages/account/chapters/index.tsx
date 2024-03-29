import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import Badge from '../../../components/global/badge'
import { serverPropHandler } from '../../../helpers/api/serverPropHandler'
import List from '../../../layout/List'
import { chapterType } from '../../../types/models'

const Index = (props: { chapters: chapterType[] }) => {

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
                    <div key={chapter._id} className="border border-indigo-300 p-4 rounded-md bg-indigo-200/20 flex flex-col justify-between">
                        <h4 className="underline">{chapter.name}</h4>
                        <p className="h-14 overflow-ellipsis">{chapter.description}</p>
                        <div className="flex justify-between items-center">
                            {
                                chapter.hasLesson ? (
                                    <Badge 
                                        label="lessons"
                                        color="green"
                                        shape="rounded"
                                    />
                                ) : <div />
                            }
                            <div className="flex gap-2 justify-end">
                                <Link href={`/account/chapters/edit/${chapter._id}`}>
                                    <span className="cursor-pointer" title="Edit Chapter">
                                        <Edit className="text-blue-500 dark:text-blue-300 w-5" />
                                    </span>
                                </Link>
                                <Trash className="cursor-pointer text-red-500 dark:text-red-400 w-5" onClick={()=>handleDelete(chapter._id)} />
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
    const data = await serverPropHandler(`/chapters?createrId=${process.env.TEST_USER_ID}`, 'chapter')

    return {
        props: data,
    }
}