import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Charts(props) {
  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Days",
        data: props.pdata,
        backgroundColor: ["green", "red"],
        borderColor: ["green", "red"],
      },
    ],
  };

  const options = {};
  return (
    <>
      <div>
        <Doughnut data={data} options={options}></Doughnut>
      </div>
    </>
  );
}
export default Charts;
