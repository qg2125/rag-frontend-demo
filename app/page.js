"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Send,
  Paperclip,
  ChevronRight,
  Volume2,
  BookOpen,
  Award,
  Clock,
  MapPin,
  BarChart2,
  Sun,
  Moon,
  Mic,
  Trash2,
  TreePalm,
} from "lucide-react";

export default function AIAdvisorPreview() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isRecording, setIsRecording] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const resetChat = () => {
    setChatStarted(false);
    setChatMessages([]);
    setMessage("");
    setShowSuggestions(true);
    setActiveCategory("all");
    setIsTyping(false);
  };

  // 清空对话但保留欢迎消息
  const clearChat = () => {
    if (chatMessages.length > 0) {
      // 保留首条AI欢迎消息
      const welcomeMessage = chatMessages.find(
        (msg) => msg.sender === "ai" && msg.text.includes("你好！我是小棕")
      );

      if (welcomeMessage) {
        setChatMessages([welcomeMessage]);
      } else {
        // 如果找不到欢迎消息，创建一个新的
        const newWelcomeMessage = {
          sender: "ai",
          text: "你好！我是小棕，你的专属留学申请顾问。我可以帮你规划申请路线、分析院校匹配度、优化文书材料，还能分享成功案例哦！",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages([newWelcomeMessage]);
      }

      // 重置其他状态
      setMessage("");
      setShowSuggestions(true);
    }
  };

  // 更丰富的建议问题，按类别组织
  const suggestionsByCategory = {
    all: ["我该如何开始准备留学申请？", "哪些学校适合我的背景和目标？"],
    profile: ["我的背景能申请哪些学校？", "GPA不高，有什么补救方案？"],
    exams: ["雅思和托福有什么区别？", "GRE需要准备多久？"],
    schools: ["美国商科排名前20的学校有哪些？", "英国留学有什么优势？"],
    cases: ["有转专业申请成功的案例吗？", "低GPA申请到名校的案例有吗？"],
  };

  //
  const categories = [
    { id: "all", icon: <ChevronRight size={12} />, label: "热门" },
    { id: "profile", icon: <User size={12} />, label: "背景" },
    { id: "exams", icon: <Clock size={12} />, label: "考试" },
    { id: "schools", icon: <MapPin size={12} />, label: "院校" },
    { id: "cases", icon: <BarChart2 size={12} />, label: "案例" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const playMessageSound = () => {
    const audio = new Audio("/message-sound.mp3");
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (message.trim()) {
      const newUserMessage = {
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      if (!chatStarted) {
        setChatStarted(true);
        // 添加AI的首条欢迎消息
        const welcomeMessage = {
          sender: "ai",
          text: "你好！我是小棕，你的专属留学申请顾问。我可以帮你规划申请路线、分析院校匹配度、优化文书材料，还能分享成功案例哦！",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages([welcomeMessage, newUserMessage]);
      } else {
        setChatMessages([...chatMessages, newUserMessage]);
      }

      setMessage("");
      setShowSuggestions(false);

      // 播放消息音效
      playMessageSound();

      // 模拟AI正在输入
      setIsTyping(true);

      // 模拟AI回复延迟
      setTimeout(() => {
        // 这里可以接入真实的AI回复逻辑
        let aiResponse;

        // 根据不同问题类型给出不同格式的回复，增加多样性
        if (message.includes("背景") || message.includes("适合")) {
          aiResponse = {
            sender: "ai",
            text: `我看了你的背景很不错！对于"${message}"，我的建议是：
            
1️⃣ 你的优势: 专业背景扎实，有相关实习经历
2️⃣ 可考虑学校: Columbia, NYU, UC Berkeley
3️⃣ 下一步: 准备标化考试，同时开始规划文书

需要了解具体的院校匹配分析吗？`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        } else if (
          message.includes("考试") ||
          message.includes("托福") ||
          message.includes("雅思")
        ) {
          aiResponse = {
            sender: "ai",
            text: `关于"${message}"，这里有一些重要信息：
            
📊 **托福vs雅思对比**
- 托福: 偏学术，美国学校普遍接受
- 雅思: 题型多样，英联邦国家青睐

💯 **分数要求**:
- 美国TOP30: 托福100+/雅思7.0+
- 英国G5: 雅思7.0-7.5

需要更详细的备考建议吗？`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        } else {
          aiResponse = {
            sender: "ai",
            text: `谢谢你的问题！关于"${message}"，我可以提供以下建议：
            
首先，这是很多申请者关心的问题。根据我的分析，你可以考虑从以下几个方面入手...

你希望我详细展开哪一点呢？`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }

        setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
        setIsTyping(false);

        // 对话进行一段时间后，重新显示一些建议问题
        setTimeout(() => {
          setShowSuggestions(true);
        }, 1000);
      }, 1500);
    }
  };

  // 仅设置消息，不自动提交
  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    // 聚焦输入框以便用户可以立即编辑或发送
    inputRef.current.focus();
  };

  /* 暂时注释掉黑夜和白天模式功能
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  */

  /* 暂时注释掉文件上传功能
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      const fileName = file.name;
      setMessage(`我上传了文件: ${fileName}`);
      // Clear file input
      fileInputRef.current.value = "";
    }
  };
  */

  /* 暂时注释掉语音输入功能
  const toggleVoiceRecording = () => {
    // Toggle voice recording state
    setIsRecording(!isRecording);

    if (!isRecording) {
      // Start recording logic would go here
      console.log("Starting voice recording...");
      // This would be replaced with actual voice recording implementation
    } else {
      // Stop recording logic would go here
      console.log("Stopping voice recording...");
      // Process audio and convert to text
      // For demo, let's pretend we got some text
      setMessage("我想了解留学申请的时间规划");
    }
  };
  */

  // 棕榈品牌主色调
  const brandColor = darkMode
    ? {
        bg: "bg-teal-900",
        text: "text-teal-100",
        highlight: "bg-teal-700",
        button: "bg-teal-600",
        buttonHover: "hover:bg-teal-500",
      }
    : {
        bg: "bg-teal-50",
        text: "text-teal-900",
        highlight: "bg-teal-500",
        button: "bg-teal-600",
        buttonHover: "hover:bg-teal-500",
      };

  // 侧边建议框组件
  const SuggestionsPanel = () => (
    <div
      className={`p-3 mt-2 rounded-lg ${
        darkMode ? "bg-gray-800" : "bg-white border border-teal-100"
      }`}
    >
      <div className="mb-2 text-sm font-medium">你可能想问：</div>
      <div className="flex flex-wrap gap-2 mb-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-2 py-1 rounded-full text-xs ${
              activeCategory === category.id
                ? darkMode
                  ? "bg-teal-700 text-white"
                  : "bg-teal-600 text-white"
                : darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-white text-teal-800"
            } transition-colors`}
          >
            {category.icon}
            <span className="ml-1">{category.label}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestionsByCategory[activeCategory].map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700 text-teal-300 hover:bg-gray-700"
                : "bg-white border-teal-200 text-teal-700 hover:bg-teal-50"
            } border text-sm px-3 py-2 rounded-full transition-colors flex items-center max-w-full shadow-sm`}
          >
            <span className="truncate">{suggestion}</span>
            <ChevronRight size={14} className="ml-1 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`px-4 py-3 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm flex items-center justify-between`}
      >
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={resetChat}
        >
          <img
            src="https://cms.palmdrive.cn/assets/images/logo/logo.png"
            alt="棕榈大道"
            className="h-8 w-8"
          />
          <h1 className="text-lg font-semibold">棕榈AI留学助手</h1>
        </div>
        {/* 暂时注释掉黑夜和白天模式切换按钮
        <button onClick={toggleDarkMode} className="p-2 rounded-full">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        */}
      </header>

      {/* Chat Container */}
      <div
        className={`flex-1 overflow-y-auto ${
          darkMode ? "bg-gray-900" : brandColor.bg
        }`}
        ref={chatContainerRef}
      >
        {!chatStarted ? (
          // 初始页面
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="max-w-xl mx-auto">
              <div className="flex justify-center mb-4"></div>
              <h1 className="text-2xl font-bold mb-2">棕榈AI留学助手</h1>
              <p
                className={`mb-8 ${
                  darkMode ? "text-gray-300" : "text-teal-800"
                }`}
              >
                Hi！我是棕榈大道开发的留学小助手，随时为你解答申请过程中的各种问题，让我们一起开启留学之旅吧！
              </p>

              {/* 输入区域  */}
              <div className="mb-8 max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="relative">
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="输入你的问题..."
                    rows="2"
                    className={`w-full pl-4 pr-4 pt-3 pb-10 focus:outline-none rounded-lg resize-none ${
                      darkMode
                        ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                        : "bg-white text-gray-800 border-teal-200 shadow-md"
                    } border transition-colors`}
                  />

                  {/* 左下角按钮 - 注释掉文件上传按钮
                  <div className="absolute left-2 bottom-4 flex space-x-1">
                    <button
                      type="button"
                      onClick={handleFileUpload}
                      className={`p-2 rounded-full ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-teal-600 hover:bg-teal-50"
                      }`}
                    >
                      <Paperclip size={18} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  */}

                  {/* 右下角按钮组 - 注释掉语音输入按钮 */}
                  <div className="absolute right-2 bottom-4 flex space-x-2">
                    {/* 注释掉语音输入按钮
                    <button
                      type="button"
                      onClick={toggleVoiceRecording}
                      className={`p-2 rounded-full ${
                        isRecording
                          ? "bg-red-500 text-white"
                          : message.trim()
                          ? "bg-teal-600 text-white hover:bg-teal-500"
                          : darkMode
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-200 text-gray-400"
                      } transition-colors`}
                    >
                      <Mic size={18} />
                    </button>
                    */}
                    <button
                      type="submit"
                      className={`p-2 rounded-full ${
                        message.trim()
                          ? "bg-teal-600 text-white hover:bg-teal-500"
                          : darkMode
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-200 text-gray-400"
                      } transition-colors`}
                      disabled={!message.trim()}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </div>

              {/* 建议问题区域 */}
              <div className="text-left">
                <div className="mb-2 text-sm font-medium">你可能想问：</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center px-2 py-1 rounded-full text-xs ${
                        activeCategory === category.id
                          ? darkMode
                            ? "bg-teal-700 text-white"
                            : "bg-teal-600 text-white"
                          : darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-white text-teal-800"
                      } transition-colors`}
                    >
                      {category.icon}
                      <span className="ml-1">{category.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestionsByCategory[activeCategory].map(
                    (suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`${
                          darkMode
                            ? "bg-gray-800 border-gray-700 text-teal-300 hover:bg-gray-700"
                            : "bg-white border-teal-200 text-teal-700 hover:bg-teal-50"
                        } border text-sm px-3 py-2 rounded-full transition-colors flex items-center max-w-full shadow-sm`}
                      >
                        <span className="truncate">{suggestion}</span>
                        <ChevronRight size={14} className="ml-1 shrink-0" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 对话开始后的界面
          <div className="max-w-3xl mx-auto p-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-2 shrink-0">
                    <TreePalm size={18} />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[80%] whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? darkMode
                        ? "bg-teal-600 text-white"
                        : "bg-teal-500 text-white"
                      : darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div
                    className={`text-xs mt-1 ${
                      msg.sender === "user"
                        ? "text-teal-100"
                        : darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
                {msg.sender === "user" && (
                  <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white ml-2 shrink-0">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-2">
                  {/* 替换成棕榈树图标 */}
                  <TreePalm size={18} />
                </div>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* 对话开始后的建议问题 - 永久显示在对话页面的侧边 */}
            <div className="mt-6 mb-4">
              <SuggestionsPanel />
            </div>

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Only show when chat has started */}
      {chatStarted && (
        <div className="p-3 border-t">
          <div className="max-w-3xl w-full mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              {/* 更改为 textarea 以支持更高的输入框 */}
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="输入你的问题..."
                rows="2"
                className={`w-full pl-4 pr-4 pt-3 pb-10 focus:outline-none rounded-lg resize-none ${
                  darkMode
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                    : "bg-white text-gray-800 border-gray-200"
                } border transition-colors`}
              />

              {/* 左下角按钮 - 添加清除按钮和tooltip */}
              <div className="absolute left-2 bottom-4 flex space-x-1">
                {/* 注释掉上传文件按钮
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className={`p-2 rounded-full ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  <Paperclip size={18} />
                </button>
                */}
                <div className="relative group">
                  <button
                    type="button"
                    onClick={clearChat}
                    className={`p-2 rounded-full ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-teal-600 hover:bg-teal-50"
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                  {/* 添加tooltip显示"清除对话" */}
                  <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    清除对话
                  </div>
                </div>
                {/*<input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />*/}
              </div>

              {/* 右下角按钮组 */}
              <div className="absolute right-2 bottom-4 flex space-x-2">
                {/* 注释掉语音输入按钮
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`p-2 rounded-full ${
                    isRecording
                      ? "bg-red-500 text-white"
                      : message.trim()
                      ? "bg-teal-600 text-white hover:bg-teal-500"
                      : darkMode
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-200 text-gray-400"
                  } transition-colors`}
                >
                  <Mic size={18} />
                </button>
                */}
                <button
                  type="submit"
                  className={`p-2 rounded-full ${
                    message.trim()
                      ? "bg-teal-600 text-white hover:bg-teal-500"
                      : darkMode
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-200 text-gray-400"
                  } transition-colors`}
                  disabled={!message.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer - 修改版权信息 */}
      <footer
        className={`py-2 px-4 text-center text-xs ${
          darkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        CopyRight©2017 棕榈大道教育科技(北京)有限公司
      </footer>
    </div>
  );
}
