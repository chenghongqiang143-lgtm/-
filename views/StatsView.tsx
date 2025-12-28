import React, { useState, useMemo } from 'react';
import { Task, DayData, HOURS } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { FileText, Calendar, TrendingUp } from 'lucide-react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { formatDate } from '../utils';

interface StatsViewProps {
  tasks: Task[];
  scheduleData: DayData;
  recordData: DayData;
  allSchedules: Record<string, DayData>;
  allRecords: Record<string, DayData>;
  review: string;
  onUpdateReview: (text: string) => void;
  currentDate: string;
  dateObj: Date;
}

export const StatsView: React.FC<StatsViewProps> = ({
  tasks,
  scheduleData,
  recordData,
  allSchedules,
  allRecords,
  review,
  onUpdateReview,
  currentDate,
  dateObj
}) => {
  const [showMonthly, setShowMonthly] = useState(false);

  const getTaskColor = (id: string) => tasks.find(t => t.id === id)?.color || '#e5e7eb';

  const dailyStats = useMemo(() => {
    const plannedCounts: Record<string, number> = {};
    const actualCounts: Record<string, number> = {};
    
    HOURS.forEach(h => {
        const planned = scheduleData.hours[h] || [];
        planned.forEach(tid => plannedCounts[tid] = (plannedCounts[tid] || 0) + 1);

        const actual = recordData.hours[h] || [];
        actual.forEach(tid => actualCounts[tid] = (actualCounts[tid] || 0) + (1 / actual.length)); 
    });

    return tasks.map(t => {
        const planned = plannedCounts[t.id] || 0;
        const actual = actualCounts[t.id] || 0;
        const percentage = planned > 0 ? Math.round((actual / planned) * 100) : (actual > 0 ? 100 : 0);
        return {
            ...t,
            planned,
            actual: parseFloat(actual.toFixed(1)),
            percentage
        };
    }).filter(t => t.planned > 0 || t.actual > 0).sort((a,b) => b.percentage - a.percentage);
  }, [tasks, scheduleData, recordData]);

  const monthlyStats = useMemo(() => {
    if (!showMonthly) return [];
    const start = startOfMonth(dateObj);
    const end = endOfMonth(dateObj);
    const days = eachDayOfInterval({ start, end });

    return days.map(day => {
        const dKey = formatDate(day);
        const sched = allSchedules[dKey]?.hours || {};
        const rec = allRecords[dKey]?.hours || {};

        let totalPlannedSlots = 0;
        let completedSlots = 0;

        HOURS.forEach(h => {
            const pTasks = sched[h] || [];
            const rTasks = rec[h] || [];
            if (pTasks.length > 0) {
                totalPlannedSlots += pTasks.length;
                const matches = pTasks.filter(pid => rTasks.includes(pid)).length;
                completedSlots += matches;
            }
        });

        const score = totalPlannedSlots === 0 ? 0 : Math.round((completedSlots / totalPlannedSlots) * 100);

        return {
            date: format(day, 'd'),
            fullDate: dKey,
            score: score,
            hasPlan: totalPlannedSlots > 0
        };
    });
  }, [showMonthly, dateObj, allSchedules, allRecords]);

  const monthlyAverage = useMemo(() => {
      const activeDays = monthlyStats.filter(d => d.hasPlan);
      if (activeDays.length === 0) return 0;
      const sum = activeDays.reduce((acc, curr) => acc + curr.score, 0);
      return Math.round(sum / activeDays.length);
  }, [monthlyStats]);

  if (showMonthly) {
      return (
          <div className="flex flex-col h-full bg-stone-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
              <div className="p-6 bg-white shadow-sm z-10 rounded-b-[2rem]">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                        <div className="p-2.5 bg-indigo-50 rounded-2xl text-primary"><TrendingUp size={20} /></div>
                        月度概览
                    </h2>
                    <button 
                        onClick={() => setShowMonthly(false)}
                        className="text-xs font-bold text-stone-500 hover:text-stone-800 bg-stone-100 px-4 py-2 rounded-full transition-colors"
                    >
                        返回
                    </button>
                  </div>
                  <div className="flex items-end gap-3 text-stone-600 pl-1">
                      <span className="text-6xl font-bold text-primary tracking-tighter leading-none">{monthlyAverage}<span className="text-3xl">%</span></span>
                      <span className="text-sm font-medium bg-stone-100 text-stone-500 px-3 py-1 rounded-full mb-1">平均达成率</span>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm h-72 w-full">
                      <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">执行趋势</h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyStats} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#d6d3d1' }} axisLine={false} tickLine={false} interval={2} />
                            <YAxis tick={{ fontSize: 9, fill: '#d6d3d1' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                            <Tooltip 
                                cursor={{ fill: '#fafaf9' }}
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                                formatter={(value: number) => [`${value}%`]}
                                labelStyle={{ display: 'none' }}
                            />
                            <Bar dataKey="score" radius={[4, 4, 4, 4]}>
                                {monthlyStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.hasPlan ? (entry.score >= 80 ? '#10b981' : entry.score >= 50 ? '#6366f1' : '#f43f5e') : '#f5f5f4'} />
                                ))}
                            </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-5 rounded-[2rem] shadow-sm">
                          <div className="text-[10px] text-stone-400 font-bold uppercase mb-2">完美达成</div>
                          <div className="text-3xl font-bold text-emerald-500">
                              {monthlyStats.filter(d => d.score === 100 && d.hasPlan).length}
                              <span className="text-sm text-stone-400 font-medium ml-1">天</span>
                          </div>
                      </div>
                      <div className="bg-white p-5 rounded-[2rem] shadow-sm">
                          <div className="text-[10px] text-stone-400 font-bold uppercase mb-2">计划天数</div>
                          <div className="text-3xl font-bold text-indigo-500">
                              {monthlyStats.filter(d => d.hasPlan).length}
                              <span className="text-sm text-stone-400 font-medium ml-1">天</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] pb-24">
        {/* Top: Dual Timelines */}
        <div className="flex-1 min-h-[280px] m-4 bg-white rounded-[2rem] shadow-soft border border-stone-50 flex overflow-hidden">
             {/* Left: Schedule */}
             <div className="flex-1 overflow-y-auto border-r border-stone-50 bg-white">
                <div className="sticky top-0 bg-white/95 backdrop-blur p-3 text-center text-[10px] font-bold text-primary/80 uppercase tracking-widest z-10 border-b border-stone-50">计划</div>
                <div className="pb-4">
                {HOURS.map(h => {
                    const tIds = scheduleData.hours[h] || [];
                    return (
                        <div key={h} className="h-8 border-b border-stone-50/50 flex items-center px-2 hover:bg-stone-50/50 transition-colors">
                             <span className="w-6 text-[9px] text-stone-300 font-mono">{h}</span>
                             <div className="flex-1 flex h-full py-[4px] gap-[2px]">
                                {tIds.map((tid, i) => (
                                    <div key={i} className="flex-1 rounded-[6px]" style={{ backgroundColor: getTaskColor(tid) }} />
                                ))}
                             </div>
                        </div>
                    );
                })}
                </div>
             </div>
             
             {/* Right: Record */}
             <div className="flex-1 overflow-y-auto bg-stone-50/30">
                <div className="sticky top-0 bg-[#fafaf9]/95 backdrop-blur p-3 text-center text-[10px] font-bold text-secondary/80 uppercase tracking-widest z-10 border-b border-stone-50">实际</div>
                <div className="pb-4">
                {HOURS.map(h => {
                    const tIds = recordData.hours[h] || [];
                    return (
                        <div key={h} className="h-8 border-b border-stone-50/50 flex items-center px-2 hover:bg-stone-50/50 transition-colors">
                             <div className="flex-1 flex h-full py-[4px] gap-[2px]">
                                {tIds.map((tid, i) => (
                                    <div key={i} className="flex-1 rounded-[6px]" style={{ backgroundColor: getTaskColor(tid) }} />
                                ))}
                             </div>
                        </div>
                    );
                })}
                </div>
             </div>
        </div>

        {/* Middle: Adherence Stats */}
        <div className="h-auto bg-white mx-4 mb-4 rounded-[2rem] shadow-soft border border-stone-50 p-5">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">今日执行度</h3>
                 <button onClick={() => setShowMonthly(true)} className="text-[10px] flex items-center gap-1.5 text-primary bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors font-bold">
                    <Calendar size={12} /> 月度分析
                 </button>
             </div>
             <div className="space-y-3 max-h-[140px] overflow-y-auto pr-1">
                 {dailyStats.map(stat => (
                     <div key={stat.id} className="flex items-center gap-3">
                         <div className="w-16 text-[11px] truncate font-medium text-stone-500">{stat.name}</div>
                         <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                             <div 
                                className="h-full rounded-full transition-all duration-700 ease-out" 
                                style={{ width: `${Math.min(stat.percentage, 100)}%`, backgroundColor: stat.color }}
                             />
                         </div>
                         <div className="w-8 text-[11px] text-right font-mono font-bold text-stone-600">{stat.percentage}%</div>
                     </div>
                 ))}
                 {dailyStats.length === 0 && <p className="text-[10px] text-center text-stone-300 py-2">暂无数据</p>}
             </div>
        </div>

        {/* Bottom: Review */}
        <div className="mx-4 mb-4">
             <div className="relative group">
                <div className="absolute top-3 left-3 text-stone-400">
                    <FileText size={14} />
                </div>
                <textarea
                    className="w-full h-20 bg-white border border-stone-100 rounded-[1.5rem] pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 resize-none shadow-soft transition-all placeholder:text-stone-300"
                    placeholder="写下今日复盘..."
                    value={review}
                    onChange={(e) => onUpdateReview(e.target.value)}
                />
             </div>
        </div>
    </div>
  );
};