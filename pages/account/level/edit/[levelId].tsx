import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomInput } from "../../../../components/global/customfields";
import Form from "../../../../layout/Form";

const EditLevel = () => {
    const router = useRouter();

    const [level, setLevel] = useState({
        name: "",
        description: "",
        levelHeight: 2,
        createdBy: process.env.TEST_USER_ID,
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setLevel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        const data = await fetch(`/api/level/${router.query.levelId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(level),
        }).then(res => res.json()).catch(err => console.error(err))
    
        console.log(data);
    }

    useEffect(() => {
        const getLevel = async () => {
            const data = await fetch(`/api/level/${router.query.levelId}`, { method: "GET" }).then(res => res.json()).catch(err => console.error(err))
        
            if(data.status==='success'){
                setLevel(data.level)
            }else{
                console.error(data.message);
            }
        }

        getLevel()
    }, [])

  return (
    <Form title="Level" isEdit={true} handleSubmit={handleSubmit}>
      <CustomInput
        value={level.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of level, ex: Software Engineering, Git, etc"
      />
      <CustomInput
        value={level.levelHeight}
        type="number"
        label="Depth"
        name="levelHeight"
        onChange={handleChange}
        min={2}
        max={3}
        placeholder="How deep is the level: 2 or 3"
      />
      <CustomInput
        value={level.description}
        label="Description"
        name="description"
        onChange={handleChange}
      />
    </Form>
  );
};

export default EditLevel;
