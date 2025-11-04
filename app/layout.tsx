"use client";

import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import GlobalProvider from "./redux/GlobalProvider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import { fetchBreeds } from "./redux/features/breedsSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat", 
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "900"], 
});

const FetchBreeds = () => {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector(state=>state.breeds.breeds);

  useEffect(() => {
        if(breeds.length === 0){
            dispatch(fetchBreeds());
        }
  }, [dispatch]);

  return null;
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Provider store={store}>
        <html lang="en" className={`${montserrat.variable} ${geistMono.variable}`}>
          <body>
            <GlobalProvider>
              <Header/>
              <FetchBreeds />
                {children}
              <Footer/>
            </GlobalProvider>
          </body>
        </html>
    </Provider>
    
  );
}
