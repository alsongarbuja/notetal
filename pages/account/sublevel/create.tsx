import React, { useState } from "react";
import { CustomInput, CustomSelect } from "../../../components/global/customfields";
import Form from "../../../layout/Form";
import { levelType } from "../../../types/models";

const Create = (props: { levels: {name: string, value: string}[] }) => {
  const [sublevel, setSublevel] = useState({
    name: "",
    description: "",
    levelId: "",
    createdBy: "62aff09d479e0682a353c90f"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSublevel((prev) => ({ ...prev, [e.target.name]: e.target.value }));

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/sublevel", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sublevel),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
}

  return (
    <Form title="Sub Level" handleSubmit={handleSubmit}>
      <CustomInput
        value={sublevel.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of Sub level, ex: 1st semester, etc"
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
        isRequired={false}
      />
    </Form>
  );
};

export default Create;

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