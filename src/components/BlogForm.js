import { useState } from "react";
import PropTypes from "prop-types";
import { TextInput, Button, Group } from "@mantine/core";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group>
        <TextInput
          id="title"
          label="title"
          placeholder="blog name"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </Group>
      <Group>
        <TextInput
          id="author"
          label="author"
          placeholder="author name"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Group>
      <Group>
        <TextInput
          id="url"
          label="url"
          placeholder="www.something.com"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </Group>
      <Button id="create-blog" color="green" type="submit">
        create
      </Button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
