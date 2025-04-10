// Modal.tsx
import { useState, useEffect } from "react";
import { generateTextWithGemini } from "../components/api";

interface ModalProps {
  setIsModalOpen: (value: boolean) => void;
  setFieldValue: (value: string) => void; // menerima setter untuk title/desc/subject
}

const Modal: React.FC<ModalProps> = ({
  setIsModalOpen,
  setFieldValue,
}) => {
  const [tempText, setTempText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getPrompt = () => {
    const content = localStorage.getItem("savedContent") || "";

  };

  const generateSuggestions = async () => {
    setLoading(true);
    try {
      const prompt = getPrompt();
      const response = await generateTextWithGemini({ prompt : `generate five unique and engaging stories description. Provide the response strictly in list format, where each item in the list is a complete paragraph-length story. Do not include any introductory or concluding words. The output must be a plain list without numbering or bullet points. Each story should be separated by a single line break.` });

      const stories: string[] = response
        .split("\n\n")
        .map((story: string) => story.trim())
        .filter((story: string) => story.length > 0);

      setSuggestions(stories?.slice(0, 5) || []);
    } catch {
      setSuggestions(["Gagal mengambil saran."]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   generateSuggestions();
  // }, [attributeType]);

  const handleSelectSuggestion = (text: string) => {
    setTempText(text);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full relative">
        <h2 className="text-lg font-semibold text-center text-black capitalize">
          Suggested
        </h2>

        <textarea
          className="w-full h-40 p-3 mt-3 border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-200 outline-none text-black"
          placeholder="Select or type your own"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
        />

        <div className="mt-4">
          <button
            onClick={generateSuggestions}
            className="w-full md:w-48 py-2 bg-gray-300 text-white rounded-lg"
          >
            {loading ? "Loading..." : "Generate Another"}
          </button>
        </div>

        {/* Textarea yang berisi semua suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              All Suggestions
            </label>
            <textarea
              className="w-full p-3 h-32 rounded-md border border-gray-300 bg-gray-50 text-sm text-gray-700"
              value={suggestions.join("\n\n")}
              readOnly
            />
          </div>
        )}

        {/* Suggestions button list */}
        {suggestions.length > 0 && (
          <div className="mt-4 grid gap-2">
            {suggestions.map((sugg, idx) => (
              <button
                key={idx}
                className="px-4 py-2 text-left text-sm bg-white rounded-md shadow hover:bg-gray-50 border border-gray-300"
                onClick={() => handleSelectSuggestion(sugg)}
              >
                {sugg}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => {
              setFieldValue(tempText);
              setIsModalOpen(false);
            }}
            className="w-48 justify-center px-6 py-2 text-black rounded-lg flex items-center gap-1 cursor-pointer bg-green-400 hover:bg-green-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
