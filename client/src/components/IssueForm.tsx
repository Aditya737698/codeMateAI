// src/components/IssueForm.tsx
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

type IssueFormProps = {
  onSubmit: (data: { title: string; description: string }) => void;
};

const IssueForm: React.FC<IssueFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Create New Issue</h2>
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default IssueForm;