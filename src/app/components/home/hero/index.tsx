"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { PropertyContext } from "@/context-api/PropertyContext";
import { getImgPath, getDataPath } from "@/utils/pathUtils";

const Hero = () => {
  const router = useRouter();
  const [propertiesData, setPropertiesData] = useState<any[]>([]);
  const { updateFilter } = useContext(PropertyContext)!;
  const [activeTab, setActiveTab] = useState("sell");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/propertydata.json"));
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPropertiesData(data || []);
      } catch (error) {
        console.error("Error loading properties:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearchSell = () => {
    if (!location.trim()) {
      setError("Please enter a location to search.");
      return;
    }
    setError("");
    updateFilter("location", location);
    updateFilter("tag", "sell");
    router.push("/properties/properties-list");
  };

  const handleSearchBuy = () => {
    if (!location.trim()) {
      setError("Please enter a location to search.");
      return;
    }
    setError("");
    updateFilter("location", location);
    updateFilter("tag", "Buy");
    router.push("/properties/properties-list");
  };

  const suggestions = Array.from(
    new Set(propertiesData.map((item) => item.location))
  );

  const handleSelect = (value: string) => {
    setLocation(value);
    setShowSuggestions(false);
  };

  return (
    <section className="relative pt-44 pb-0 dark:bg-darklight bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight overflow-x-hidden">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10">
        <div className="grid lg:grid-cols-12 grid-cols-1">

          {/* LEFT SECTION */}
          <div className="flex flex-col col-span-6 justify-center items-start" data-aos="fade-right">
            <div className="mb-8">
              <h1 className="md:text-[50px] leading-[1.2] text-4xl ml-4 text-midnight_text dark:text-white font-bold">
                Find Your Best Real Estate
              </h1>
            </div>

            {/* Search Area */}
            <div className="max-w-xl ml-4 sm:w-full">
              {/* Tabs */}
              <div className="flex gap-1 bg-transparent">
                <button
                  className={`px-9 py-3 text-xl rounded-t-md ${
                    activeTab === "sell"
                      ? "bg-white dark:bg-darkmode border-b border-primary"
                      : "bg-white bg-opacity-50 dark:bg-darkmode dark:bg-opacity-50"
                  }`}
                  onClick={() => handleTabChange("sell")}
                >
                  Sell
                </button>

                <button
                  className={`px-9 py-3 text-xl rounded-t-md ${
                    activeTab === "buy"
                      ? "bg-white dark:bg-darkmode border-b border-primary"
                      : "bg-white bg-opacity-50 dark:bg-darkmode dark:bg-opacity-50"
                  }`}
                  onClick={() => handleTabChange("buy")}
                >
                  Buy
                </button>
              </div>

              <div className="bg-white dark:bg-transparent rounded-b-lg rounded-tr-lg">

                {/* SELL TAB */}
                {activeTab === "sell" && (
                  <div className="bg-white dark:bg-darkmode shadow-lg p-8 pb-10 rounded-b-lg rounded-tr-lg">
                    <div className="relative my-2">
                      <div className="relative flex items-center">
                        <div className="absolute left-0 p-4">
                          <Image
                            src={getImgPath("/images/svgs/icon-location.svg")}
                            alt="Location"
                            width={24}
                            height={24}
                          />
                        </div>

                        {/* INPUT */}
                        <input
                          type="text"
                          placeholder="Search Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={() =>
                            setTimeout(() => setShowSuggestions(false), 200)
                          }
                          className="py-5 pl-14 pr-4 w-full rounded-lg border border-border dark:border-dark_border dark:bg-[#0c121e] text-black dark:text-white focus:border-primary dark:focus:border-primary"
                        />

                        {/* SUGGESTIONS */}
                        {showSuggestions && (
                          <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-semidark border border-border rounded-md z-10 max-h-[130px] overflow-y-auto">
                            <ul className="py-3 px-5">
                              {suggestions.map((item, index) => (
                                <li
                                  key={index}
                                  onMouseDown={() => handleSelect(item)}
                                  className="cursor-pointer text-lg text-midnight_text dark:text-white hover:text-primary dark:hover:text-primary"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Search Buttons */}
                    <div className="mt-6 flex flex-col-reverse gap-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <button
                          onClick={handleSearchSell}
                          className="flex-1 py-4 bg-primary text-white rounded-lg hover:bg-blue-700"
                        >
                          Search
                        </button>

                        <button
                          onClick={handleSearchSell}
                          className="flex-1 py-4 bg-skyBlue/80 dark:bg-skyBlue/80 text-white rounded-lg hover:bg-skyBlue"
                        >
                          Advance Search
                        </button>
                      </div>

                      {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* BUY TAB */}
                {activeTab === "buy" && (
                  <div className="bg-white dark:bg-darkmode shadow-lg p-8 pb-10 rounded-b-lg rounded-tr-lg">
                    <div className="relative my-2">
                      <div className="relative flex items-center">
                        <div className="absolute left-0 p-4">
                          <Image
                            src={getImgPath("/images/svgs/icon-location.svg")}
                            alt="Location"
                            width={24}
                            height={24}
                          />
                        </div>

                        {/* INPUT */}
                        <input
                          type="text"
                          placeholder="Search Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={() =>
                            setTimeout(() => setShowSuggestions(false), 200)
                          }
                          className="py-5 pl-14 pr-4 w-full rounded-lg border border-border dark:border-dark_border dark:bg-[#0c121e] text-black dark:text-white focus:border-primary dark:focus:border-primary"
                        />

                        {/* SUGGESTIONS */}
                        {showSuggestions && (
                          <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-semidark border border-border rounded-md z-10 max-h-[130px] overflow-y-auto">
                            <ul className="py-3 px-5">
                              {suggestions.map((item, index) => (
                                <li
                                  key={index}
                                  onMouseDown={() => handleSelect(item)}
                                  className="cursor-pointer text-lg dark:text-white hover:text-primary"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Search Buttons */}
                    <div className="mt-6 flex flex-col-reverse gap-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <button
                          onClick={handleSearchBuy}
                          className="flex-1 py-4 bg-primary text-white rounded-lg hover:bg-blue-700"
                        >
                          Search
                        </button>

                        <button
                          onClick={handleSearchBuy}
                          className="flex-1 py-4 bg-skyBlue/80 dark:bg-skyBlue/80 text-white rounded-lg hover:bg-skyBlue"
                        >
                          Advance Search
                        </button>
                      </div>

                      {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ratings Display */}
            <div className="flex flex-col ml-4 mt-8 mb-12 gap-3">
              <div className="flex space-x-2" data-aos="fade-left">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                    </svg>
                  ))}
              </div>

              <p className="text-lg dark:text-white text-black" data-aos="fade-left">
                4.9/5 <span className="text-gray-400">- from 658 reviews</span>
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:block hidden col-span-6 absolute xl:-right-60 right-0 bottom-0 -z-1">
            <Image
              src={getImgPath("/images/hero/hero-image.png")}
              alt="heroimage"
              width={800}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero;
