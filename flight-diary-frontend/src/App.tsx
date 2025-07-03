import { useEffect, useState } from "react";
import { type DiaryEntry, type NewDiaryEntry, Weather, Visibility } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  const diaryList = diaries.map((d) => (
    <div key={d.id}>
      <h4>{d.date}</h4>
      <p>Weather: {d.weather} | Visibility: {d.visibility}</p>
      {d.comment && <i>Comment: {d.comment}</i>}
      <hr />
    </div>
  ));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    };

    try {
      const saved = await createDiary(newDiary);
      setDiaries(diaries.concat(saved));
      setError("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Flight Diary</h1>

      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
          />
        </div>

        <div>
          Visibility:
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>

        <div>
          Weather:
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          Comment:{" "}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>

      <h2>Diary Entries</h2>
      {diaryList}
    </div>
  );
};

export default App;
