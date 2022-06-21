import Link from 'next/link'
import { Edit, Trash } from 'react-feather'
import List from '../../../layout/List'
import { levelType } from '../../../types/models'

const Index = (props: { levels: levelType[] }) => {

    const handleDelete = async (id: string) => {
        if(window.confirm("Are you sure you want to delete it?")){
            const data = await fetch(`/api/level/${id}`, { method: "DELETE" }).then(res => res.json())

            if(data.status==='success'){
                window.location.reload()
            }else{
                console.log(data.message);
            }
        }
    }

  return (
    <List title="Level" headers={["Name", "Level Height", "Description"]}>
        <tbody className="text-center">
            {
                props.levels?.map((level, i) => (
                    <tr key={level._id}>
                        <td>{i+1}</td>
                        <td>{level.name}</td>
                        <td>{level.levelHeight}</td>
                        <td>{level.description}</td>
                        <td className="flex gap-2 justify-center">
                            <Link href={`/account/level/edit/${level._id}`}>
                                <span className="cursor-pointer" title="Edit level">
                                    <Edit />
                                </span>
                            </Link>
                            <Trash className="cursor-pointer" onClick={()=>handleDelete(level._id)} />
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </List>
  )
}

export default Index

export async function getServerSideProps(){
    const res = await fetch(`http://localhost:3000/api/level?createrId=${process.env.TEST_USER_ID}`, { method: "GET" })
    const data = await res.json()

    return {
        props: {
            levels: data.levels,
        }
    }
}