import { Inter, Lusitana } from "next/font/google";
// subset - > specific font from the font family
export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
