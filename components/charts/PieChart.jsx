// 🥧 Pie Chart Component
// Custom pie chart for analytics data visualization

import React from 'react';

const PieChart = ({ 
  data, 
  size = 200, 
  title,
  showLegend = true,
  showPercentages = true 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2 - 20;
  const centerX = size / 2;
  const centerY = size / 2;

  const colors = [
    '#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA',
    '#B91C1C', '#991B1B', '#7F1D1D', '#450A0A', '#FEE2E2'
  ];

  // Calculate angles for each slice
  let currentAngle = -90; // Start from top
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    currentAngle += angle;

    // Calculate path for slice
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    // Calculate label position
    const labelAngle = (startAngle + endAngle) / 2;
    const labelAngleRad = (labelAngle * Math.PI) / 180;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos(labelAngleRad);
    const labelY = centerY + labelRadius * Math.sin(labelAngleRad);

    return {
      ...item,
      pathData,
      color: colors[index % colors.length],
      percentage: percentage.toFixed(1),
      labelX,
      labelY,
      angle: labelAngle
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      
      <div className="flex items-center justify-center space-x-8">
        {/* Pie Chart */}
        <div className="relative">
          <svg width={size} height={size} className="overflow-visible">
            {/* Slices */}
            {slices.map((slice, index) => (
              <g key={index}>
                <path
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="white"
                  strokeWidth="2"
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                />
                
                {/* Percentage labels */}
                {showPercentages && parseFloat(slice.percentage) > 5 && (
                  <text
                    x={slice.labelX}
                    y={slice.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-bold fill-white"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {slice.percentage}%
                  </text>
                )}
              </g>
            ))}
            
            {/* Center circle for donut effect */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius * 0.4}
              fill="white"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            
            {/* Total in center */}
            <text
              x={centerX}
              y={centerY - 8}
              textAnchor="middle"
              className="text-lg font-bold fill-gray-900"
            >
              {total}
            </text>
            <text
              x={centerX}
              y={centerY + 12}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              Total
            </text>
          </svg>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="space-y-2">
            {slices.map((slice, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: slice.color }}
                ></div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{slice.label}</div>
                  <div className="text-gray-600">
                    {slice.value} ({slice.percentage}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;
