import React, { useState } from "react";
import { CustomInput, CustomSwitch } from "../../../components/global/customfields";
import { apiCaller } from "../../../helpers/api/fetcher";
import Form from "../../../layout/Form";
import { useErrorContext } from "../../../providers/ErrorProvider";

const Create = () => {
  const [note, setNote] = useState({
    name: "",
    description: "",
    hasSubNotes: false,
    createdBy: "62aff09d479e0682a353c90f"
  });
  const [error, setError]= useErrorContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "hasSubNotes") {
      setNote(prev => ({ ...prev, hasSubNotes: !prev.hasSubNotes }));
    }else{
      setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { response, status, errorMessage } = await apiCaller('/notes', 'POST', note);

    if(status === 'error') {
      setError(errorMessage)
    }else{
      console.log(response);
      setError({})
      setNote({
        name: "",
        description: "",
        hasSubNotes: false,
        createdBy: "62aff09d479e0682a353c90f"
      })
    }

}

  return (
    <Form title="Notes" handleSubmit={handleSubmit}>
      <CustomInput
        value={note.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of note, ex: Software Engineering, Git, etc"
        hasError={error.hasOwnProperty('name')}
        errorMessage={error.hasOwnProperty('name')?error.name:''}
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
        hasError={error.hasOwnProperty('description')}
        errorMessage={error.hasOwnProperty('description')?error.description:''}
      />
    </Form>
  );
};

export default Create;
