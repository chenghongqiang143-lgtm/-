import React from 'react';
import { Task } from '../types';
import { getContrastColor, cn } from '../utils';
import { Edit2 } from 'lucide-react';

interface TaskBlockProps {
  task: Task;
  onClick?: () => void;
  onDoubleClick?: () => void;
  selected?: boolean;
  className?: string;
  showEditIcon?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const TaskBlock: React.FC<TaskBlockProps> = ({ 
  task, 
  onClick, 
  onDoubleClick, 
  selected, 
  className,
  showEditIcon = false,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const textColor = getContrastColor(task.color);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragStart) {
      onDragStart(e, task);
    }
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={cn(
        "relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 select-none group border border-black/5",
        draggable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
        selected 
          ? "ring-2 ring-stone-900 ring-offset-2 scale-[1.02] shadow-xl z-10" 
          : "hover:shadow-lg hover:-translate-y-0.5 shadow-sm",
        className
      )}
      style={{ 
        backgroundColor: task.color, 
        color: textColor,
      }}
    >
      {/* Gloss Effect Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      
      <div className="flex flex-col overflow-hidden pointer-events-none z-10">
        <span className="font-bold truncate tracking-wide text-[13px]">{task.name}</span>
      </div>
      
      {showEditIcon && (
        <div className="z-10 opacity-60 ml-2 group-hover:opacity-100 transition-opacity bg-black/10 p-1.5 rounded-full">
            <Edit2 size={12} />
        </div>
      )}
    </div>
  );
};