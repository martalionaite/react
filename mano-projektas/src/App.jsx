import { useState, useEffect } from "react";
import Loading from "./loading/Loading";
import Tours from "./tours/Tours";

const url = "https://www.course-api.com/react-tours-project";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log("Klaida gaunant duomenis:", error);
    }
  };

const removeTour = (id) => {
  const newTours = tours.filter((tour) => tour.id !==id)
  setTours(newTours);
}

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="title">
        <h2>No tours left</h2>
        <button className="btn" onClick={() => fetchTours()}>
          Refresh
        </button>
      </div>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={(id) => setTours(tours.filter(tour => tour.id !== id))} />
    </main>
  );
};

export default App;
