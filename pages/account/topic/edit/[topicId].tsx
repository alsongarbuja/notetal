import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomInput } from "../../../../components/global/customfields";
import Form from "../../../../layout/Form";

const EditTopic = () => {
    const router = useRouter();

    const [topic, setTopic] = useState({
        name: "",
        description: "",
        topicHeight: 2,
        createdBy: "62aff09d479e0682a353c90f",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTopic((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        const data = await fetch(`/api/topic/${router.query.topicId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(topic),
        }).then(res => res.json()).catch(err => console.error(err))
    
        console.log(data);
    }

    useEffect(() => {
        const gettopic = async () => {
            const data = await fetch(`/api/topic/${router.query.topicId}`, { method: "GET" }).then(res => res.json()).catch(err => console.error(err))
        
            if(data?.status==='success'){
                setTopic(data.topic)
            }else{
                console.error(data.message);
            }
        }

        gettopic()
    }, [])

  return (
    <Form title="Topic" isEdit={true} handleSubmit={handleSubmit}>
      <CustomInput
        value={topic.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of topic, ex: Software Engineering, Git, etc"
      />
      <CustomInput
        value={topic.topicHeight}
        type="number"
        label="Depth"
        name="topicHeight"
        onChange={handleChange}
        min={2}
        max={3}
        placeholder="How deep is the topic: 2 or 3"
      />
      <CustomInput
        value={topic.description}
        label="Description"
        name="description"
        onChange={handleChange}
      />
    </Form>
  );
};

export default EditTopic;
