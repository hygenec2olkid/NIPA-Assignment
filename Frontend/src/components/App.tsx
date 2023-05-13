import BasicTabs from './tabs'
import CheckIcon from '@mui/icons-material/Check'

function App() {
  return (
    <div>
      <header className="mx-16 mt-16 mb-6">
        <CheckIcon style={{ fontSize: 40 }} />
        <span className="text-2xl">Simple helpdesk</span>
        <span>
          <br />
          Use this template to track your personal tasks. Click + New to create
          <br />
          a new task directly on this board. Click an existing task to add
          <br />
          additional context or subtasks.
        </span>
      </header>
      <main className="px-16">
        <BasicTabs />
      </main>
    </div>
  )
}

export default App
