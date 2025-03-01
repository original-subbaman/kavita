import React from "react";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import HeatmapChart from "../Chart/HeatMap";
function ActivitySection(props) {
  return (
    <ProfileSectionWrapper>
      <HeatmapChart />
    </ProfileSectionWrapper>
  );
}

export default ActivitySection;
