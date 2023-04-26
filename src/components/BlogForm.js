import { useState } from "react";
import PropTypes from "prop-types";
import { TextInput, Button, Grid } from "@mantine/core";

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
      <Grid grow>
        <Grid.Col sm={4}>
          <TextInput
            id="title"
            label="title"
            placeholder="blog name"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Grid.Col>
        <Grid.Col sm={4}>
          <TextInput
            id="author"
            label="author"
            placeholder="author name"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Grid.Col>
        <Grid.Col sm={4}>
          <TextInput
            id="url"
            label="url"
            placeholder="www.something.com"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Grid.Col>
      </Grid>

      <Button fullWidth id="create-blog" color="green" type="submit" my="md">
        create
      </Button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
