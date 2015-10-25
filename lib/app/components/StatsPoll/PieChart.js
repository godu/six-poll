import React, { PropTypes } from 'react';
import { PieChart } from 'react-d3';

export default class extends React.Component {
  static propTypes = {
    poll: PropTypes.object
  }

  render() {
    const { poll } = this.props;

    if (!poll) return null;

    const { answers = [] } = poll;

    const data = answers.map(answer => ({
      label: answer.value,
      value: answer.stats
    }));

    return (
      <PieChart
        data={data}
        width={500}
        height={400}
        radius={100}
        innerRadius={20}
        sectorBorderColor="white"
      />
    );
  }
}
