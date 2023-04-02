import { useEffect, useState } from "react";
import axios from "axios";
import './index.css';

function App() {
  const [allLogs, setAllLogs] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getAllLogs = () => {
    axios
      .get("http://localhost:8080/api/logs")
      .then((res) => {
        setAllLogs(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/logs/${id}`)
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/logs", {
        title,
        content
      })
      .catch((error) => console.log(error));
    clearInput();
  };

  const clearInput = () => {
    setTitle("");
    setContent("");
  }

  useEffect(() => getAllLogs(), [allLogs]);

  return (
    <div className="App">
      <table className="w-full">
        <thead className="bg-blue-500 h-12 text-left">
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Published</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody className="bg-blue-200">
          {allLogs?.length > 0 &&
            allLogs.map((log) => {
              return (
                <tr key={log.id} className="h-8">
                  <td>{log.title}</td>
                  <td>{log.content}</td>
                  <td>{log.published ? "True" : "False"}</td>
                  <td>
                    <button
                      className="deleteButton bg-gray-500 text-white w-16 rounded-lg"
                      onClick={() => handleDelete(log.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <form onSubmit={(e) => handleSubmit(e)} className="w-full font-bold bg-blue-500 h-12 flex justify-between items-center fixed bottom-0">
        <label className="w-[6vw] float-left">Title: </label>
        <input
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="w-[25vw] bg-gray-200 rounded-lg float-left font-normal px-2 mr-6"
        ></input>
        <label className="w-[10vw] float-left">Content: </label>
        <input
          type="text"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          className="w-[40vw] bg-gray-200 rounded-lg font-normal px-2 mr-6"
        ></input>
        <button className="w-[6vw] bg-gray-500 text-white rounded-lg mr-4">+</button>
      </form>
    </div>
  );
}

export default App;