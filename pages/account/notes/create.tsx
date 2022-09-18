import React, { useState } from "react";
import { CustomInput, CustomSwitch } from "../../../components/global/customfields";
import Form from "../../../layout/Form";

const Create = () => {
  const [note, setNote] = useState({
    name: "",
    description: "",
    hasSubNotes: false,
    createdBy: "62aff09d479e0682a353c90f"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "hasSubNotes") {
      setNote(prev => ({ ...prev, hasSubNotes: !prev.hasSubNotes }));
    }else{
      setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/notes", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
}

  return (
    <Form title="Notes" handleSubmit={handleSubmit}>
      <CustomInput
        value={note.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of note, ex: Software Engineering, Git, etc"
      />
      <CustomSwitch
        value={note.hasSubNotes}
        label="Has Sub Notes"
        name="hasSubNotes"
        onChange={handleChange}
        id="hasSubNotes"
      />
      <CustomInput
        value={note.description}
        label="Description"
        name="description"
        onChange={handleChange}
        isRequired={false}
      />
    </Form>
  );
};

export default Create;
