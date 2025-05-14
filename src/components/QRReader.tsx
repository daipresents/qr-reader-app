import { BrowserQRCodeReader } from '@zxing/browser';
import React, { useEffect, useRef, useState } from 'react';

const QRReader: React.FC = () => {
  const [decodedText, setDecodedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSystemMode, setIsSystemMode] = useState(true); // システムモードかどうか

  // システムのカラーモードを検知
  useEffect(() => {
    if (!isSystemMode) return; // システムモードがオフの場合は検知しない

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isSystemMode]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;

    imageElement.onload = async () => {
      try {
        const result = await new BrowserQRCodeReader().decodeFromImageElement(imageElement);
        setDecodedText(result.getText());
        setCopySuccess('');
      } catch (error) {
        setDecodedText('読み取りに失敗しました。QRコードが認識できません。');
        setCopySuccess('');
        console.error(error);
      }
    };
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(decodedText);
      setCopySuccess('コピーしました！');
      setTimeout(() => setCopySuccess(''), 1500);
    } catch {
      setCopySuccess('コピーに失敗しました');
    }
  };

  const toggleDarkMode = () => {
    setIsSystemMode(false); // システムモードを無効化
    setIsDarkMode((prev) => !prev);
  };

  const resetToSystemMode = () => {
    setIsSystemMode(true); // システムモードを有効化
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '16px',
        position: 'relative', // 相対位置を設定
      }}
    >
      <div
        style={{
          border: `2px solid ${isDarkMode ? '#ffa500' : 'orange'}`,
          borderRadius: '8px',
          backgroundColor: isDarkMode ? '#444' : '#fff8e1',
          padding: '16px',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: isDarkMode ? '#ffa500' : 'orange', fontWeight: 'bold', margin: 0 }}>
          このアプリはブラウザ上で動かしているだけなので、<br />
          読み取った情報はどこにも送信しておりません。
        </h2>
      </div>

      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />

      <p>読み取り結果:</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxWidth: '80%',
            flexGrow: 1,
            border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: isDarkMode ? '#555' : '#f9f9f9',
            color: isDarkMode ? '#ff6666' : 'red', // ダークモードでは薄い赤
            fontWeight: 'bold',
          }}
        >
          {decodedText || 'まだ読み取られていません'}
        </div>
        {decodedText && (
          <button
            onClick={handleCopy}
            style={{
              padding: '6px 10px',
              cursor: 'pointer',
              backgroundColor: isDarkMode ? '#666' : '#eee',
              color: isDarkMode ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            📋 コピー
          </button>
        )}
      </div>
      {copySuccess && <div style={{ color: isDarkMode ? '#90ee90' : 'green', marginTop: '5px' }}>{copySuccess}</div>}

      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 1000,
          display: 'flex',
          gap: '8px',
        }}
      >
        <button
          onClick={toggleDarkMode}
          style={{
            padding: '4px 8px',
            cursor: 'pointer',
            backgroundColor: isDarkMode ? '#666' : '#eee',
            color: isDarkMode ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          {isDarkMode ? 'ライトモード' : 'ダークモード'}
        </button>
        <button
          onClick={resetToSystemMode}
          style={{
            padding: '4px 8px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          システムモード
        </button>
      </div>
    </div>
  );
};

export default QRReader;
