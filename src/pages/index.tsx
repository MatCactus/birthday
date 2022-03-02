import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <div className="h-screen w-screen font-serif px-8 flex flex-row items-center justify-evenly">
            <body className="bg-bg" />
            <div className=""></div>
            <div className="flex flex-col">
                <iframe
                    src="https://embed.waze.com/iframe?zoom=17&lat=46.8388593&lon=-0.621037&pin=1"
                    width="300"
                    className="rounded-xl rounded-b-none shadow-2xl m-2"
                    height="380"
                ></iframe>
                <iframe
                    className="rounded-xl rounded-t-none shadow-2xl m-2"
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
