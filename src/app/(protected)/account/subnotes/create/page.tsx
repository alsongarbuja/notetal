import React, { useState } from "react";
import { CustomInput, CustomSelect, CustomSwitch } from "@/components/global/customfields";
import Form from "@/layout/Form";

const Create = (props: { notes: {name: string, value: string}[] }) => {
  // TODO: similar to edit page of chapters
  const [subNotes, setSubNotes] = useState({
    name: "",
    description: "",
    hasPage: false,
    notesId: "",
    createdBy: "62aff09d479e0682a353c90f"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "hasPage"){
      setSubNotes(prev => ({ ...prev, hasPage: !prev.hasPage }));
    }else{
      setSubNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/subnotes", {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(subNotes),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
  }

  return (
    <Form title="Sub Notes" handleSubmit={handleSubmit}>
      <CustomInput
        hasError={false}
        errorMessage=""
        value={subNotes.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of Sub notes, ex: 1st semester, etc"
      />
      <CustomSelect
        value={subNotes.notesId}
        label="notes"
        name="notesId"
        onChange={handleChange}
        placeholder="Select Note"
        options={props.notes}
      />
      <CustomInput
        hasError={false}
        errorMessage=""
        value={subNotes.description}
        label="Description"
        name="description"
        onChange={handleChange}
        isRequired={false}
      />
      <CustomSwitch
        value={subNotes.hasPage}
        label="Has Page"
        name="hasPage"
        onChange={handleChange}
        id="hasPage"
      />
    </Form>
  );
};

export default Create;