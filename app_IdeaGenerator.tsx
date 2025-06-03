// Импорт необходимых библиотек
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Lightbulb } from "lucide-react";

const archetypes = ["Герой", "Мудрец", "Бунтарь", "Искатель", "Хранитель" /* ... */];
const moods = ["Меланхолия", "Ностальгия", "Тревога", "Эйфория" /* ... */];
const lighting = ["Рембрандт", "Split lighting", "Контровой свет" /* ... */];
const colors = ["Тёплая сепия", "Холодный синий", "Монохром", "Неоновые контрасты" /* ... */];
const styles = ["Ретро-футуризм", "Нуар", "Минимализм", "Барокко" /* ... */];

const famousTechniques = [
  { name: "Стивен Мейзел", technique: "Мягкий рассеянный свет с насыщенными цветами" },
  { name: "Роджер Дикинс", technique: "Естественный свет, точная работа с тенями" },
  { name: "Энни Лейбовиц", technique: "Портреты с глубокой психологией через позу и фон" },
  { name: "Вонг Кар-Вай", technique: "Неон, замедленные кадры, запотевшие стекла" },
  { name: "Хельмут Ньютон", technique: "Контрастный свет, эротизм, гламур" },
];

export default function IdeaGenerator() {
  const [idea, setIdea] = useState({});
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);
  const [screen, setScreen] = useState("generator");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [mindMapNotes, setMindMapNotes] = useState("");

  const generateIdea = () => {
    const newIdea = {
      archetype: archetypes[Math.floor(Math.random() * archetypes.length)],
      mood: moods[Math.floor(Math.random() * moods.length)],
      lighting: lighting[Math.floor(Math.random() * lighting.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      style: styles[Math.floor(Math.random() * styles.length)],
      technique: famousTechniques[Math.floor(Math.random() * famousTechniques.length)],
    };
    setIdea(newIdea);
    setHistory(prev => [newIdea, ...prev]);
  };

  useEffect(() => {
    generateIdea();
  }, []);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prev => [...prev, ...previews]);
  };

  if (screen === "mindmap") {
    return (
      <div className="p-6 bg-white min-h-screen text-black font-sans">
        <h1 className="text-2xl font-bold mb-4">Развитие идеи</h1>
        <Button className="mb-4" onClick={() => setScreen("generator")}>⬅ Вернуться к генератору</Button>

        <div className="my-4">
          <label className="block mb-2 font-semibold">Добавить изображения:</label>
          <Input type="file" accept="image/*" multiple onChange={handleFileUpload} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
          {uploadedImages.map((src, i) => (
            <img key={i} src={src} alt={`Фото ${i + 1}`} className="rounded-xl shadow-lg" />
          ))}
        </div>

        <div className="my-4">
          <label className="block text-sm font-medium mb-1">Заметки/ассоциации:</label>
          <Textarea
            placeholder="Добавь идеи, описания, мысли..."
            value={mindMapNotes}
            onChange={(e) => setMindMapNotes(e.target.value)}
            className="w-full"
            rows={6}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen text-black font-sans">
      <h1 className="text-3xl font-bold mb-4">Конструктор идей</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card><CardContent><strong>Архетип:</strong> {idea.archetype}</CardContent></Card>
        <Card><CardContent><strong>Настроение:</strong> {idea.mood}</CardContent></Card>
        <Card><CardContent><strong>Свет:</strong> {idea.lighting}</CardContent></Card>
        <Card><CardContent><strong>Цвет:</strong> {idea.color}</CardContent></Card>
        <Card><CardContent><strong>Стиль:</strong> {idea.style}</CardContent></Card>
        <Card><CardContent><strong>Техника:</strong> {idea.technique?.name} — {idea.technique?.technique}</CardContent></Card>
      </div>

      <div className="my-6">
        <label className="block text-sm font-medium mb-1">Заметки к идее:</label>
        <Textarea
          placeholder="Напиши свои мысли..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={500}
          className="w-full"
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={generateIdea} className="bg-black text-white hover:bg-gray-800">
          <Sparkles className="mr-2" size={18}/> Сгенерировать новую идею
        </Button>

        <Button onClick={() => setScreen("mindmap")} variant="outline">
          <Lightbulb className="mr-2" size={18}/> Развить идею
        </Button>
      </div>

      {history.length > 1 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">История идей</h2>
          <ul className="space-y-2">
            {history.slice(1).map((item, idx) => (
              <li key={idx} className="text-sm border p-2 rounded-lg">
                <strong>{item.archetype}</strong>, {item.mood}, {item.lighting}, {item.color}, {item.style}, {item.technique?.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}