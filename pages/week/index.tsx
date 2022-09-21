import React from 'react';

import path from "path";
import fs from "fs/promises";

import Head from "next/head";
import Image from "next/image";

interface Props {
    scheduleConfig: {
        start: number;
        end: number;
        slotPerHour: number;
    };
}

function Week(props) {
    const { scheduleConfig } = props;
    console.log(props);
    return (
        <div>
            <Head>
                <title>Schedule a Week</title>
                <meta
                    name="description"
                    content="to schedule in a week"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>

            </main>

            <footer>
            </footer>
        </div>
    );
}

export async function getStaticProps() {
    const dataPath = path.join(process.cwd(), "config", "scheduleit.json");
    const jsonData = await fs.readFile(dataPath);
    const data = JSON.parse(jsonData.toString());

    return {
        props: data,
    };
}

export default Week;
