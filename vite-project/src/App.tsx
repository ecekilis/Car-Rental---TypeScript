import { useEffect, useRef, useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import Header from './components/Header'
import Hero from './components/Hero'
import Searchbar from './components/Searchbar'
import fetchCars from './utils/fetchCars'
import { CarType } from './types'
import Warning from './components/Warning'
import Card from './components/Card'
import Loadmore from './components/Loadmore'
import { useSearchParams } from 'react-router-dom'
import Year from './components/Filter/Year'

function App() {
  const [params, setParams] = useSearchParams();

  const [cars, setCars] = useState<CarType[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    const paramsObj = Object.fromEntries(params.entries());

    console.log(paramsObj);

    fetchCars({ limit, ...paramsObj })
      .then((data) => setCars(data))
      .catch(() => setIsError(true))
  }, [limit, params])


  const catalogueRef = useRef<HTMLDivElement>(null);

  return (
    <div className='min-h-screen text-white bg-[rgb(23,23,23)]'>
      <Header />
      <Hero catalogueRef={catalogueRef} />
      <div ref={catalogueRef} className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Araba Katalogu</h1>
          <p>Begenebilecegin Arabalari Kesfet</p>
        </div>
        <div className="home__filters">
          <Searchbar />
          <div className="home__filter-container">
            <Filter />
            <Year />
          </div>
        </div>

        {
          !cars ? (<Warning>Yukleniyor</Warning>)
            : isError ? (<Warning>uzgunuz br sorun olustu</Warning>)
              : cars.length < 1 ? (<Warning>Aranilan arac bulunamadi</Warning>)
                : cars.length > 1 &&
                <section>
                  <div className="home__cars-wrapper">
                    {cars.map((car, i) => (
                      <Card car={car} key={i} />
                    ))}
                  </div>
                  <Loadmore
                    limit={limit}
                    handleClick={() => {
                      setLimit(limit + 5)
                    }} />
                </section>
        }

      </div>
    </div >
  )
}

export default App
