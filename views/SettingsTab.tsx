import React, { useState } from 'react';
import { Task } from '../types';
import { TaskBlock } from '../components/TaskBlock';
import { TaskEditorModal } from '../components/TaskEditorModal';
import { Plus } from 'lucide-react';

interface SettingsTabProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Group tasks by category
  const categories = Array.from(new Set(tasks.map(t => t.category)));

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleSave = (task: Task) => {
    if (editingTask) {
        onUpdateTask(task);
    } else {
        onAddTask(task);
    }
  };

  return (
    <div className="h-full bg-background overflow-y-auto p-4 pb-24">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-background/95 backdrop-blur z-10 py-2">
        <h2 className="text-xl font-bold text-stone-800 tracking-tight">设置</h2>
        <button 
            onClick={handleNew}
            className="bg-stone-900 text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md shadow-stone-900/20 hover:bg-stone-800 hover:scale-105 transition-all"
        >
            <Plus size={16} /> <span className="text-xs font-medium">添加</span>
        </button>
      </div>

      <div className="space-y-5">
        {categories.map(cat => (
            <div key={cat}>
                <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">{cat}</h3>
                <div className="grid grid-cols-2 gap-2">
                    {tasks.filter(t => t.category === cat).map(task => (
                        <TaskBlock 
                            key={task.id} 
                            task={task} 
                            onClick={() => handleEdit(task)}
                            showEditIcon
                            className="h-12 px-3 text-xs"
                        />
                    ))}
                </div>
            </div>
        ))}

        {tasks.length === 0 && (
            <div className="text-center py-10 text-stone-300 text-sm">
                未定义任务块。请创建一个！
            </div>
        )}
      </div>

      <TaskEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSave}
        onDelete={onDeleteTask}
      />
    </div>
  );
};