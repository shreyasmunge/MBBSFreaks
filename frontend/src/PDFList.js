import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import API_BASE_URL from './apiConfig';


export default function PDFList() {
  const [pdfs, setPdfs] = useState([]);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/pdfs/`).then(res => setPdfs(res.data));
  }, []);
  return (
    <div>
      {pdfs.map(pdf => (
        <div key={pdf.id}>
          <h3>{pdf.title}</h3>
          <p>Year: {pdf.year}, Subject: {pdf.subject_name}, Chapter: {pdf.chapter_name}</p>
          <Document file={pdf.file}>
            <Page pageNumber={1} />
          </Document>
        </div>
      ))}
    </div>
  );
}
