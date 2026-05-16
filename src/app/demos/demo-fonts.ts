import {
  Alegreya,
  Anton,
  Archivo_Black,
  Barlow,
  Bebas_Neue,
  Bitter,
  Black_Ops_One,
  Cabin,
  Chakra_Petch,
  Cinzel,
  Cormorant_Garamond,
  DM_Sans,
  DM_Serif_Display,
  Epilogue,
  Exo_2,
  Figtree,
  Fraunces,
  Hind,
  IBM_Plex_Sans,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
  Jost,
  Karla,
  Lexend,
  Libre_Baskerville,
  Lato,
  Lora,
  Manrope,
  Montserrat,
  Merriweather,
  Mulish,
  Nunito,
  Noto_Sans,
  Open_Sans,
  Orbitron,
  Oswald,
  Outfit,
  Playfair_Display,
  Prata,
  Plus_Jakarta_Sans,
  PT_Serif,
  Quicksand,
  Raleway,
  Rajdhani,
  Red_Hat_Text,
  Roboto,
  Rubik,
  Source_Sans_3,
  Space_Grotesk,
  Spectral,
  Syne,
  Sora,
  Teko,
  Tenor_Sans,
  Unbounded,
  Urbanist,
  Work_Sans,
  Yeseva_One,
  Zilla_Slab,
} from "next/font/google";

/** Tipografías únicas por demo: cada rubro tiene pareja display + cuerpo sin repetir familia entre sí. */

const hFerreteria = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-demo-h-ferreteria",
});
const bFerreteria = Inter({
  subsets: ["latin"],
  variable: "--font-demo-b-ferreteria",
});

const hRestaurante = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-restaurante",
});
const bRestaurante = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-restaurante",
});

const hEstetica = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-estetica",
});
const bEstetica = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-estetica",
});

const hGimnasio = Oswald({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-demo-h-gimnasio",
});
const bGimnasio = Karla({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-demo-b-gimnasio",
});

const hVeterinaria = Nunito({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-demo-h-veterinaria",
});
const bVeterinaria = Quicksand({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-demo-b-veterinaria",
});

const hInmobiliaria = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-inmobiliaria",
});
const bInmobiliaria = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-inmobiliaria",
});

const hTech = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-demo-h-tech",
});
const bTech = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-demo-b-tech",
});

const hFloreria = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-floreria",
});
const bFloreria = Mulish({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-floreria",
});

const hTaller = Teko({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-demo-h-taller",
});
const bTaller = Barlow({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-taller",
});

const hAbogados = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-demo-h-abogados",
});
const bAbogados = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-demo-b-abogados",
});

const farmaciaHead = Outfit({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-demo-h-farmacia",
});
const bFarmacia = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-farmacia",
});

const hOdontologia = Merriweather({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-demo-h-odontologia",
});
const bOdontologia = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-odontologia",
});

const hContadores = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-demo-h-contadores",
});
const bContadores = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-contadores",
});

const hMusica = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-demo-h-musica",
});
const bMusica = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-musica",
});

const hDetailing = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-detailing",
});
const bDetailing = Rubik({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-demo-b-detailing",
});

const hPanaderia = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-demo-h-panaderia",
});
const bPanaderia = Lexend({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-panaderia",
});

const hViajes = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-viajes",
});
const bViajes = Figtree({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-viajes",
});

const hLimpieza = Exo_2({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-limpieza",
});
const bLimpieza = Urbanist({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-limpieza",
});

const hFoto = Spectral({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-foto",
});
const bFoto = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-foto",
});

const hOptica = Syne({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-demo-h-optica",
});
const bOptica = Cabin({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-optica",
});

const hHeladeria = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-demo-h-heladeria",
});
const bHeladeria = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-heladeria",
});

const hLavadero = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-demo-h-lavadero",
});
const bLavadero = Raleway({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-lavadero",
});

const hSeguridad = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-seguridad",
});
const bSeguridad = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-seguridad",
});

const hYoga = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-demo-h-yoga",
});
const bYoga = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-yoga",
});

const hHotel = Yeseva_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-demo-h-hotel",
});
const bHotel = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-demo-b-hotel",
});

const hCatering = Prata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-demo-h-catering",
});
const bCatering = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-catering",
});

const hPaisajismo = Alegreya({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-paisajismo",
});
const bPaisajismo = Bitter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-paisajismo",
});

const hTattoo = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-demo-h-tattoo",
});
const bTattoo = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-demo-b-tattoo",
});

const hCerrajeria = Zilla_Slab({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-demo-h-cerrajeria",
});
const bCerrajeria = Hind({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-cerrajeria",
});

const hCoworking = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-demo-h-coworking",
});
const bCoworking = Epilogue({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-demo-b-coworking",
});

/** Concatenar en el layout de /demos para definir todas las variables CSS. */
export const demoFontsClassName = [
  hFerreteria.variable,
  bFerreteria.variable,
  hRestaurante.variable,
  bRestaurante.variable,
  hEstetica.variable,
  bEstetica.variable,
  hGimnasio.variable,
  bGimnasio.variable,
  hVeterinaria.variable,
  bVeterinaria.variable,
  hInmobiliaria.variable,
  bInmobiliaria.variable,
  hTech.variable,
  bTech.variable,
  hFloreria.variable,
  bFloreria.variable,
  hTaller.variable,
  bTaller.variable,
  hAbogados.variable,
  bAbogados.variable,
  farmaciaHead.variable,
  bFarmacia.variable,
  hOdontologia.variable,
  bOdontologia.variable,
  hContadores.variable,
  bContadores.variable,
  hMusica.variable,
  bMusica.variable,
  hDetailing.variable,
  bDetailing.variable,
  hPanaderia.variable,
  bPanaderia.variable,
  hViajes.variable,
  bViajes.variable,
  hLimpieza.variable,
  bLimpieza.variable,
  hFoto.variable,
  bFoto.variable,
  hOptica.variable,
  bOptica.variable,
  hHeladeria.variable,
  bHeladeria.variable,
  hLavadero.variable,
  bLavadero.variable,
  hSeguridad.variable,
  bSeguridad.variable,
  hYoga.variable,
  bYoga.variable,
  hHotel.variable,
  bHotel.variable,
  hCatering.variable,
  bCatering.variable,
  hPaisajismo.variable,
  bPaisajismo.variable,
  hTattoo.variable,
  bTattoo.variable,
  hCerrajeria.variable,
  bCerrajeria.variable,
  hCoworking.variable,
  bCoworking.variable,
].join(" ");
