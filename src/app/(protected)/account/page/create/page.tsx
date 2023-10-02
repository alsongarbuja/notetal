import React, { useState } from "react";
import { CustomInput, CustomSelect } from "@/components/global/customfields";
import Form from "@/layout/Form";

const Create = (props: { subnotes: {name: string, value: string}[] }) => {
  // TODO: similar to edit page of chapters
  const [page, setPage] = useState({
    name: "",
    description: "",
    subNotesId: "",
    createdBy: "62aff09d479e0682a353c90f"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/page", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
  }

  return (
    <Form title="Pages" handleSubmit={handleSubmit}>
      <CustomInput
        errorMessage=""
        hasError={false}
        value={page.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of page"
      />
      <CustomSelect
        value={page.subNotesId}
        label="Sub Notes"
        name="subNotesId"
        onChange={handleChange}
        placeholder="Select Sub Note"
        options={props.subnotes}
      />
      <CustomInput
        errorMessage=""
        hasError={false}
        value={page.description}
        label="Description"
        name="description"
        onChange={handleChange}
        isRequired={false}
      />
    </Form>
  );
};

export default Create;
