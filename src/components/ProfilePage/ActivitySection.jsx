import React from "react";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import HeatmapChart from "../Chart/HeatMap";
import useGetUserActivityCount from "../../hooks/user/useGetUserActivityCount";
import useAuth from "../../hooks/auth/useAuth";
function ActivitySection(props) {
  const { user } = useAuth();
  const { data } = useGetUserActivityCount(
    user.id,
    new Date("2024-10-01"),
    new Date("2025-03-14")
  );
  return (
    <ProfileSectionWrapper>
      <HeatmapChart />
    </ProfileSectionWrapper>
  );
}

export default ActivitySection;
