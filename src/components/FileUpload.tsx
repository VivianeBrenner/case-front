import { useState } from "react";
import axios from "axios";

interface FileUploadProps {
  processId: string;
}

const FileUpload = ({ processId }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Selecione um arquivo!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`http://localhost:5000/upload/${processId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Arquivo enviado!");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Enviar</button>
    </div>
  );
};

export default FileUpload;
