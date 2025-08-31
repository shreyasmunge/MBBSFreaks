import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from './apiConfig';


export default function AdminUpload() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('subject_name', subject);
    formData.append('chapter_name', chapter);
    formData.append('file', file);
    await axios.post(`${API_BASE_URL}/pdfs/upload/`, formData);
  };

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
      <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year"/>
      <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject"/>
      <input value={chapter} onChange={e => setChapter(e.target.value)} placeholder="Chapter Name"/>
      <input type="file" onChange={e => setFile(e.target.files)}/>
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
}
