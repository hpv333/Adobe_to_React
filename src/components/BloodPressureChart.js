import React, { useRef, useEffect } from "react";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BloodPressureChart = ({patient}) => {
  const chartRef = useRef(null);
  
  // Cleanup chart instance on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Months labels for x-axis
  const months = ['Oct. 2023', 'Nov. 2023', 'Dec. 2023', 'Jan. 2024', 'Feb. 2024', 'Mar. 2024'];
  console.log("Bloodchart Patient : ", patient);

  // Exact data to match the image pattern
  const systolicValues = [120, 117, 160, 112, 150, 160];
  const diastolicValues = [105, 65, 110, 92, 70, 78];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Systolic",
        data: systolicValues,
        borderColor: "#E83E8C", // Pink color matching the image
        backgroundColor: "rgba(232, 62, 140, 0.1)",
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#E83E8C", 
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        tension: 0.4, // Add smooth curve to match the image
        fill: false,
      },
      {
        label: "Diastolic",
        data: diastolicValues,
        borderColor: "#6F42C1", // Purple color matching the image
        backgroundColor: "rgba(111, 66, 193, 0.1)",
        borderWidth: 3,
        pointRadius: 6, 
        pointBackgroundColor: "#6F42C1",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        tension: 0.4, // Add smooth curve to match the image
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 60, // Set minimum to show the lower diastolic values
        max: 180, // Set maximum to show the higher systolic values
        border: {
          display: true,
          color: '#E0E0E0'
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawTicks: false
        },
        ticks: {
          stepSize: 20,
          font: {
            size: 12,
            family: "'Arial', sans-serif"
          },
          padding: 8,
          color: '#888888'
        },
        title: {
          display: false // No y-axis title in the image
        }
      },
      x: {
        grid: {
          display: false // No vertical grid lines in the image
        },
        border: {
          display: false // No x-axis border in the image
        },
        ticks: {
          font: {
            size: 12,
            family: "'Arial', sans-serif"
          },
          padding: 8,
          color: '#888888'
        },
        title: {
          display: false // No x-axis title in the image
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // No legend in the chart area of the image
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
        displayColors: true,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            const label = context.dataset.label;
            const value = context.parsed.y;
            return `${label}: ${value} mmHg`;
          }
        }
      },
      title: {
        display: false // No title in the chart area of the image
      }
    },
    elements: {
      line: {
        tension: 0.4 // Smoother curves to match the image
      }
    }
  };

  return (
    <div style={{ 
      position: "relative", 
      height: "200px", 
      width: "100%", 
      backgroundColor: "#F4F0FE",
      borderRadius: "8px",
      padding: "10px"
    }}>
      <Line 
        data={chartData} 
        options={chartOptions} 
        ref={chartRef}
      />
    </div>
  );
};

export default BloodPressureChart;