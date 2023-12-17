import styled from "styled-components";

import { useTodayActivity } from "./useTodayActivity";
import { Spinner, Row, Heading } from "@/ui";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: auto;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  let content;

  if (!isLoading) {
    if (activities.length > 0) {
      content = (
        <TodayList>
          {activities.map((activity) => {
            return <TodayItem key={activity.id} activity={activity} />;
          })}
        </TodayList>
      );
    } else content = <NoActivity>No activity today...</NoActivity>;
  } else content = <Spinner />;

  return (
    <StyledToday>
      <Row $type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {content}
    </StyledToday>
  );
}

export default TodayActivity;
