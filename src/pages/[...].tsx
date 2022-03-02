import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const All: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/");
    }, []);

    return <div className=""></div>;
};

export default All;
