import React from "react";
import Post from "./Post";
import { Container, Grid } from "@radix-ui/themes";
function PostSection(props) {
  return (
    <Container>
      <Grid columns="4" gap="4" width="auto" justify="center">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Grid>
    </Container>
  );
}

export default PostSection;
