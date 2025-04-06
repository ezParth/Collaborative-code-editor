import React, { useEffect, useRef, useState, useContext } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor"; // Required for setModelLanguage
import { themeContext } from "../../context/ThemeContext";
import { languageContext } from "../../context/LanguageContext";
import { socket } from "../../socket.io/Socket";

const Monaco: React.FC = () => {
  const { editorTheme, setEditorTheme } = useContext(themeContext);
  const { editorlanguages, setEditorLanguage } = useContext(languageContext);

  const editorRef = useRef<any>(null);
  const [code, setCode] = useState("Hello world");
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState<string | null>(null);
  const isRemoteUpdate = useRef(false);

  // File system
  const [files, setFiles] = useState({
    "main.js": "// JavaScript code",
    "main.py": "# Python code",
    "main.cpp": "// C++ code",
    "main.go": "// Go code",
    "index.html": "<!-- HTML -->",
    "style.css": "/* CSS */",
    "index.php": "<?php echo 'PHP'; ?>",
    "app.rb": "# Ruby",
  });

  const [currentFile, setCurrentFile] = useState("main.js");

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      if (isRemoteUpdate.current) {
        isRemoteUpdate.current = false;
        return;
      }

      const newCode = editor.getValue();
      setCode(newCode);

      setFiles((prev) => ({
        ...prev,
        [currentFile]: newCode,
      }));

      if (socket.connected && socket.id) {
        sessionStorage.setItem("SocketID", socket.id);
        socket.emit("code-change", newCode);
      }
    });
  };

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      setIsConnected(true);
      setSocketId(socket.id || null);
      console.log("Connected to socket:", socket.id);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      sessionStorage.removeItem("SocketID");
      sessionStorage.removeItem("senderSocketID");
      console.log("Socket disconnected");
    };

    const onCodeMerge = (data: string, senderSocketId: string) => {
      if (senderSocketId === socket.id) return;

      console.log("Receiving code from another user");
      sessionStorage.setItem("senderSocketID", senderSocketId);

      isRemoteUpdate.current = true;
      setCode(data);

      if (editorRef.current) {
        const model = editorRef.current.getModel();
        if (model) {
          editorRef.current.executeEdits("", [
            {
              range: model.getFullModelRange(),
              text: data,
              forceMoveMarkers: true,
            },
          ]);
        }
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("merge-code", onCodeMerge);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("merge-code", onCodeMerge);
      sessionStorage.removeItem("SocketID");
      sessionStorage.removeItem("senderSocketID");
    };
  }, []);

  const changeTheme = () => {
    setEditorTheme((prev: string) => (prev === "vs-dark" ? "light" : "vs-dark"));
  };

  const changeLanguage = (lang: string) => {
    setEditorLanguage(lang);
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, lang);
      }
    }
  };

  const getCursorPosition = () => {
    if (editorRef.current) {
      const pos = editorRef.current.getPosition();
      if (pos) {
        console.log("Cursor at Line:", pos.lineNumber, "Column:", pos.column);
      }
    }
  };

  const handleFileClick = (fileName: string) => {
    setCurrentFile(fileName);
    const fileCode = files[fileName];
    setCode(fileCode);

    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        editorRef.current.executeEdits("", [
          {
            range: model.getFullModelRange(),
            text: fileCode,
            forceMoveMarkers: true,
          },
        ]);
      }
    }

    const ext = fileName.split(".").pop();
    const langMap: any = {
      js: "javascript",
      py: "python",
      cpp: "cpp",
      go: "go",
      html: "html",
      css: "css",
      php: "php",
      rb: "ruby",
    };
    if (ext && langMap[ext]) {
      changeLanguage(langMap[ext]);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-zinc-900 text-white">
      <div className="w-60 bg-zinc-800 border-r border-zinc-700 p-4">
        <h2 className="text-lg font-semibold mb-4">Files</h2>
        <ul className="space-y-2">
          {Object.keys(files).map((file) => (
            <li
              key={file}
              onClick={() => handleFileClick(file)}
              className={`cursor-pointer px-3 py-2 rounded hover:bg-zinc-700 ${
                file === currentFile ? "bg-zinc-700 font-bold" : ""
              }`}
            >
              {file}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 px-4 py-2 border-b border-zinc-700 bg-zinc-800">
          <button onClick={changeTheme} className="btn bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600">
            Toggle Theme
          </button>
          {["js", "py", "cpp", "go", "html", "css", "php", "rb"].map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="btn bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600"
            >
              {lang.toUpperCase()}
            </button>
          ))}
          <button onClick={getCursorPosition} className="btn bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600">
            Cursor Pos
          </button>
        </div>

        <div className="flex-grow">
          <Editor
            height="100%"
            width="100%"
            theme={editorTheme}
            defaultLanguage={editorlanguages}
            defaultValue={code}
            onMount={handleEditorDidMount}
          />
        </div>
      </div>
    </div>
  );
};

export default Monaco;
