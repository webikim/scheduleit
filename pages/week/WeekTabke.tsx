import { Grid, GridProps, styled, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Children } from "react";

class WeekData {
    day: number;

    constructor(day: number) {
        this.day = day;
    }
}

const WeekString = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const titleColor = deepPurple[200];

const WeekName = styled(Grid)<GridProps>(({ theme }) => ({
    background: titleColor,
    borderRight: "1px solid black",
    height: "1.5em",
}));

const WeekDate = styled(Grid)<GridProps>(({ theme }) => ({}));

const getWeekHeader = (date: Date) => {
    const refDate = new Date(date);
    refDate.setDate(refDate.getDate() - refDate.getDay());

    let weekData: WeekData[] = Array(7);
    for (let i = 0; i < weekData.length; i++) weekData[i] = new WeekData(i);
    const weekHeader = []
    weekData.map((each) => {
        weekHeader.push(
            <Grid item md={1.6} sm={1.6} xs={1.6}>
                <WeekName>
                    <Typography align="center">
                        {WeekString[each.day]}
                    </Typography>
                </WeekName>
                <WeekDate>
                    <Typography align="center">
                        {refDate.toISOString().slice(0, 10)}
                    </Typography>
                </WeekDate>
            </Grid>
        );
        refDate.setDate(refDate.getDate() + 1);
    })
    return (
        <>
            { Children.toArray(weekHeader) }
        </>
    )
}

interface WeekProps {
    start: number;
    end: number;
    slotPerHour: number;
    date: Date;
}

const WeekTable = (props: WeekProps) => {
    return (
        <>
            <Grid container>
                <Grid item md={0.8} sm={0.8} xs={0.8}>
                    <WeekName>
                        <Typography>Time</Typography>
                    </WeekName>
                    <WeekDate>
                        <Typography>&nbsp;</Typography>
                    </WeekDate>
                </Grid>
                { getWeekHeader(props.date) }
            </Grid>
        </>
    );
};

export default WeekTable;
