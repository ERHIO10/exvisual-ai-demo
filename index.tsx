import { useState } from "react";

export default function Home() {
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    const res = await fetch("/api/generate-logo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandName: brand, style }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">EXVISUAL.AI – Logo Generator</h1>
        <input
          type="text"
          placeholder="Nama Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full p-3 mb-3 rounded border"
        />
        <input
          type="text"
          placeholder="Gaya Visual (Minimalis, Retro, dll)"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full p-3 mb-4 rounded border"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {loading ? "Menghasilkan..." : "Buat Deskripsi Logo"}
        </button>
        {result && (
          <div className="mt-6 p-4 bg-white rounded shadow text-left">
            <h2 className="font-semibold mb-2">Hasil Deskripsi:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}