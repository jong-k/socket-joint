import FormContainer from "./containers/FormContainer";

const Testing = () => {
  const postdata = async (data) => {
    const response = await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  return (
    <>
      <FormContainer postdata={postdata} />
    </>
  );
};

export default Testing;
