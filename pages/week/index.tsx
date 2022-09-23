import React from 'react';

import path from "path";
import fs from "fs/promises";

import Head from "next/head";
import Image from "next/image";
import { Box, Container } from '@mui/material';

import WeekTable from '../../components/week/WeekTabke';
import TopBar, { paddingAppSpace } from '../../components/TopBar';

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
                <Box sx={{ display: 'flex', height: "100vh" }}>
                    <TopBar>
                    </TopBar>
                    <Container sx={{ marginTop: '2em', flexGrow: 1 }}>
                        { paddingAppSpace() }
                        <WeekTable {...scheduleConfig} date={Date()}></WeekTable>
                    </Container>
                </Box>
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
