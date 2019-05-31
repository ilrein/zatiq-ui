import React from 'react';
import {
  Grid,
  Header,
  Statistic,
} from 'semantic-ui-react';
import { LineChart, Line } from 'recharts';
import styled from 'styled-components';

const data = [
  {
    name: 'Page A', uv: 0, pv: 0, amt: 0,
  },
  {
    name: 'Page B', uv: 0, pv: 0, amt: 0,
  },
  {
    name: 'Page C', uv: 0, pv: 0, amt: 0,
  },
  {
    name: 'Page D', uv: 0, pv: 0, amt: 0,
  },
  {
    name: 'Page E', uv: 0, pv: 0, amt: 0,
  },
  {
    name: 'Page F', uv: 0, pv: 0, amt: 0,
  },
  {
    name: 'Page G', uv: 0, pv: 0, amt: 0,
  },
];

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SalesSection = () => (
  <Grid stackable>
    <Grid.Row columns="1">
      <Grid.Column>
        <Header>
          Sales
        </Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns="2">
      <Grid.Column>
        <Stat>
          <LineChart width={300} height={100} data={data}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#A333C8"
              strokeWidth={2}
            />
          </LineChart>

          <Statistic
            label="Reservations"
            value="0"
            color="purple"
          />
        </Stat>

        {/* <Statistic.Group widths="7">
          <Statistic
            label="Reservations"
            value="0"
            color="purple"
          />
          <Statistic
            label="Daily sales"
            value="$0"
            color="blue"
          />
          <Statistic
            label="Total sales"
            value="$0"
            color="green"
          />
        </Statistic.Group> */}
      </Grid.Column>
      <Grid.Column>
        <Stat>
          <LineChart width={300} height={100} data={data}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#2085D0"
              strokeWidth={2}
            />
          </LineChart>

          <Statistic
            label="Daily sales"
            value="$0.00"
            color="blue"
          />
        </Stat>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);


export default SalesSection;
