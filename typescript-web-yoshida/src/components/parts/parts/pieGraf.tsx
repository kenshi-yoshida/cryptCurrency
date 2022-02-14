import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

type PropsType = {
  labels: (string | undefined)[];
  title: string;
  data: (number | undefined)[];
  width?: number;
  height?: number;
};

/**
 * 円グラフを表示
 * @param labels 表示項目名の配列
 * @param title 表のタイトル
 * @param data 数値データの配列
 * @param width 横幅
 * @param height 高さ
 */
const Block: any = styled.div`
  width: ${(props: any) => props.width}px;
  height: ${(props: any) => props.height}px;
`;
export function PieGraf(props: PropsType) {
  const labels = props.labels;
  const title = props.title;
  const data = props.data;
  const width = props.width;
  const height = props.height;
  return (
    <Block width={width} height={height}>
      <Pie
        data={{
          labels: [...labels],
          datasets: [
            {
              label: title,
              data: [...data],
              backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(255, 159, 64, 0.3)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 2,
            },
          ],
        }}
        width={400}
        height={400}
        options={{
          maintainAspectRatio: true,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 16,
                },
              },
            },
          },
        }}
      />
    </Block>
  );
}
