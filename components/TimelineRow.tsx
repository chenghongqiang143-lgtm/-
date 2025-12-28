import React, { useState } from 'react';
import { Task } from '../types';
import { getContrastColor, cn } from '../utils';

interface TimelineRowProps {
  hour: number;
  assignedTaskIds: string[];
  allTasks: Task[];
  onClick: (hour: number) => void;
  onTaskDrop?: (hour: number, taskId: string) => void;
  maxTasks?: number;
  showDuration?: boolean;
}

export const TimelineRow: React.FC<TimelineRowProps> = ({
  hour,
  assignedTaskIds,
  allTasks,
  onClick,
  onTaskDrop,
  showDuration = false,
}) => {
  const [isOver, setIsOver] = useState(false);

  const assignedTasks = assignedTaskIds
    .map(id => allTasks.find(t => t.id === id))
    .filter((t): t is Task => !!t);

  const formatHour = (h: number) => `${h.toString().padStart(2, '0')}:00`;

  const durationPerTask = assignedTasks.length > 0 ? Math.floor(60 / assignedTasks.length) : 0;
  const durationText = durationPerTask > 0 ? `${durationPerTask}m` : '';

  // Drag Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isOver && onTaskDrop) setIsOver(true);
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    if (onTaskDrop) {
      const taskId = e.dataTransfer.getData('taskId');
      if (taskId) {
        onTaskDrop(hour, taskId);
      }
    }
  };

  return (
    <div 
      className={cn(
        "flex h-16 transition-all duration-200 group px-4 relative",
        isOver ? "bg-indigo-50/50" : "hover:bg-stone-50/50"
      )}
      onClick={() => onClick(hour)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
        {/* Horizontal Guide Line */}
        <div className="absolute top-0 left-14 right-4 h-px bg-stone-100/80 group-hover:bg-stone-200 transition-colors" />

      {/* Time Label */}
      <div className={cn(
        "w-14 flex-shrink-0 flex items-start pt-2 justify-start text-[11px] font-medium transition-colors font-mono tracking-tight",
        isOver ? "text-primary" : "text-stone-300 group-hover:text-stone-400"
      )}>
        {formatHour(hour)}
      </div>

      {/* Task Area */}
      <div className="flex-1 flex gap-2 py-2 overflow-hidden relative cursor-pointer z-10">
        {assignedTasks.length === 0 ? (
          <div className={cn(
            "w-full h-full rounded-2xl border-2 border-dashed flex items-center justify-center transition-all duration-300",
             isOver ? "border-primary/30 bg-primary/5 text-primary scale-100 opacity-100" : "border-stone-100 text-stone-300 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100"
          )}>
             <span className="text-xl font-light pb-1">+</span>
          </div>
        ) : (
          assignedTasks.map((task, idx) => (
            <div
              key={`${task.id}-${idx}`}
              className="flex-1 h-full rounded-2xl flex flex-col items-center justify-center text-xs font-semibold truncate px-2 shadow-sm leading-none transition-all hover:-translate-y-0.5 border border-black/5 animate-in fade-in zoom-in-75 duration-300 ease-out"
              style={{ 
                backgroundColor: task.color, 
                color: getContrastColor(task.color) 
              }}
            >
               {/* Gloss */}
               <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              <span className={cn("truncate w-full text-center relative z-10", showDuration && "mb-0.5")}>{task.name}</span>
              {showDuration && <span className="text-[9px] opacity-70 font-normal font-mono relative z-10">{durationText}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};