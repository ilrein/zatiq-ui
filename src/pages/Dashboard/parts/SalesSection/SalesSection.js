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
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const data2 = [
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
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
            value="12"
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
          <LineChart width={300} height={100} data={data2}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#2085D0"
              strokeWidth={2}
            />
          </LineChart>

          <Statistic
            label="Daily sales"
            value="$736.80"
            color="blue"
          />
        </Stat>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);


export default SalesSection;
