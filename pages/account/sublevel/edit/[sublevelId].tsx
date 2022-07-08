import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomInput, CustomSelect } from "../../../../components/global/customfields";
import { levelType } from "../../../../types/models";
import Form from "../../../../layout/Form";

const EditLevel = (props: { levels: { name: string, value: string }[] }) => {
    const router = useRouter();

    const [sublevel, setSublevel] = useState({
        name: "",
        description: "",
        levelId: "",
        createdBy: "62aff09d479e0682a353c90f",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSublevel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        const data = await fetch(`/api/sublevel/${router.query.sublevelId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sublevel),
        }).then(res => res.json()).catch(err => console.error(err))
    
        console.log(data);
    }

    useEffect(() => {
        const getLevel = async () => {
            const data = await fetch(`/api/sublevel/${router.query.sublevelId}`, { method: "GET" }).then(res => res.json()).catch(err => console.error(err))
        
            if(data?.status==='success'){
                setSublevel(data.sublevel)
            }else{
                console.error(data.message);
            }
        }

        getLevel()
    }, [])

  return (
    <Form title="Sub Level" isEdit={true} handleSubmit={handleSubmit}>
      <CustomInput
        value={sublevel.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of level, ex: Software Engineering, Git, etc"
      />
      <CustomSelect
        value={sublevel.levelId}
        label="Level"
        name="levelId"
        onChange={handleChange}
        placeholder="Select Level"
        options={props.levels}
      />
      <CustomInput
        value={sublevel.description}
        label="Description"
        name="description"
        onChange={handleChange}
      />
    </Form>
  );
};

export default EditLevel;

export async function getServerSideProps(){
    const res = await fetch(`http://localhost:3000/api/level?height=3`, { method: "GET" })
    const data = await res.json()
    const levels: levelType[] = data.levels.map((level: levelType) => ({ name: level.name, value: level._id }))

    return {
        props: {
            levels: levels,
        }
    }
}