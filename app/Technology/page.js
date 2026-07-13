import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "कृषि यंत्र और तकनीक - Agricultural Machinery in Hindi",
  description:
    "आधुनिक कृषि यंत्र, ट्रैक्टर अटैचमेंट, सिंचाई उपकरण व कृषि तकनीक की हिंदी में पूरी जानकारी। किसानों के लिए उपयोगी मशीनरी मार्गदर्शन।",
  path: "/Technology",
  keywords: ["कृषि यंत्र", "agricultural machinery", "खेती की मशीन", "Agriculture technology Hindi", "कृषि तकनीक"],
});

export default function TechnologyPage() {
  return (
    <>
      <div className="inner_banner technology">
        <div className="container">
          <h2>
            Agricultural Machinery <br />
            आधुनिक कृषि यंत्र
          </h2>
        </div>
      </div>

      <div className="main">
        <div className="container">
          <h1>Agricultural Machinery and Technology &amp; Their Usage in Agriculture</h1>
          <img src="/images/technology_02.jpg" alt="Agricultural Machinery" />
          <p>
            Various types of modern agriculture machinery and technology are used in different
            agricultural operations nowadays. Different levels in crop production include – Primary
            and secondary level tillage of the soil, Seeding and planting, Cultivation, Fertilizer
            application and distribution, Pest control, Harvesting, Irrigation, Drainage,
            Transportation, Storage, Handling the residues of earlier crops etc.
          </p>
          <p>
            Since the olden times, animals were the primary source of energy when it was about tough
            jobs in farming. Later on, steam power started replacing the same. And then gas-powered
            tractors took over, followed by diesel engines. In the developed nations, it caused
            lowering the number of farmworkers, however, farm production continuously increased with
            the use of agriculture machinery.
          </p>
          <p>
            Technology in agriculture has transformed and increased production and quality of
            produces. In modern times, farmers who are doing heavy works on farms using traditional
            and old agriculture tools are wasting their health and time. A tractor that used to be
            known as a technological genius in the agricultural field is old news now. The modern
            farm machinery has upgraded the agricultural industry for the best. Some of the
            essential and most used machinery are Combine or Combine Harvester, Rotavator or Rotary
            Tiller, Plough or Plow, Tractor Trailer, Power Harrow, Leveler, water bowser, ripper
            machine, and disc harrow. Below we have mentioned a few of the latest agriculture
            machinery and their uses in farming.
          </p>

          <h3>Plough</h3>
          <p>
            Plough, a primary tillage equipment works as a tractor implement attached with a tractor
            and helps in tilling the land efficiently. This remarkable piece of agricultural
            machinery is used for preparing the land in the planting season. Either its about
            turning an all new land into a farm or just preparing existing farm to sow seeds,
            various types of plough (mould-board plough, reversible plough, disc plough) allow
            farmers to turn the soil into a nutrient rich seedbed for better plant growth.
          </p>
          <img src="/images/technology_03.jpg" alt="Plough" />

          <h3>Combine Harvester</h3>
          <p>
            Bigger in size a Combine works like a comb cutter for cutting the mature crops with
            threshing at the same time. A combine is one of the most upgraded machinery that helps
            farmers by saving long hours of the day wasting in harvesting activities.
          </p>
          <img src="/images/technology_04.jpg" alt="Combine Harvester" />
          <p>
            The multi-crop combine harvester is designed in such a way that it is compatible for
            harvesting multiple grain crops such as wheat, corn, barley, grain sorghum, soybeans,
            oats, sunflower, rice. A modern multi-crop harvester makes harvesting faster so that the
            fields can be open for the next crop in minimum period of time, and the probability of
            production increases within the period.
          </p>

          <h3>Rotavator or Rotary Tiller</h3>
          <p>
            A rotavator or rotary tiller is a versatile tillage equipment that uses a series of
            blades, to turn up the soil. Rotary tillers are quite popular among farmers to make easy
            the preparation of seedbed in the farms. The equipment is mainly used for breaking soil
            in lawns, farms, gardens, etc. The use of rotary tillers has significantly increased in
            agricultural operations because of its simple built and high-end efficiency as a tillage
            implement.
          </p>
          <img src="/images/technology_05.jpg" alt="Rotary Tiller" />

          <h3>Disc Harrow</h3>
          <p>
            The disc harrow is one of the essential tillage implements that farmers can invest into,
            to increase their production. This tillage equipment is also used in secondary tillage
            process as it helps in breaking up lumps of the soil easily, efficiently and faster to
            give it a rich finish when it comes to prepare a final seedbed. It also allow farmers to
            control weeds around the plants once the crop is planted and grown.
          </p>

          <h3>Leveler</h3>
          <p>
            This tractor implements make the soil more levelled, smooth and surface obtained,
            enabling it to create a moist environment for crops and reducing consumption of
            fertilizers, seeds, chemical and fuel.
          </p>

          <h3>Conclusion</h3>
          <p>
            With the use of the above mentioned modern agriculture machinery and technology nowadays
            farming has improved more like a science than art. The sole purpose of using the
            technology and machinery in agriculture is improving productivity, efficiency and making
            farming more sustainable.
          </p>
        </div>
      </div>
    </>
  );
}
