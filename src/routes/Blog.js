import { Flex } from "@mantine/core";
import CommentSection from "../components/CommentSection";
import BlogDetails from "../components/BlogDetails";

const Blog = ({ blog, notifyWith }) => (
  <Flex direction="column" sx={{ height: "100%" }}>
    <BlogDetails blog={blog} notifyWith={notifyWith} />
    <CommentSection blog={blog} notifyWith={notifyWith} />
  </Flex>
);

export default Blog;
