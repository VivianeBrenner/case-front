import { useState } from "react";
import axios from "axios";
import { FileUploadProps } from "../../types/file.types";

const FileUpload = ({ processId }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Selecione um arquivo!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/upload/${processId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Arquivo enviado!");
      setFile(null);
    }
    catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      alert("Falha ao enviar arquivo. Tente novamente");
    }
    finally {
      setLoading(false);
    }

    return (
      <div>
        <input 
        type="file" 
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
        disabled={loading}
        className="border p-2 rounded-md"
        />
        <button 
          onClick={handleUpload}
          disabled={loading}
          className={`px-4 py-2 text-white rounded-lg transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    );
  };
}

  export default FileUpload;
