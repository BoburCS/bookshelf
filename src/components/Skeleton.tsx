import styled, { keyframes } from "styled-components";
import { Grid } from "@pages/home/Home";

const SkeletonPulse = keyframes`
  0% {
    background-color: #f8fafc;
  }
  100% {
    background-color: #e2e8f0;
  }
`;

const SkeletonCard = styled.div`
  width: 100%;
  height: 200px;
  background: #f8fafc;
  border-radius: 4px;
  animation: ${SkeletonPulse} 1.5s infinite ease-in-out;
`;

// Loading Skeleton for books container
export default function Skeleton() {
  return (
    <Grid>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </Grid>
  );
}
