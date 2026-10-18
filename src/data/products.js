// export const CATEGORIES = [
//   { id: "oshxona-smestitel", name: "Oshxona smestitellari", count: "5 ta model", img: "/images/oshxona/B8093NG.jpg" },
//   { id: "smestitel", name: "Vanna va Rakovina Smestitellari", count: "4 ta model", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" },
//   { id: "dush", name: "BOOU Dush tizimlari", count: "3 ta model", img: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=600&q=80" },
//   { id: "unitaz", name: "BOOU Unitazlar", count: "3 ta model", img: "https://images.unsplash.com/photo-1585058177579-3eb8113426e6?auto=format&fit=crop&w=600&q=80" },
//   { id: "umivalnik", name: "BOOU Umivalniklar", count: "3 ta model", img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80" },
//   { id: "oyna", name: "Oyna va shkaflar", count: "3 ta model", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80" },
//   { id: "vanna", name: "Vannalar", count: "2 ta model", img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80" },
//   { id: "kran", name: "BOOU Kranlar", count: "2 ta model", img: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=600&q=80" },
//   { id: "sifon", name: "BOOU Sifon va traplar", count: "2 ta model", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" },
//   { id: "aksessuar", name: "BOOU Aksessuarlar", count: "3 ta model", img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80" }
// ];
export const CATEGORIES = [
  { id: "oshxona-smestitel", name: "Oshxona smestitellari", img: "/images/oshxona/B8093NG.jpg" },
  { id: "rakovina-smestitel", name: "Rakovina Smestitellari", img: "/images/rakovina/B8215PB.jpg" },
  { id: "smestitel", name: "Vanna Smestitellari", img: "/images/vanna/B8280NGG.jpg" },
  { id: "dush-tizimlari", name: "BOOU Dush tizimlari", img: "/images/dush/B7160PB.jpg" },
  // { id: "unitaz", name: "BOOU Unitazlar", img: "https://images.unsplash.com/photo-1585058177579-3eb8113426e6?auto=format&fit=crop&w=600&q=80" },
  // { id: "umivalnik", name: "BOOU Umivalniklar", img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80" },
  // { id: "oyna", name: "Oyna va shkaflar", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80" },
  // { id: "kran", name: "BOOU Kranlar", img: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=600&q=80" },
  // { id: "sifon", name: "BOOU Sifon va traplar", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" },
  // { id: "aksessuar", name: "BOOU Aksessuarlar", img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80" }
];
export const INITIAL_PRODUCTS = [
  // --------------- oshxona ---------------------
  {
    id: "boou-kitchen-stork",
    code: "BOOU-10F",
    name: "BOOU Laylak Ko'rinishidagi Smestitel",
    category: "oshxona-smestitel",
    categoryName: "Oshxona smestitellari",
    price: 17,
    oldPrice: 20,
    isPopular: true,
    isNew: false,
    image: "/images/oshxona/B10F.jpg",
    description: "BOOU klassik oshxona krani: zanglamaydigan mustahkam korpus, uzoq xizmat qiluvchi keramik kartrij va har qanday rakovinaga mos tushuvchi ixcham dizayn.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-9205XROM", price: 17, oldPrice: 20, image: "/images/oshxona/B10F.jpg" },
    ]
  },

  {
    id: "boou-kitchen-l-shape",
    code: "BOOU-8093",
    name: "BOOU L-Dizayn Oshxona Smestiteli",
    category: "oshxona-smestitel",
    categoryName: "Oshxona smestitellari",
    price: 36,
    oldPrice: 42,
    isPopular: true,
    isNew: true,
    image: "/images/oshxona/B8093NG.jpg",
    description: "BOOU firmasining original korobkasidagi mashhur L-simon oshxona smestiteli. 100% zanglamaydigan latun korpus, 360° erkin aylanuvchi forma. 4 xil premial rangda: Mat Qora, Grafit, Yaltiroq Xrom va Tilla Mat.",
    colors: [
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8093PB", price: 36, oldPrice: 41, image: "/images/oshxona/B8093PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8093NGG", price: 38, oldPrice: 42, image: "/images/oshxona/B8093NGG.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8093", price: 35, oldPrice: 40, image: "/images/oshxona/B8093XROM.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8093NG", price: 38, oldPrice: 42, image: "/images/oshxona/B8093NG.jpg" }
    ]
  },
  {
    id: "boou-kitchen-flexible",
    code: "BOOU-9243",
    name: "BOOU Moslashuvchan Silikon Shlangli Oshxona Krani",
    category: "oshxona-smestitel",
    categoryName: "Oshxona smestitellari",
    price: 33,
    oldPrice: 37,
    isPopular: true,
    isNew: true,
    image: "/images/oshxona/B9243NGG.jpg",
    description: "Idishlar va rakovinani tozalashni osonlashtiruvchi BOOU oshxona smestiteli — erkin egiluvchan silikon naycha hamda 1 xil barqaror oqim rejimi bilan. Rangi: Mat qora, Grafit, Yaltiroq Xrom va Tilla Mat",
    colors: [
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-9243PB", price: 34, oldPrice: 37, image: "/images/oshxona/B9243PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-9243NGG", price: 35, oldPrice: 39, image: "/images/oshxona/B9243NGG.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-9243XROM", price: 32, oldPrice: 35, image: "/images/oshxona/B9243XROM.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-9243NG", price: 36, oldPrice: 40, image: "/images/oshxona/B9243NG.jpg" }
    ]
  },
  {
    id: "boou-kitchen-filter-dual",
    code: "BOOU-9205",
    name: "BOOU 2-1 Suv Filtrli Oshxona Smestiteli",
    category: "oshxona-smestitel",
    categoryName: "Oshxona smestitellari",
    price: 52,
    oldPrice: 57,
    isPopular: true,
    isNew: true,
    image: "/images/oshxona/B9205NGG.jpg",
    description: "Rakovinaga qo‘shimcha kran o‘rnatishga hojat yo‘q: BOOU kombinatsiyalangan smestiteli ham kundalik vodoprovod suvini, ham toza filtrlangan ichimlik suvini alohida kanallar orqali bitta ixcham korpusda taqdim etadi.",
    colors: [
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-9205PB", price: 52, oldPrice: 57, image: "/images/oshxona/B9205PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-9205NGG", price: 52, oldPrice: 57, image: "/images/oshxona/B9205NGG.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-9205XROM", price: 50, oldPrice: 55, image: "/images/oshxona/B9205XROM.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-9205NG", price: 55, oldPrice: 60, image: "/images/oshxona/B9205NG.jpg" }
    ]
  },

  {
    id: "boou-kitchen-filter-duall",
    code: "BOOU-9210",
    name: "BOOU Platinum 2-1 Suv Filtrli Oshxona Smestiteli",
    category: "oshxona-smestitel",
    categoryName: "Oshxona smestitellari",
    price: 105,
    oldPrice: 115,
    isPopular: false,
    isNew: true,
    image: "/images/oshxona/B9210PB.jpg",
    description: "Rakovinani ortiqcha teshishga hojat qoldirmaydigan BOOU Platinum krani — toza filtr suvi va oddiy suvni bitta korpusda jamlab, harakatdan so‘ng o‘z o‘rniga mahkam tortiluvchi magnitli jomrak orqali maksimal qulaylik beradi.",
    colors: [
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-9210PB", price: 185, oldPrice: 215, image: "/images/oshxona/B9210PB.jpg" },
      { name: "Matoviy", hex: "#D7D0CC", code: "BOOU-9210MAT", price: 180, oldPrice: 210, image: "/images/oshxona/B9210MAT.jpg" },
    ]
  },

  {
    id: "boou-kitchen-L-shape platinum",
    code: "BOOU-8314",
    name: "BOOU Platinum L-Dizayn Oshxona Smestiteli",
    category: "oshxona-smestitel",
    categoryName: "Oshxona smestitellari",
    price: 100,
    oldPrice: 115,
    isPopular: false,
    isNew: true,
    image: "/images/oshxona/B8314NG.jpg",
    description: "Katta idishlarni yuvishni osonlashtiruvchi 360° aylanuvchi L-simon BOOU Platinum krani — original zavod qadog‘idagi mustahkam zanglamas latun korpus hamda har qanday oshxonaga mos Mat Qora, Grafit, Xrom va Tilla Mat ranglari uyg‘unligi.",
    colors: [
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8314PB", price: 110, oldPrice: 135, image: "/images/oshxona/B8314PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8314NGG", price: 115, oldPrice: 140, image: "/images/oshxona/B8314NGG.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8314", price: 100, oldPrice: 115, image: "/images/oshxona/B8314XROM.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8314NG", price: 115, oldPrice: 140, image: "/images/oshxona/B8314NG.jpg" }
    ]
  },

  // -------------------------vanna-------------------
  {
    id: "boou-bath-5413",
    code: "BOOU-5413-18",
    name: "BOOU 5413 Vanna Smestiteli",
    category: "smestitel",
    categoryName: "Vanna Smestitellari",
    price: 25,
    oldPrice: 28,
    isPopular: true,
    isNew: false,
    image: "/images/vanna/B5413.jpg",
    description: "BOOU vanna smestiteli: Korroziyaga va qattiq suvga chidamli toza latun metallidan tayyorlangan. Ishonchli keramik kartrij suvni bir tekis va shovqinsiz boshqaradi. Qulay to‘plam: 3 xil funksiyali dush leykasi, egiluvchan 1,50m shlang va devorga o‘rnatish detallari birga keladi.",
    colors: [
      { name: "Xrom", hex: "#e2e8f0", code: "BOOU-5413-18", price: 25, oldPrice: 29, image: "/images/vanna/B5413.jpg" },
    ]
  },
  {
    id: "boou-bath-8276",
    code: "BOOU-8276-18",
    name: "BOOU 8276 Vanna Smestiteli ",
    category: "smestitel",
    categoryName: "Vanna Smestitellari",
    price: 28,
    oldPrice: 31,
    isPopular: true,
    isNew: false,
    image: "/images/vanna/B8276.jpg",
    description: "BOOU vanna smestiteli: Korroziyaga va qattiq suvga chidamli toza latun metallidan tayyorlangan. Ishonchli keramik kartrij suvni bir tekis va shovqinsiz boshqaradi. Qulay to‘plam: 5 xil funksiyali dush leykasi, egiluvchan 1,50m shlang va devorga o‘rnatish detallari birga keladi.",
    colors: [
      { name: "Xrom", hex: "#e2e8f0", code: "BOOU-8276-18", price: 28, oldPrice: 31, image: "/images/vanna/B8276.jpg" }
    ]
  },
  {
    id: "boou-bath-5330",
    code: "BOOU-5330-18",
    name: "BOOU 5330 Vanna Smestiteli",
    category: "smestitel",
    categoryName: "Vanna Smestitellari",
    price: 25,
    oldPrice: 29,
    isPopular: true,
    isNew: false,
    image: "/images/vanna/B5330.jpg",
    description: "BOOU vanna smestiteli: Korroziyaga va qattiq suvga chidamli toza latun metallidan tayyorlangan. Ishonchli keramik kartrij suvni bir tekis va shovqinsiz boshqaradi. Qulay to‘plam: 5 xil funksiyali dush leykasi, egiluvchan 1,50m shlang va devorga o‘rnatish detallari birga keladi.",
    colors: [
      { name: "Xrom", hex: "#e2e8f0", code: "BOOU-5330-18", price: 25, oldPrice: 29, image: "/images/vanna/B5330.jpg" },
    ]
  },
  {
    id: "boou-bath-8280",
    code: "BOOU-8280-18",
    name: "BOOU 8280 Vanna Smestiteli ",
    category: "smestitel",
    categoryName: "Vanna Smestitellari",
    price: 33,
    oldPrice: 36,
    isPopular: true,
    isNew: true,
    image: "/images/vanna/B8280.jpg",
    description: "BOOU vanna smestiteli: Korroziyaga va qattiq suvga chidamli toza latun metallidan tayyorlangan. Ishonchli keramik kartrij suvni bir tekis va shovqinsiz boshqaradi. Qulay to‘plam: 5 xil funksiyali dush leykasi, egiluvchan 1,50m shlang va devorga o‘rnatish detallari birga keladi. 4 xil premial rangda: Yaltiroq Xrom, Mat Qora, Grafit, Tilla Mat",
    colors: [
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8280-18PB", price: 42, oldPrice: 50, image: "/images/vanna/B8280PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8280-18NGG", price: 44, oldPrice: 52, image: "/images/vanna/B8280NGG.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8280-18XROM", price: 33, oldPrice: 36, image: "/images/vanna/B8280XROM.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8280-18NG", price: 44, oldPrice: 52, image: "/images/vanna/B8280NG.jpg" }
    ]
  },
  {
    id: "boou-bath-8174",
    code: "BOOU-8174-18",
    name: "BOOU 8174 Vanna Smestiteli ",
    category: "smestitel",
    categoryName: "Vanna Smestitellari",
    price: 37,
    oldPrice: 43,
    image: "/images/vanna/B8174.jpg",
    description: "BOOU vanna smestiteli: Korroziyaga va qattiq suvga chidamli toza latun metallidan tayyorlangan. Ishonchli keramik kartrij suvni bir tekis va shovqinsiz boshqaradi. Qulay to‘plam: 5 xil funksiyali dush leykasi, egiluvchan 1,50m shlang va devorga o‘rnatish detallari birga keladi.",
    colors: [
      { name: "Xrom", hex: "#e2e8f0", code: "BOOU-8174-18", price: 37, oldPrice: 43, image: "/images/vanna/B8174.jpg" }
    ]
  },
  {
    id: "boou-bath-8215",
    code: "BOOU-8215-18",
    name: "BOOU 8215 Vanna Smestiteli ",
    category: "smestitel",
    categoryName: "Vanna Smestitellari",
    price: 33,
    oldPrice: 36,
    isPopular: true,
    isNew:false,
    image: "/images/vanna/B8215.jpg",
    description: "BOOU vanna smestiteli: Korroziyaga va qattiq suvga chidamli toza latun metallidan tayyorlangan. Ishonchli keramik kartrij suvni bir tekis va shovqinsiz boshqaradi. Qulay to‘plam: 5 xil funksiyali dush leykasi, egiluvchan 1,50m shlang va devorga o‘rnatish detallari birga keladi. 2 xil premial rangda: Mat Qora, Yaltiroq Xrom",
    colors: [
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8215-18PB", price: 42, oldPrice: 50, image: "/images/vanna/B8215PB.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8280-18XROM", price: 33, oldPrice: 36, image: "/images/vanna/B8215XROM.jpg" },
    ]
  },
  {
    id: "boou-bath-8113",
    code: "BOOU-8113-45",
    name: "BOOU PLatinum 8113 Vanna Smestiteli ",
    category: "smestitel",
    categoryName: "Vanna Smestitellari",
    price: 33,
    oldPrice: 36,
    isPopular: false,
    isNew: true,
    image: "/images/vanna/B8113.jpg",
    description: "BOOU original firmasi mahsuloti. Jigarrang qadoqdagi latun korpusli ixcham vanna smestiteli.",
    colors: [
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8113-45NGG", price: 44, oldPrice: 52, image: "/images/vanna/B8113PLAT-NGG.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8113-45PB", price: 42, oldPrice: 50, image: "/images/vanna/B8113PLAT-PB.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8113-45XROM", price: 33, oldPrice: 36, image: "/images/vanna/B8113PLAT-XROM.jpg" },
    ]
  },

  {
    id: "boou-bath-8116",
    code: "BOOU-8116-45",
    name: "BOOU PLatinum 8116 Vanna Smestiteli ",
    category: "smestitel",
    categoryName: "Vanna Smestitellari",
    price: 33,
    oldPrice: 36,
    isPopular: false,
    isNew: true,
    image: "/images/vanna/B8116PLAT-NG.jpg",
    description: "BOOU original firmasi mahsuloti. Jigarrang qadoqdagi latun korpusli ixcham vanna smestiteli.",
    colors: [
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8116-45PB", price: 42, oldPrice: 50, image: "/images/vanna/B8116PLAT-PB.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8116-45XROM", price: 33, oldPrice: 36, image: "/images/vanna/B8116PLAT-XROM.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8116-45NG", price: 44, oldPrice: 52, image: "/images/vanna/B8116PLAT-NG.jpg" }
    ]
  },

  // -------------------------- rakovina ---------------------
  {
    id: "boou-14A-1",
    code: "BOOU-14A-1",
    name: "BOOU Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 15,
    oldPrice: 17,
    isPopular: true,
    isNew: false,
    image: "/images/rakovina/B14A.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-14A-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B14A.jpg" },
     
    ]
  },

  {
    id: "boou-8276-1",
    code: "BOOU-8276-1",
    name: "BOOU Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 23,
    oldPrice: 27,
    isPopular: true,
    isNew: false,
    image: "/images/rakovina/B8276.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8276-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8276.jpg" },
     
    ]
  },

  {
    id: "boou-8280-1",
    code: "BOOU-8280-1",
    name: "BOOU Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 27,
    oldPrice: 31,
    isPopular: true,
    isNew: false,
    image: "/images/rakovina/B8280XROM.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8280-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8280XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8280-1PB", price: 42, oldPrice: 50, image: "/images/rakovina/B8280PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8280-1NGG", price: 44, oldPrice: 52, image: "/images/rakovina/B8280NGG.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8280-1NG", price: 44, oldPrice: 52, image: "/images/rakovina/B8280NG.jpg" }
    ]
  },

  {
    id: "boou-8215-1",
    code: "BOOU-8215-1",
    name: "BOOU Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 30,
    oldPrice: 35,
    isPopular: true,
    isNew: true,
    image: "/images/rakovina/B8215XROM.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8215-18XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8215XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8215-18PB", price: 42, oldPrice: 50, image: "/images/rakovina/B8215PB.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8215-18NG", price: 44, oldPrice: 52, image: "/images/rakovina/B8215NG.jpg" }
    ]
  },

  {
    id: "boou-8086-1",
    code: "BOOU-8086-1",
    name: "BOOU Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 40,
    oldPrice: 45,
    isPopular: false,
    isNew: false,
    image: "/images/rakovina/B8086.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8086-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8086.jpg" },
    ]
  },

  {
    id: "boou-8089-1",
    code: "BOOU-8089-1",
    name: "BOOU Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 35,
    oldPrice: 39,
    isPopular: true,
    isNew: true,
    image: "/images/rakovina/B8089.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8089-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8089.jpg" },
     
    ]
  },

  {
    id: "boou-8093-1",
    code: "BOOU-8093-1",
    name: "BOOU Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 40,
    oldPrice: 45,
    isPopular: true,
    isNew: true,
    image: "/images/rakovina/B8093.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8093-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8093XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8093-1PB", price: 42, oldPrice: 50, image: "/images/rakovina/B8093PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8093-1NGG", price: 44, oldPrice: 52, image: "/images/rakovina/B8093NGG.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8093-1NG", price: 44, oldPrice: 52, image: "/images/rakovina/B8093NG.jpg" }
    ]
  },

  {
    id: "boou-8321-1",
    code: "BOOU-8321-1",
    name: "BOOU Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 40,
    oldPrice: 45,
    isPopular: true,
    isNew: true,
    image: "/images/rakovina/B8321NGG.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8321-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8321XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8321-1PB", price: 42, oldPrice: 50, image: "/images/rakovina/B8321PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8321-1NGG", price: 44, oldPrice: 52, image: "/images/rakovina/B8321NGG.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8321-1NG", price: 44, oldPrice: 52, image: "/images/rakovina/B8321NG.jpg" }
    ]
  },

  {
    id: "boou-8093-BJ",
    code: "BOOU-8093-BJ",
    name: "BOOU Platinum Baland Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 40,
    oldPrice: 45,
    isPopular: true,
    isNew: true,
    image: "/images/rakovina/B8093BJ-NG.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8093-1NGG", price: 44, oldPrice: 52, image: "/images/rakovina/B8093BJ-NGG.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8093-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8093BJ-XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8093-1PB", price: 42, oldPrice: 50, image: "/images/rakovina/B8093BJ-PB.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8093-1NG", price: 44, oldPrice: 52, image: "/images/rakovina/B8093BJ-NG.jpg" }
    ]
  },

  {
    id: "boou-8315-BJ",
    code: "BOOU-8315-BJ",
    name: "BOOU Platinum Baland Rakovina Smestiteli",
    category: "rakovina-smestitel",
    categoryName: "Rakovina Smestitellari",
    price: 40,
    oldPrice: 45,
    isPopular: false,
    isNew: true,
    image: "/images/rakovina/B8315NGG.jpg",
    description: "Tropik yomg'ir dushi, 3 rejimli qo'l leykasi va 38°C xavfsiz termostatli hashamatli dush kolonnasi.",
    colors: [
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU-8315-1NG", price: 44, oldPrice: 52, image: "/images/rakovina/B8315PLAT-NG.jpg" },
      { name: "Xrom", hex: "#d1d5db", code: "BOOU-8315-1XROM", price: 33, oldPrice: 36, image: "/images/rakovina/B8315PLAT-XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU-8315-1PB", price: 42, oldPrice: 50, image: "/images/rakovina/B8315PLAT-PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU-8315-1NGG", price: 44, oldPrice: 52, image: "/images/rakovina/B8315PLAT-NGG.jpg" },
    ]
  },




  // ------------------- Dush smestitellar ----------------------
  {
    id: "boou-7160",
    code: "BOOU-7160",
    name: "BOOU 7160 Dush Smestiteli",
    category: "dush-tizimlari",
    categoryName: "Dush tizimlari & Smestitellar",
    price: 48,
    oldPrice: 55,
    isPopular: true,
    isNew: true,
    image: "/images/dush/B7160PB.jpg",
    description: "Devor ichiga yashirin o‘rnatiladigan zamonaviy BOOU Platinum 7160 dush smestiteli. Qalin og‘ir latun korpus, qulay montaj qutisi (i-box) va tropik dush bilan qo‘l leykani boshqaruvchi silliq keramik perekluchatel. Hammom interyerini ortiqcha quvurlarsiz minimalist va hashamatli qiladi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU Platinum 7160XROM", price: 78, oldPrice: 85, image: "/images/dushavoy/B7160XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU Platinum 7160PB", price: 85, oldPrice: 90, image: "/images/dushavoy/B7160PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU Platinum 7160NGG", price: 95, oldPrice: 100, image: "/images/dushavoy/B7160NGG.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU Platinum 7160NG", price: 95, oldPrice: 100, image: "/images/dushavoy/B7160NG.jpg" }
    ]
  },

  {
    id: "boou-8315-57",
    code: "BOOU Platinum 8315-57",
    name: "BOOU Platinum 8315 Devor Ichki Dush Smestiteli",
    category: "dush-tizimlari",
    categoryName: "Dush tizimlari & Smestitellar",
    price: 48,
    oldPrice: 55,
    isPopular: true,
    isNew: true,
    image: "/images/dush/B8315PB.jpg",
    description: "Devor ichiga yashirin o‘rnatiladigan zamonaviy BOOU Platinum 8315 dush smestiteli. Qalin og‘ir latun korpus, qulay montaj qutisi (i-box) va tropik dush bilan qo‘l leykani boshqaruvchi silliq keramik perekluchatel. Hammom interyerini ortiqcha quvurlarsiz minimalist va hashamatli qiladi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU Platinum 8315-57XROM", price: 33, oldPrice: 36, image: "/images/dushavoy/B8315PLAT-XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU Platinum 8315-57PB", price: 42, oldPrice: 50, image: "/images/dushavoy/B8315PLAT-PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU Platinum 8315-57NGG", price: 44, oldPrice: 52, image: "/images/dushavoy/B8315PLAT-NGG.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU Platinum 8315-57NG", price: 44, oldPrice: 52, image: "/images/dushavoy/B8315PLAT-NG.jpg" }
    ]
  },

  {
    id: "boou-8116-57",
    code: "BOOU Platinum 8116-57",
    name: "BOOU Platinum 8116 Devor Ichki Dush Smestiteli",
    category: "dush-tizimlari",
    categoryName: "Dush tizimlari & Smestitellar",
    price: 48,
    oldPrice: 55,
    isPopular: true,
    isNew: true,
    image: "/images/dush/B8116PB.jpg",
    description: "Devor ichiga yashirin o‘rnatiladigan zamonaviy BOOU Platinum 8116 dush smestiteli. Qalin og‘ir latun korpus, qulay montaj qutisi (i-box) va tropik dush bilan qo‘l leykani boshqaruvchi silliq keramik perekluchatel. Hammom interyerini ortiqcha quvurlarsiz minimalist va hashamatli qiladi.",
    colors: [
      { name: "Xrom", hex: "#d1d5db", code: "BOOU Platinum 8116-57XROM", price: 33, oldPrice: 36, image: "/images/dushavoy/B8116PLAT-XROM.jpg" },
      { name: "Mat Qora", hex: "#1a1a1a", code: "BOOU Platinum 8116-57PB", price: 42, oldPrice: 50, image: "/images/dushavoy/B8116PLAT-PB.jpg" },
      { name: "Grafit", hex: "#4a4e54", code: "BOOU Platinum 8116-57NGG", price: 44, oldPrice: 52, image: "/images/dushavoy/B8116PLAT-NGG.jpg" },
      { name: "Tilla Mat", hex: "#d4af37", code: "BOOU Platinum 8116-57NG", price: 44, oldPrice: 52, image: "/images/dushavoy/B8116PLAT-NG.jpg" }
    ]
  },
  
  {
    id: "boou-toilet-rimless",
    code: "BOOU-UN-RM",
    name: "BOOU Podvesnoy Unitaz Rimless SoftClose",
    category: "unitaz",
    categoryName: "BOOU Unitazlar",
    price: 135,
    oldPrice: 165,
    isPopular: true,
    isNew: true,
    image: "  ",
    description: "Hoshiyasiz (Rimless) devorga osiluvchi gigiyenik unitaz. Sekin yopiluvchi dyuroplast qopqoq.",
    colors: [
      { name: "Oq Yaltiroq", hex: "#ffffff", code: "BOOU-UN-RM-WHT", price: 135, oldPrice: 165, image: "" },
      { name: "Mat Qora", hex: "#1f1f1f", code: "BOOU-UN-RM-BLK", price: 175, oldPrice: 210, image: " " }
    ]
  },
  {
    id: "boou-sink-classic",
    code: "BOOU-UM-60",
    name: "BOOU Umivalnik Classic 60 Nakladnoy",
    category: "umivalnik",
    categoryName: "BOOU Umivalniklar",
    price: 45,
    oldPrice: 55,
    isPopular: true,
    isNew: false,
    image: " ",
    description: "BOOU sanitariya chinnisidan ishlangan stol usti to'rtburchak umivalnik.",
    colors: [
      { name: "Oq Yaltiroq", hex: "#ffffff", code: "BOOU-UM-60-WHT", price: 45, oldPrice: 55, image: " " },
      { name: "Mat Qora", hex: "#1f1f1f", code: "BOOU-UM-60-BLK", price: 65, oldPrice: 80, image: " " }
    ]
  },
  {
    id: "boou-mirror-cab",
    code: "BOOU-OY-60",
    name: "Oyna Shkaf 60 cm LED Sensorli Anti-Fog",
    category: "oyna",
    categoryName: "Oyna va shkaflar",
    price: 85,
    oldPrice: 105,
    isPopular: true,
    isNew: true,
    image: " ",
    description: "Sensorli LED chiroqli oyna-shkaf. Bug'lanishga qarshi isitgich va javonlar."
  },
  {
    id: "boou-bathtub-free",
    code: "BOOU-VN-170",
    name: "Alohida Turuvchi Akril Vanna 170cm Freestanding",
    category: "vanna",
    categoryName: "Vannalar",
    price: 390,
    oldPrice: 460,
    isPopular: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q",
    description: "100% quyma akrildan ishlangan hashamatli alohida turuvchi vanna."
  }
];