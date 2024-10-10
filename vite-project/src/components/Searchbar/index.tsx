import ReactSelect from "react-select"
import { makes } from "../../utils/constants";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Button = ({ designs }: { designs?: string }) => {
    return (
        <button className={`ml-3 ${designs}`}>
            <img src="/search.svg" width={40} height={40} alt="" />
        </button>
    )
}



const Searchbar = () => {
    const [params, setParams] = useSearchParams();

    const [make, setMake] = useState<string>("");
    const [model, setModel] = useState<string>("");

    const options = useMemo(() =>
        makes.map((make) => ({ value: make, label: make })), []);




    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // marka ve modeli url'e arama parametresi olarak ekle
        setParams({ make: make.toLowerCase(), model: model.toLowerCase() });
    };

    const selected = {
        label: params.get("make"),
        value: params.get("make"),
    };

    return (
        <form onSubmit={handleSubmit}
            className="searchbar gap-3">
            <div className="searchbar__item">
                <ReactSelect
                    options={options}
                    placeholder="marka seciniz"
                    className="w-full text-black"
                    onChange={(e) => e && setMake(e?.value || "")} />
                <Button designs="sm:hidden" />
            </div>

            <div className="searchbar__item">
                <img src="/model-icon.png"
                    className="absolute ml-4" width={25} alt="" />
                <input
                    defaultValue={params.get("model") || ""}
                    onChange={(e) => setModel(e.target.value)}
                    className="searchbar__input rounded text-black"
                    placeholder="orn:Civic" type="text" />
                <Button />

            </div>
        </form>
    )
}

export default Searchbar
