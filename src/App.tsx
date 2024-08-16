import { useState, ChangeEvent } from 'react';
import './App.css';

interface Task {
  text: string;
  completed: boolean;
}

interface Video {
  link: string;
}

const videos: Array<Video> = [
  { link: 'https://www.youtube.com/watch?v=KvknOXGPzCQ' },
  { link: 'https://www.youtube.com/watch?v=tVEjZ0ifOoI' },
  { link: 'https://www.youtube.com/watch?v=fbp0bET06wc' },
  { link: 'https://www.youtube.com/watch?v=XOzs1FehYOA' },
  { link: 'https://www.youtube.com/watch?v=BDeGSXVDihk' },
  { link: 'https://www.youtube.com/watch?v=C_0O2r8qU18' },
  { link: 'https://www.youtube.com/watch?v=f0pdwd0miqs' },
  { link: 'https://www.youtube.com/watch?v=gEXbHKAuHSg' },
  { link: 'https://www.youtube.com/watch?v=mLa0-sQg1YM' },
  { link: 'https://www.youtube.com/watch?v=WPpDyIJdasg' },
];

function App() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const handleAddTask = (): void => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const handleTaskClick = (index: number): void => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);

    if (!newTasks[index].completed) return; // Solo cambia el video si la tarea se completa

    let newVideo: string;
    do {
      const randomVideo = videos[Math.floor(Math.random() * videos.length)].link;
      newVideo = randomVideo.replace('watch?v=', 'embed/');
    } while (newVideo === currentVideo);

    setCurrentVideo(newVideo);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTask(e.target.value);
  };

  return (
    <div className="App">
      <h1>Tareas del día</h1>
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Agrega una nueva tarea"
      />
      <button onClick={handleAddTask}>Agregar</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => handleTaskClick(index)}
            className={task.completed ? 'completed' : ''}
          >
            {task.text}
          </li>
        ))}
      </ul>

      {currentVideo && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>¡Disfruta este video por completar tu tarea!</h2>
          <iframe
            width="560"
            height="315"
            src={currentVideo}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default App;
