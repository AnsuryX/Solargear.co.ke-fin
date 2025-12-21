import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HelpCircle, DollarSign, ShieldAlert, Frown } from 'lucide-react';

const data = [
  { month: 'Jan', bill: 12000 },
  { month: 'Feb', bill: 13500 },
  { month: 'Mar', bill: 15000 },
  { month: 'Apr', bill: 18000 },
  { month: 'May', bill: 22000 },
  { month: 'Jun', bill: 26500 },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Why Solar Gear Exists <br />
              <span className="text-gold text-2xl md:text-3xl block mt-2">Most people want solar… but:</span>
            </h2>
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-900/20 rounded-full text-red-400 mt-1">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl">Installers overcomplicate everything</h4>
                  <p className="text-gray-400">Tech jargon and confusing specs that leave you unsure.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-900/20 rounded-full text-orange-400 mt-1">
                  <DollarSign size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl">Prices feel random and inflated</h4>
                  <p className="text-gray-400">Quotes that vary wildly for the same equipment.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-900/20 rounded-full text-yellow-400 mt-1">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl">You don’t know who to trust</h4>
                  <p className="text-gray-400">Fear of low-quality parts or fly-by-night contractors.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-full text-gray-400 mt-1">
                  <Frown size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl">Scared of paying and regretting</h4>
                  <p className="text-gray-400">A major investment shouldn't feel like a gamble.</p>
                </div>
              </div>
            </div>

            <p className="text-white text-lg leading-relaxed mt-8 font-light border-l-4 border-gold pl-6">
              Solar Gear was built to fix all of that. We focus on <span className="text-gold font-bold">clarity, honesty, and results</span>. No tech jargon. No pressure. No funny business.
            </p>
          </div>

          {/* Graphic Content */}
          <div className="lg:w-1/2 w-full glass-panel p-8 rounded-xl border border-white/5 relative">
            <div className="absolute -top-4 -right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Reality Check
            </div>
            <h3 className="text-white mb-6 font-semibold">Electricity Prices Won't Go Down</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorBill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" unit=" KES" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#D4AF37' }}
                  />
                  <Area type="monotone" dataKey="bill" stroke="#D4AF37" fillOpacity={1} fill="url(#colorBill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Your bills don't have to go up. Take control the smart way.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};