import { Box, Grid, Skeleton } from "@mui/material";
const Card = ({ height }) => {
  return (
    <Box
      as="div"
      display={"block"}
      height={height}
      width={"400px"}
      className="bg-white"
    ></Box>
  );
};
const PostLoading = () => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Grid container gap={2} justifyContent={"center"}>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={150}
            height={160}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={150}
            height={100}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={160}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={150}
            height={100}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={160}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={150}
            height={100}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={160}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={150}
            height={100}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={150}
            height={100}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={160}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={200}
            height={120}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={140}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={190}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={120}
            height={100}
          />
        </Grid>
        <Grid item>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={120}
            height={150}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostLoading;
