'use client'

import { Task } from '@/types/task'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  const { register, handleSubmit, resetField } = useForm<{ title: string }>()

  const handleAddClick = (data: { title: string }) => {
    setTasks((prev) => [
      ...prev,
      { id: uuid(), title: data.title, IsCompleted: false },
    ])
    resetField('title')
  }

  const handleRemoveClick = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-5 bg-slate-900 py-10">
      <h1 className="text-2xl font-bold text-white">Minhas Tarefas</h1>
      <div className="flex w-full max-w-[90%] gap-4 lg:max-w-[500px]">
        <input
          type="text"
          placeholder="Digite o nome da tarefa"
          className="w-full rounded-lg border border-slate-500 bg-slate-900 px-4 py-4 text-white outline-none"
          {...register('title', { required: true })}
        />
        <button
          aria-label="Adicionar tarefa"
          onClick={() => handleSubmit(handleAddClick)()}
          className="rounded-lg bg-green-500 px-5 py-2 font-semibold hover:bg-green-600"
        >
          Adicionar
        </button>
      </div>

      <div className="flex w-full max-w-[90%] flex-col gap-5 lg:max-w-[500px]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between rounded-lg border-none bg-slate-700 px-4 py-4 font-semibold text-white"
          >
            <h1>{task.title}</h1>
            <button
              aria-label={`Remove tarefa: ${task.title}`}
              onClick={() => handleRemoveClick(task.id)}
            >
              <Trash2 size={20} color="red" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
