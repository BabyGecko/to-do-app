import { useState } from 'react';
import './App.sass';

function App() {
  const [tasks, setTasks] = useState([])
  const [inputText, setInputText] = useState("")
  const [redactTask, setRedactTask] = useState(null)
  const [redactTab, setRedactTab] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [tabs, setTabs] = useState(
    [
      {
        id: 0,
        "tabName": "New Tab"
      }
    ]
  )
  function addTab(event) {
    event.preventDefault()
    let nextTabs = [...tabs]
    nextTabs.push({
      tabName: "New Tab"
    })
    setTabs(nextTabs)
  }
  function handleSubmit(event) {
    event.preventDefault()
    if (inputText != "") {
      let nextTasks = [...tasks]
      nextTasks.push({
        text: inputText,
        tab: activeTab,
        checked: false,
      })
      setTasks(nextTasks)
      setInputText("")
    }
  }
  function changeElement(event, id) {
    event.preventDefault()
    setRedactTask(rt => rt === null ? id : null)
  }
  function endTabChange(event, id) {
    event.preventDefault()
    let nextTabs = [...tabs]
    nextTabs[id].tabName = event.target.value
    setTabs(nextTabs)
  }
  function endChange(event, id) {
    event.preventDefault()
    let nextTasks = [...tasks]
    nextTasks[id].text = event.target.value
    setTasks(nextTasks)
  }
  function deleteElement(event, id) {
    event.preventDefault()
    let nextTasks = [...tasks]
    nextTasks.splice(id, 1)
    setTasks(nextTasks)
    setRedactTask(null)
  }
  function deleteTab(event, id) {
    event.preventDefault()
    let nextTabs = [...tabs]
    nextTabs.splice(id, 1)
    setTabs(nextTabs)
    let nextTasks = tasks.filter(task => task.tab !== id);
    setTasks(nextTasks.map(task => task.tab > id ? { ...task, tab: task.tab - 1 } : task));
    setActiveTab(at => activeTab === id ? (id === 0 ? 0 : id - 1) : at)
    setRedactTab(null)
  }
  function deleteAll(event) {
    event.preventDefault()
    let nextTasks = []
    setTasks(nextTasks)
    setRedactTask(null)
    setRedactTab(null)
  }
  function checkTask(id) {
    let nextTasks = [...tasks]
    nextTasks[id].checked = nextTasks[id].checked ? false : true
    setTasks(nextTasks)
  }
  //start
  return (
    <div className="App">
      <form action="">
        <h1>To Do App</h1>
        <div className="tabs">
          <button type='button' className='newTab' onClick={(event) => addTab(event)}>+Tab</button>
          <div className="tabContainer">
            {
              tabs.map((tab, id) =>
                <div class="tab">
                  <button type='button' className={activeTab === id ? "activeTab " : ""} onClick={() => setActiveTab(id)} onDoubleClick={() => setRedactTab(id)}>{redactTab === id ? <input type="text" value={tab.tabName} onChange={(event) => endTabChange(event, id)} /> : tab.tabName}</button>
                  {tabs.length > 1 && <button className='deleteTab' onClick={(event) => deleteTab(event, id)}>🕀</button>}
                  {redactTab === id && <button className='finishTabChange' onClick={() => setRedactTab(null)}>✔️</button>}
                </div>
              )
            }
          </div>

        </div>
        <ol>
          {
            tasks.map((task, id) =>
              activeTab === task.tab && <li key={id}>
                {
                  redactTask === id ?
                    <textarea name="" id="" cols="30" rows="5" value={task.text} onChange={(event) => endChange(event, id)}></textarea> : <p onClick={() => checkTask(id)} className={task.checked ? 'checked ' : ''}>{task.text}</p>
                }
                <div className="actions">
                  <button type='button' onClick={(event) => changeElement(event, id)}>
                    {
                      redactTask === id ?
                        "✔️" : "🖊️"
                    }
                  </button>
                  <button type='button' onClick={(event) => deleteElement(event, id)}>🗑️</button>
                </div>
              </li>
            )
          }
        </ol>
        <div className="inputs">
          <input onChange={(event) => setInputText(event.target.value)} type="text" value={inputText} />
          <button onClick={(event) => handleSubmit(event)}>✔️</button>
          <button type='button' onClick={(event) => deleteAll(event)}>🧹</button>
        </div>

      </form>
    </div>
  );
}

export default App;
//brush clears all
