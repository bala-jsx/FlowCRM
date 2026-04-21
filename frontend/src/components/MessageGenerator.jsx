import { useState } from "react";
import { aiApi } from "../services/api";

function MessageGenerator({ lead }) {
  const [type, setType] = useState("email");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    try {
      const res = await aiApi.generateMessage({
        lead,
        type,
      });

      setMessage(res.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border mt-6">
      <h2 className="font-semibold mb-4">AI Message Generator</h2>

      <div className="flex gap-3 mb-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>

        <button
          onClick={generate}
          className="bg-black text-white px-3 rounded"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {message && (
        <div className="bg-slate-100 p-3 rounded text-sm whitespace-pre-line">
          {message}
        </div>
      )}
    </div>
  );
}

export default MessageGenerator;