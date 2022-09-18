import React, { useState } from "react";
import { CustomInput, CustomSelect, CustomSwitch } from "../../../components/global/customfields";
import Form from "../../../layout/Form";
import { subNotesType } from "../../../types/models";

const Create = (props: { subnotes: {name: string, value: string}[] }) => {
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

export async function getServerSideProps(){
    const res = await fetch(`http://localhost:3000/api/subnotes?hasPage=true&creatorId=${process.env.TEST_USER_ID}`, { method: "GET" })
    const data = await res.json()
    const subnotes: subNotesType[] = data.subnotes.map((subnote: subNotesType) => ({ name: subnote.name, value: subnote._id }))

    return {
        props: {
            subnotes: subnotes,
        }
    }
}
