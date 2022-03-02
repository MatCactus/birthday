import { motion } from "framer-motion";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <motion.div
            initial={{ opacity: "0%", translateY: "-17px" }}
            animate={{ opacity: "100%", translateY: "0px" }}
            transition={{ duration: "0.5" }}
        >
            <body className="bg-bg" />
            <Component {...pageProps} />
        </motion.div>
    );
}

export default MyApp;
