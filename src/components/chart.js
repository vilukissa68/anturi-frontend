import React from 'react'
import { Line } from 'react-chartjs-2'
import config from '../utils/config'

const Graph = ({ values, names }) => {
  const ErrorDisplay = () => {
    return(
      <>
        <h2>Temperature history not found</h2>
      </>
    )
  }
  if (names === null || values === null || typeof(values) === 'undefined'){
    return (<ErrorDisplay/>)
  }
  if (names.length === 0 || values.length === 0) {
    return (<ErrorDisplay/>)
  }
  if (values[0].times.length === 0 || values[0].temps.length === 0 || names.length === 0) {
    return (<ErrorDisplay/>)
  }
  const times = values[0].times
  const datasets = values.map((graphValues, idx) => {
    return {
      label: names.find(y => y.id === graphValues.name) === null ? 'null' : names.find(y => y.id === graphValues.name).name,
      data: graphValues.temps,
      fill: false,
      backgroundColor: config.colors.background[idx % config.colors.background.length],
      borderColor: config.colors.border[idx % config.colors.background.length],
      pointRadius: config.graph.pointRadius,
    }
  })

  const data = {
    labels: times,
    datasets: datasets
  }

  const options = {
    padding: '20px',
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: config.graph.yMin,
            suggestedMax: config.graph.yMax,
          },
          gridLines: {
            color: config.colors.grid,
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: config.colors.grid,
          }
        }
      ]
    },
    legend: {
      position: config.graph.legend.pos,
      align: config.graph.legend.alignment,
    }
  }

  return (
    <div className="Chart">
      <Line data={data} options={options} />
    </div>
  )
}

export default Graph
