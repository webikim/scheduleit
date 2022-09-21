import React from 'react';

import path from "path";
import fs from "fs/promises";

import Head from "next/head";
import Image from "next/image";
import WeekTable from './WeekTabke';

interface Props {
    scheduleConfig: {
        start: number;
        end: number;
        slotPerHour: number;
    };
}

function Week(props) {
    const { scheduleConfig } = props;
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
                <WeekTable {...scheduleConfig} date={Date()}></WeekTable>
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
