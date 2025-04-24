/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [code, setCode] = useState("// start writing code from here");
  // const [isConnected, setIsConnected] = useState(false);
  // const [socketId, setSocketId] = useState<string | null>(null);
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
      // setIsConnected(true);
      // setSocketId(socket.id || null);
      console.log("Connected to socket:", socket.id);
    };

    const onDisconnect = () => {
      // setIsConnected(false);
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
    <div className="flex h-screen w-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white font-mono">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] border-r border-zinc-700 p-5 shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-purple-400">📂 Files</h2>
        <ul className="space-y-3">
          {Object.keys(files).map((file) => (
            <li
              key={file}
              onClick={() => handleFileClick(file)}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 hover:bg-zinc-700 ${
                file === currentFile ? "bg-purple-700/50 font-bold ring-1 ring-purple-400" : ""
              }`}
            >
              {file}
            </li>
          ))}
        </ul>
      </div>
  
      {/* Main Area */}
      <div className="flex flex-col flex-grow">
        {/* Top Bar */}
        <div className="flex flex-wrap gap-3 px-6 py-4 border-b border-zinc-700 bg-[#0F172A]/70 backdrop-blur-md shadow-md">
          <button
            onClick={changeTheme}
            className="bg-zinc-700 hover:bg-zinc-600 text-sm px-4 py-2 rounded-full transition"
          >
            🎨 Toggle Theme
          </button>
          {["js", "py", "cpp", "go", "html", "css", "php", "rb"].map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="bg-zinc-700 hover:bg-purple-700 px-4 py-2 rounded-full text-sm transition"
            >
              {lang.toUpperCase()}
            </button>
          ))}
          <button
            onClick={getCursorPosition}
            className="ml-auto bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-full text-sm transition"
          >
            🔍 Cursor Pos
          </button>
        </div>
  
        {/* Editor */}
        <div className="flex-grow bg-[#0B1120]">
          <Editor
            height="100%"
            width="100%"
            theme={editorTheme}
            defaultLanguage={editorlanguages}
            defaultValue={code}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />
        </div>
      </div>
    </div>
  );
  
};

export default Monaco;
