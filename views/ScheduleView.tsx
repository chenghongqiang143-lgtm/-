import React, { useState } from 'react';
import { Task, DayData, HOURS } from '../types';
import { TimelineRow } from '../components/TimelineRow';
import { TaskBlock } from '../components/TaskBlock';
import { TaskEditorModal } from '../components/TaskEditorModal';
import { Repeat } from 'lucide-react';

interface ScheduleViewProps {
  tasks: Task[];
  dayData: DayData;
  onUpdateHour: (hour: number, taskIds: string[]) => void;
  onUpdateTask: (task: Task) => void;
  onRepeatTask: (taskId: string, hour: number) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  tasks,
  dayData,
  onUpdateHour,
  onUpdateTask,
  onRepeatTask
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [repeatMode, setRepeatMode] = useState(false);

  // Group tasks by category
  const categories = Array.from(new Set(tasks.map(t => t.category || '未分类'))).sort();

  // --- Click Logic ---
  const handleHourClick = (hour: number) => {
    if (repeatMode && selectedTaskId) {
       onRepeatTask(selectedTaskId, hour);
       setRepeatMode(false);
       return;
    }

    const currentTasks = dayData.hours[hour] || [];
    
    if (selectedTaskId) {
      if (currentTasks.includes(selectedTaskId)) {
        onUpdateHour(hour, currentTasks.filter(id => id !== selectedTaskId));
      } else {
        if (currentTasks.length < 4) {
             onUpdateHour(hour, [...currentTasks, selectedTaskId]);
        } else {
             onUpdateHour(hour, [...currentTasks.slice(1), selectedTaskId]);
        }
      }
    } else {
        onUpdateHour(hour, []);
    }
  };

  const handleTaskDrop = (hour: number, taskId: string) => {
      const currentTasks = dayData.hours[hour] || [];
      if (!currentTasks.includes(taskId)) {
          if (currentTasks.length < 4) {
              onUpdateHour(hour, [...currentTasks, taskId]);
          } else {
              onUpdateHour(hour, [...currentTasks.slice(1), taskId]);
          }
      }
  };

  const handleTaskDoubleClick = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Left: Task List */}
      <div className="w-[150px] border-r border-stone-100 bg-[#fafaf9] flex flex-col h-full">
        <div className="p-4 z-10 sticky top-0 bg-[#fafaf9]/95 backdrop-blur border-b border-stone-50">
          <h2 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">任务池</h2>
          {selectedTaskId && (
              <div className="flex items-center gap-2 mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                 <button 
                    onClick={() => setRepeatMode(!repeatMode)}
                    className={`text-[10px] w-full justify-center flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all ${repeatMode ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'}`}
                 >
                    <Repeat size={10} /> {repeatMode ? '点击时间' : '设置重复'}
                 </button>
              </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-24 space-y-6 pt-4">
          {categories.map(cat => (
            <div key={cat}>
               <div className="flex items-center gap-2 mb-2 ml-1">
                   <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                   <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{cat}</h3>
               </div>
               <div className="space-y-3">
                  {tasks.filter(t => (t.category || '未分类') === cat).map(task => (
                    <TaskBlock
                      key={task.id}
                      task={task}
                      selected={selectedTaskId === task.id}
                      onClick={() => setSelectedTaskId(task.id === selectedTaskId ? null : task.id)}
                      onDoubleClick={() => handleTaskDoubleClick(task)}
                      className="w-full"
                      showEditIcon
                      draggable={true}
                    />
                  ))}
               </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="text-center py-10 text-stone-300 text-xs px-2">
                点击右下角设置去添加任务
            </div>
          )}
        </div>
      </div>

      {/* Right: Timeline */}
      <div className="flex-1 overflow-y-auto relative bg-white h-full pb-20">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 px-4 py-3 flex justify-between items-center border-b border-stone-50">
             <span className="text-xs font-bold text-stone-800 tracking-wider uppercase">时间轴</span>
             {selectedTaskId ? <span className="text-[10px] text-primary font-medium bg-primary/5 px-2 py-1 rounded-full">点击添加</span> : <span className="text-[10px] text-stone-400">选择任务后点击</span>}
        </div>
        <div className="pt-2 pb-32">
          {HOURS.map(hour => (
            <TimelineRow
              key={hour}
              hour={hour}
              assignedTaskIds={dayData.hours[hour] || []}
              allTasks={tasks}
              onClick={handleHourClick}
              onTaskDrop={handleTaskDrop}
              showDuration={true}
            />
          ))}
        </div>
      </div>

      <TaskEditorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={editingTask}
        onSave={(updated) => {
            onUpdateTask(updated);
            setEditingTask(null);
        }}
      />
    </div>
  );
};