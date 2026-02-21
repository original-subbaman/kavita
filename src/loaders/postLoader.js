import { getPostById } from "../api/post.api";

export async function postLoader({ params }) {
  try {
    const response = await getPostById(params.id);
    return response;
  } catch (error) {
    throw new Error("Failed to load post");
  }
}
