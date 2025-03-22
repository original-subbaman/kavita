import React, { Suspense, useEffect, useState } from "react";
import { Text } from "@radix-ui/themes";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import LineChart from "../Chart/LineChart";
import useGetUserActivityCount from "../../hooks/user/useGetUserActivityCount";
import useAuth from "../../hooks/auth/useAuth";

function ActivitySection(props) {
  const { user } = useAuth();

  const { data, isLoading } = useGetUserActivityCount({
    userId: user.id,
    startDate: new Date("2024-10-01"),
    endDate: new Date("2025-03-22"),
    select: (data) => {
      const values = data.map((item) => ({
        x: item.creation_date,
        y: item.post_count,
      }));
      return values;
    },
  });

  return (
    <ProfileSectionWrapper>
      {isLoading && (
        <Text color="green" size={"7"}>
          Loading...
        </Text>
      )}
      {data && <LineChart data={data} />}
    </ProfileSectionWrapper>
  );
}

export default ActivitySection;
