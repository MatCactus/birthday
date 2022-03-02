import type { NextPage } from "next";
import { motion } from "framer-motion";

const Home: NextPage = () => {
    return (
        <div className="h-screen w-screen font-semibold text-lg px-8 flex flex-row items-center justify-evenly">
            <body className="bg-bg" />
            <motion.div
                initial={{ opacity: "0%", width: "185vw" }}
                animate={{ opacity: "100%" }}
                className="bg-box rounded-xl shadow-2xl ml-2 mr-10 p-6 px-12 text-text-ice"
            >
                Module de Listing des Choses
            </motion.div>
            <div className="flex flex-col">
                <iframe
                    src="https://embed.waze.com/iframe?zoom=17&lat=46.8388593&lon=-0.621037&pin=1"
                    width="300"
                    className="rounded-t-xl shadow-2xl m-2 portrait:mt-10"
                    height="380"
                    title="11, Rue de la Fontaine, Cirières. 79140"
                ></iframe>
                <a
                    target="_blank"
                    rel="noopener"
                    className="underline italic m-2 p-4 text-sm bg-box shadow-2xl text-text-ice flex justify-center items-center"
                    href="https://www.google.fr/maps/place/11+Rue+Sainte-Radegonde,+79140+Ciri%C3%A8res/@46.8388314,-0.6217533,19.25z/data=!4m5!3m4!1s0x4807aa95f62a96a9:0x1725130cbd3dc528!8m2!3d46.8389303!4d-0.621256"
                >
                    11, Rue Sainte Radegonde, 79140, Cirières
                </a>
                <iframe
                    className="rounded-b-xl shadow-2xl m-2"
                    src="https://open.spotify.com/embed/playlist/1v7ivWXEULN754Brx37NxU?utm_source=generator&theme=0"
                    width="300"
                    height="380"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
            </div>
        </div>
    );
};

export default Home;
