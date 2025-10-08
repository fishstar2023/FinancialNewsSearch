import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Settings.css"; // 引入 CSS

const Settings: React.FC = () => {
  const [username, setUsername] = useState("使用者名稱");
  const [email, setEmail] = useState("example@email.com");
  const [notifications, setNotifications] = useState({
    reportEmail: true,
    weeklySummary: false,
    systemUpdate: true,
  });
  const [theme, setTheme] = useState({
    primaryColor: "#478058",
    font: '"思源宋體", "Noto Serif TC", serif',
    darkMode: false,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    setTimeout(() => {
      setMessage("設定已儲存 ✅");
      setLoading(false);
    }, 1500);

    // ⚠️ 後端 API 範例
  };

  return (
    <div className="settings-container" style={{ fontFamily: theme.font }}>
      <h1 className="settings-title">設定</h1>

      {/* 使用者資料卡 */}
      <div className="settings-card">
        <h3 className="card-title">👤 使用者資料</h3>
        <div className="field">
          <label>使用者名稱</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      {/* 通知設定卡 */}
      <div className="settings-card">
        <h3 className="card-title">🔔 通知設定</h3>
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="checkbox-field">
            <input
              type="checkbox"
              checked={value}
              onChange={() =>
                setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
              }
            />
            <span className="checkbox-label">
              {key === "reportEmail"
                ? "報告完成寄送 Email"
                : key === "weeklySummary"
                ? "每週摘要通知"
                : "系統更新通知"}
            </span>
          </div>
        ))}
      </div>

      {/* 介面風格卡 */}
      <div className="settings-card">
        <h3 className="card-title">🎨 介面風格</h3>
        <div className="field">
          <label>主色調</label>
          <input
            type="color"
            value={theme.primaryColor}
            onChange={(e) => setTheme((prev) => ({ ...prev, primaryColor: e.target.value }))}
          />
        </div>
        <div className="field">
          <label>字體</label>
          <select
            value={theme.font}
            onChange={(e) => setTheme((prev) => ({ ...prev, font: e.target.value }))}
          >
            <option value='"思源宋體", "Noto Serif TC", serif'>思源宋體</option>
            <option value='"Noto Sans TC", sans-serif'>Noto Sans TC</option>
          </select>
        </div>
        <div className="checkbox-field">
          <input
            type="checkbox"
            checked={theme.darkMode}
            onChange={() => setTheme((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
          />
          <span className="checkbox-label">暗模式</span>
        </div>
      </div>

      {/* 保存按鈕 */}
      <div className="save-container">
        <button
          onClick={handleSave}
          disabled={loading}
          style={{ backgroundColor: theme.primaryColor }}
        >
          {loading ? "保存中..." : "保存設定"}
        </button>
      </div>

      {/* 提示訊息 */}
      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="message"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
