// 📈 Line Chart Component
// Custom line chart for analytics data visualization

import React from 'react';

const LineChart = ({ 
  data, 
  width = 400, 
  height = 200, 
  color = '#DC2626',
  title,
  xLabel,
  yLabel 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  // Generate path for line
  const generatePath = () => {
    return data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + ((maxValue - point.value) / range) * chartHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Generate points for dots
  const generatePoints = () => {
    return data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + ((maxValue - point.value) / range) * chartHeight;
      return { x, y, value: point.value, label: point.label };
    });
  };

  const path = generatePath();
  const points = generatePoints();

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid)" />

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = padding + ratio * chartHeight;
            const value = Math.round(maxValue - ratio * range);
            return (
              <g key={index}>
                <line
                  x1={padding - 5}
                  y1={y}
                  x2={padding}
                  y2={y}
                  stroke="#6b7280"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-600"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {data.map((point, index) => {
            if (index % Math.ceil(data.length / 6) === 0 || index === data.length - 1) {
              const x = padding + (index / (data.length - 1)) * chartWidth;
              return (
                <g key={index}>
                  <line
                    x1={x}
                    y1={height - padding}
                    x2={x}
                    y2={height - padding + 5}
                    stroke="#6b7280"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={height - padding + 18}
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {point.label}
                  </text>
                </g>
              );
            }
            return null;
          })}

          {/* Area under line */}
          <path
            d={`${path} L ${padding + chartWidth} ${height - padding} L ${padding} ${height - padding} Z`}
            fill={color}
            fillOpacity="0.1"
          />

          {/* Main line */}
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="white"
                stroke={color}
                strokeWidth="3"
                className="hover:r-6 transition-all duration-200 cursor-pointer"
              />
              
              {/* Tooltip on hover */}
              <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                <rect
                  x={point.x - 25}
                  y={point.y - 35}
                  width="50"
                  height="25"
                  fill="black"
                  fillOpacity="0.8"
                  rx="4"
                />
                <text
                  x={point.x}
                  y={point.y - 18}
                  textAnchor="middle"
                  className="text-xs fill-white font-medium"
                >
                  {point.value}
                </text>
              </g>
            </g>
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#374151"
            strokeWidth="2"
          />
        </svg>

        {/* Labels */}
        {yLabel && (
          <div className="absolute left-2 top-1/2 transform -rotate-90 -translate-y-1/2">
            <span className="text-sm text-gray-600 font-medium">{yLabel}</span>
          </div>
        )}
        
        {xLabel && (
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600 font-medium">{xLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;
