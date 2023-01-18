import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

function Form({ postdata, onEditData, editComment }) {
  const [onEdit, setOnEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    profile_url: "",
    author: "",
    content: "",
    createdAt: "",
  });

  useEffect(() => {
    if (onEditData.id) setOnEdit(true);
    setFormData(onEditData);
  }, [onEditData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!onEdit) postdata(formData);
    if (onEdit) editComment(formData);
    setFormData({
      id: 0,
      profile_url: "",
      author: "",
      content: "",
      createdAt: "",
    });
  };

  return (
    <FormStyle>
      <form>
        <input
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          value={formData.profile_url}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="author"
          placeholder="작성자"
          value={formData.author}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="content"
          placeholder="내용"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <input
          type="text"
          name="createdAt"
          placeholder="2020-05-30"
          value={formData.createdAt}
          onChange={handleChange}
          required
        />
        <br />
        <button onClick={handleSubmit} type="submit">
          {onEdit ? "수정" : "등록"}
        </button>
      </form>
    </FormStyle>
  );
}

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type="text"] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

export default Form;
