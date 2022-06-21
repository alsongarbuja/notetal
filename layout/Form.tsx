import { useRouter } from "next/router"
import { FormEventHandler } from "react"
import { ArrowLeft } from "react-feather"

const Form = ({ children, title, handleSubmit, isEdit=false }: {
    title: string,
    children: JSX.Element[],
    handleSubmit: FormEventHandler<HTMLFormElement>,
    isEdit?: boolean
}) => {
    
    const navigate = useRouter()

  return (
    <div className="min-h-screen">
        <h3 className="flex items-center">
            <ArrowLeft className="inline mr-3 cursor-pointer" onClick={()=>navigate.back()}/>
            {isEdit?'Edit':'Create'} {title}
        </h3>
        <form onSubmit={handleSubmit} className="w-full border px-4 py-8 rounded-md mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
            {children}
            <div className="col-span-1 md:col-span-2 text-right">
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                    {isEdit?'Edit':'Add'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Form