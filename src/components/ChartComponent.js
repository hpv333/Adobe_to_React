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

const ChartComponent = ({ patient }) => {
  const chartRef = useRef(null);
  console.log("patient data in Chart Component: ............", patient);
  
  // Clean up chart instance on unmount to prevent "Canvas is already in use" error
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Handle missing patient data gracefully
  if (!patient || !patient.diagnosis_history) {
    return <div>No patient data available</div>;
  }

  // Get the last 6 months of data
  const recentHistory = [...patient.diagnosis_history]
    .sort((a, b) => {
      // Create date objects for comparison
      const dateA = new Date(`${a.month} 1, ${a.year}`);
      const dateB = new Date(`${b.month} 1, ${b.year}`);
      return dateA - dateB;
    })
    .slice(-6);
  
  // Extract data for the chart
  const dates = recentHistory.map(entry => `${entry.month.substring(0, 3)}, ${entry.year}`);
  
  // Check if blood pressure data exists and extract it
  const systolicData = recentHistory.map(entry => 
    entry.blood_pressure && entry.blood_pressure.systolic ? entry.blood_pressure.systolic : null
  ).filter(value => value !== null);
  
  const diastolicData = recentHistory.map(entry => 
    entry.blood_pressure && entry.blood_pressure.diastolic ? entry.blood_pressure.diastolic : null
  ).filter(value => value !== null);

  // If no data available, show a message
  if (dates.length === 0 || (systolicData.length === 0 && diastolicData.length === 0)) {
    return <div>No blood pressure data available</div>;
  }
  console.log("Blood pressure data ................",  systolicData, diastolicData);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Systolic",
        data: systolicData,
        borderColor: "#FF6384", // Light pink
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 6, // Larger visible points
        pointBackgroundColor: "#FFFFFF", // White dots with border
        pointBorderColor: "#FF6384",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        tension: 0.1, // Less curve, more straight lines
        fill: false,
      },
      {
        label: "Diastolic",
        data: diastolicData,
        borderColor: "#9C54DE", // Purple color
        backgroundColor: "rgba(138, 43, 226, 0.2)",
        borderWidth: 2,
        pointRadius: 6, // Larger visible points
        pointBackgroundColor: "#FFFFFF", // White dots with border
        pointBorderColor: "#9C54DE",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        tension: 0.1, // Less curve, more straight lines
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 40,
        max: 200,
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
          display: true,
          text: 'Blood Pressure (mmHg)',
          font: {
            size: 13,
            weight: 'normal',
            family: "'Arial', sans-serif"
          },
          color: '#555555',
          padding: {
            bottom: 10
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        border: {
          display: true,
          color: '#E0E0E0'
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
          display: true,
          text: 'Date',
          font: {
            size: 13,
            weight: 'normal',
            family: "'Arial', sans-serif"
          },
          color: '#555555',
          padding: {
            top: 10
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
            family: "'Arial', sans-serif"
          },
          usePointStyle: false
        }
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
        display: true,
        text: 'Blood Pressure History',
        font: {
          size: 16,
          weight: 'normal',
          family: "'Arial', sans-serif"
        },
        color: '#333333',
        padding: {
          top: 10,
          bottom: 20
        }
      }
    }
  };

  return (
    <div style={{ height: "400px" }}>
      {/* <Line 
        data={chartData} 
        options={chartOptions} 
        ref={chartRef}
      /> */}
    </div>
  );
};

export default ChartComponent;