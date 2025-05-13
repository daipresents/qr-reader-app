import { BrowserQRCodeReader } from '@zxing/browser';
import React, { useRef, useState } from 'react';

const QRReader: React.FC = () => {
  const [decodedText, setDecodedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copySuccess, setCopySuccess] = useState('');

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
    } catch (err) {
      setCopySuccess('コピーに失敗しました');
    }
  };

  return (
    <div>
      <h2>QRコードリーダー</h2>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />

      <p>読み取り結果:</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxWidth: '80%',
            flexGrow: 1,
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            color: 'red', // 🔴 赤文字で表示
            fontWeight: 'bold',
          }}
        >
          {decodedText || 'まだ読み取られていません'}
        </div>
        {decodedText && (
          <button onClick={handleCopy} style={{ padding: '6px 10px', cursor: 'pointer' }}>
            📋 コピー
          </button>
        )}
      </div>
      {copySuccess && <div style={{ color: 'green', marginTop: '5px' }}>{copySuccess}</div>}
    </div>
  );
};

export default QRReader;
