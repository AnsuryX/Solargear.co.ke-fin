
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', bill: 12000 },
  { month: 'Feb', bill: 13500 },
  { month: 'Mar', bill: 15000 },
  { month: 'Apr', bill: 18000 },
  { month: 'May', bill: 22000 },
  { month: 'Jun', bill: 26500 },
];

export const BillChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorBill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" className="dark:stroke-[#333]" />
        <XAxis dataKey="month" stroke="#999" />
        <YAxis stroke="#999" unit=" KES" />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--tooltip-bg, #fff)', borderColor: '#ccc', color: 'var(--tooltip-text, #1A1A1A)' }}
          itemStyle={{ color: '#D4AF37' }}
        />
        <Area type="monotone" dataKey="bill" stroke="#D4AF37" fillOpacity={1} fill="url(#colorBill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
