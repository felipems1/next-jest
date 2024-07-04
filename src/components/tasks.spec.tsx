import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tasks } from './tasks'

describe('Tasks', () => {
  it('should show my tasks message', () => {
    render(<Tasks />)

    const title = screen.getByText('Minhas Tarefas')

    expect(title).toBeDefined()
  })

  it('should show task input', () => {
    render(<Tasks />)

    const input = screen.getByPlaceholderText('Digite o nome da tarefa')

    expect(input).toBeDefined()
  })

  it('should show add button', () => {
    render(<Tasks />)

    expect(screen.getByLabelText('Adicionar tarefa')).toBeDefined()
  })

  it('should add task on add click', async () => {
    render(<Tasks />)

    const input = screen.getByPlaceholderText('Digite o nome da tarefa')

    const taskTitle = 'Nova tarefa'

    await userEvent.type(input, taskTitle)

    screen.getByDisplayValue(taskTitle)

    const addButton = screen.getByLabelText('Adicionar tarefa')

    await userEvent.click(addButton)

    screen.getByPlaceholderText('Digite o nome da tarefa')

    expect(screen.queryAllByText(taskTitle)).toHaveLength(1)
  })

  it('should delete task on delete click', async () => {
    // Add Task
    render(<Tasks />)

    const input = screen.getByPlaceholderText('Digite o nome da tarefa')

    const taskTitle = 'Nova tarefa'

    await userEvent.type(input, taskTitle)

    screen.getByDisplayValue(taskTitle)

    const addButton = screen.getByLabelText('Adicionar tarefa')

    await userEvent.click(addButton)

    // Remove task

    const deleteButton = screen.getByLabelText(`Remove tarefa: ${taskTitle}`)

    await userEvent.click(deleteButton)

    const deletedTask = screen.queryByText(taskTitle)

    expect(deletedTask).toBeNull()
  })
})
