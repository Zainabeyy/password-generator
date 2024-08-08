import React from "react";
import Form from "./component/Form";

export default function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [passwordData,setpassword]=React.useState('');
  function handlePasswordData(value:string){
    setpassword(value);
  }
  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(passwordData);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  React.useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light"
    );
  }, [darkTheme]);
  return (
    <div>
      <input
        type="checkbox"
        id="dark-mode"
        name="darkMode"
        checked={darkTheme}
        onChange={toggleTheme}
      />
      <label htmlFor="dark-mode" className="toggleTheme">
        <div className="themeImage"></div>
      </label>
      <main>
        <h1 className="title">
          Generate a <span className="greenTitle">random password</span>
        </h1>
        <p className="description">Never use an insecure password again.</p>
        <Form handlePassword={handlePasswordData}/>
        <hr />
        <div className="passwordContent">
          <p className="password">{passwordData}</p>
          <button type="button" className="copy" onClick={handleCopyClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#D5D4D8"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
