// 📊 Bar Chart Component
// Custom bar chart for analytics data visualization

import React from 'react';

const BarChart = ({ 
  data, 
  width = 400, 
  height = 200, 
  color = '#DC2626',
  title,
  xLabel,
  yLabel,
  horizontal = false 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const barWidth = horizontal ? chartHeight / data.length * 0.8 : chartWidth / data.length * 0.8;
  const barSpacing = horizontal ? chartHeight / data.length * 0.2 : chartWidth / data.length * 0.2;

  const getBarColor = (index) => {
    const colors = [
      '#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA',
      '#B91C1C', '#991B1B', '#7F1D1D', '#450A0A'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Grid lines */}
          <defs>
            <pattern id="barGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#barGrid)" />

          {horizontal ? (
            // Horizontal Bar Chart
            <>
              {/* Y-axis labels (categories) */}
              {data.map((item, index) => {
                const y = padding + index * (chartHeight / data.length) + (chartHeight / data.length) / 2;
                return (
                  <text
                    key={index}
                    x={padding - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="text-xs fill-gray-600"
                  >
                    {item.label}
                  </text>
                );
              })}

              {/* X-axis labels (values) */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const x = padding + ratio * chartWidth;
                const value = Math.round(ratio * maxValue);
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
                      {value}
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {data.map((item, index) => {
                const barLength = (item.value / maxValue) * chartWidth;
                const y = padding + index * (chartHeight / data.length) + barSpacing / 2;
                
                return (
                  <g key={index}>
                    <rect
                      x={padding}
                      y={y}
                      width={barLength}
                      height={barWidth}
                      fill={getBarColor(index)}
                      className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                      rx="4"
                    />
                    
                    {/* Value label */}
                    <text
                      x={padding + barLength + 5}
                      y={y + barWidth / 2 + 4}
                      className="text-xs fill-gray-700 font-medium"
                    >
                      {item.value}
                    </text>
                  </g>
                );
              })}
            </>
          ) : (
            // Vertical Bar Chart
            <>
              {/* Y-axis labels (values) */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const y = padding + ratio * chartHeight;
                const value = Math.round(maxValue - ratio * maxValue);
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

              {/* X-axis labels (categories) */}
              {data.map((item, index) => {
                const x = padding + index * (chartWidth / data.length) + (chartWidth / data.length) / 2;
                return (
                  <text
                    key={index}
                    x={x}
                    y={height - padding + 18}
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {item.label}
                  </text>
                );
              })}

              {/* Bars */}
              {data.map((item, index) => {
                const barHeight = (item.value / maxValue) * chartHeight;
                const x = padding + index * (chartWidth / data.length) + barSpacing / 2;
                const y = height - padding - barHeight;
                
                return (
                  <g key={index}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={getBarColor(index)}
                      className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                      rx="4"
                    />
                    
                    {/* Value label */}
                    <text
                      x={x + barWidth / 2}
                      y={y - 5}
                      textAnchor="middle"
                      className="text-xs fill-gray-700 font-medium"
                    >
                      {item.value}
                    </text>
                  </g>
                );
              })}
            </>
          )}

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

export default BarChart;
