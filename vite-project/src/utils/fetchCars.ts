import { CarType } from "../types";

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'c0b6898532msh330e85b90496181p1d3720jsnc7b28dc873b4',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
};

type Parameters = {
    limit: number;
    make?: string;
    model?: string;
    fuel_type?: string;
    year?: string;
}

const fetchCars = async ({
    limit,
    make = "bmw",
    model = "m4",
    fuel_type = "",
    year = "",
}: Parameters): Promise<CarType[]> => {
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&limit=${limit}&fuel_type=${fuel_type}&year=${year}`;
    const res = await fetch(url, options);
    const data = await res.json();

    return data;
}

export default fetchCars;