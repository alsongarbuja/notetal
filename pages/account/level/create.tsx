import React, { useState } from "react";
import { CustomInput } from "../../../components/global/customfields";
import Form from "../../../layout/Form";

const Create = () => {
  const [level, setLevel] = useState({
    name: "",
    description: "",
    levelHeight: 2,
    createdBy: "62aff09d479e0682a353c90f"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLevel((prev) => ({ ...prev, [e.target.name]: e.target.value }));

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/level", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(level),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
}

  return (
    <Form title="Level" handleSubmit={handleSubmit}>
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
        isRequired={false}
      />
    </Form>
  );
};

export default Create;
