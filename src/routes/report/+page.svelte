<script lang="ts">
  import { Scatter } from "svelte-chartjs";

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from "chart.js";
  import type { ActionData } from "./$types";
  import type { TReport } from "../../utils/types";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  );

  export let form: ActionData;

  const labels: { x: string; y: string } = form!.labels;
  const data: TReport = form?.report;

  const report = {
    labels: ["Scatter"],
    datasets: [
      {
        borderColor: "rgba(99,0,125, .2)",
        backgroundColor: "rgba(99,0,125, .5)",
        label: "(x,y)",
        data,
      },
    ],
  };
</script>

<div class="flex justify-between">
  <div>
    <div class="table-container">
      <table class="table table-hover table-compact overflow-scroll" style="display: block; max-height: 380px;">
        <thead>
          <tr>
            <th>{labels.x}</th>
            <th>{labels.y}</th>
          </tr>
        </thead>
        <tbody>
          {#each data as row}
            <tr>
              <td>{row.x}</td>
              <td>{row.y}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <Scatter
    data={report}
    width={750}
    options={{
      responsive: false,
      scales: {
        x: { title: { display: true, text: labels.x } },
        y: { title: { display: true, text: labels.y } },
      },
    }}
  />
</div>

<div class="text-center mt-5">
  <a href="/" class="btn variant-filled-primary">Reupload</a>
</div>
