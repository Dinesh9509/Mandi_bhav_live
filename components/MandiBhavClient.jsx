"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsIlJPTEVTIjpbIkFETUlOIl0sImV4cCI6MTc0Njg3MjQ5MCwiaWF0IjoxNzE1MzM2NDkwfQ.EIYq0nt0SPU8ouHfnMCXNUw7deBp3BuzvSFPo-OXhhw";

export default function MandiBhavClient() {
  const [apmcData, setApmcData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const headers = { Authorization: `Bearer ${PUBLIC_TOKEN}` };
        const apmcRes = await axios.get(`${BASE_URL}/admin/getAllApmc`, { headers });
        setApmcData((apmcRes.data?.data || []).slice());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mandi_list MandiBHavPage">
      <div className="container">
        <div className="title">
          <h2>राजस्थान मंडी</h2>
          <p>आज के मंडी भाव- दैनिक मंडी भाव जानने के लिए नीचे अलग अलग शहरों की मंडियों के लिए लिंक दिए गए हैं</p>
          <p>
            आप यहाँ आज राजस्थान के मंडी भाव तथा फ़सलो के भाव में आए उतार चड़ाव तेज़ी मंडी की रिपोर्ट देख सकते है।
            Mandibhavjankari.com मंडी भाव वेब्सायट एक बहुत ही विश्वशनिय स्त्रोत है राजस्थान मंडी भाव जानने के लिए
            इस वेब्सायट के माध्यम से हम आपको बिल्कुल सटीक भाव की जानकारी देने का पूरा प्रयास करते है
          </p>
        </div>

        {isLoading ? (
          <div
            className="loading-spinner"
            style={{ alignContent: "center", textAlign: "center", margin: "100px auto 100px" }}
          />
        ) : (
          <div className="Mandi List">
            <ul>
              {apmcData.map((item) => (
                <li key={item.id}>
                  <a href={`/${item.apmcNameEng}`}>
                    <span>{item.apmcNameHin}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="whatsapp">
          <div className="block max-w-xxl my-2 px-1 py-3 md:p-3 bg-green-600 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="grid grid-cols-12 md:px-2">
              <div className="col-span-9 flex">
                <div>
                  <a
                    href="https://chat.whatsapp.com/FMDfAPyfdrE1mJM4mjLOzw"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Mandibhavjankari.com contact whatsapp"
                    className="text-green-600 hover:bg-primary dark:bg-white hover:border-primary mr-1 flex h-11 w-11 md:h-16 md:w-16 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-slate-600 sm:mr-4 lg:mr-3 xl:mr-4"
                  >
                    <svg width="48" height="48" viewBox="0 0 30 30" className="fill-current">
                      <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z" />
                    </svg>
                  </a>
                </div>
                <div>
                  <p className="mb-2 text-sm md:text-2xl font-bold tracking-tight text-black dark:text-white">
                    Follow us on Whatsapp
                  </p>
                  <p className="text-[9px] md:text-base font-normal text-black dark:text-gray-400">
                    Join our whatsapp channel for latest update
                  </p>
                </div>
              </div>
              <div className="col-span-3 text-right align-middle">
                <a
                  href="https://chat.whatsapp.com/FMDfAPyfdrE1mJM4mjLOzw"
                  title="whatsapp channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-1 md:px-3 py-2 text-xs md:text-sm font-medium text-center text-dark bg-gray-100 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join now
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
