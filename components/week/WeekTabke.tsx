import { Grid, GridProps, styled, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Children } from "react";
import HourTable, { getHours, renderHourTitles } from "./HourTable";

class WeekData {
    day: number;
    date: Date;
    holiday: boolean;

    constructor(day: number, date: Date) {
        this.day = day;
        this.date = date;
    }
}

const WeekString = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const titleColor = deepPurple[200];

const formatDate = (date: Date) => {
    const mmdd = date.toISOString().slice(5, 10);
    if (mmdd.charAt(0) === "0")
        return mmdd.slice(1).replace("-", ".");
    return mmdd.replace("-", ".");
}

const WeekName = styled(Grid)<GridProps>(({ theme }) => ({
    background: titleColor,
    borderRight: "1px solid gray",
    height: "1.5em",
}));

const WeekDate = styled(Grid)<GridProps>(({ theme }) => ({ }));

const getWeekData = (date: Date) => {
    const refDate = new Date(date);
    refDate.setDate(refDate.getDate() - refDate.getDay() - 2);

    const weekData = WeekString.map((each, index: number) => { 
        refDate.setDate(refDate.getDate() + 1);
        return new WeekData(index, new Date(refDate));
    });
    return weekData;
}

const renderWeekHeader = (weekData: WeekData[]) => {
    const weekHeader: JSX.Element[] = [];
    weekData.map((each) => {
        weekHeader.push(
            <Grid item md={1.6} sm={1.6} xs={1.6}>
                <WeekName>
                    <Typography fontWeight={700} align="center">
                        {WeekString[each.day]}
                    </Typography>
                </WeekName>
                <WeekDate>
                    <Typography fontSize="small" align="center">
                        {formatDate(each.date)}
                    </Typography>
                </WeekDate>
            </Grid>
        );
    });
    return (
        <> { Children.toArray(weekHeader) } </>
    )
}

const renderWeeklySchedule = (props: WeekProps, weekData: WeekData[]) => {
    const schedules: JSX.Element[] = [];
    weekData.map((each) => {
        schedules.push(
            <Grid item md={1.6} sm={1.6} xs={1.6}>
                <HourTable {...props}></HourTable>
            </Grid>
        )
    });
    return (
        <> { Children.toArray(schedules) } </>
    )
}

interface WeekProps {
    start: number;
    end: number;
    slotsPerHour: number;
    date: Date;
}

const WeekTable = (props: WeekProps) => {
    const hourData = getHours(props.start, props.end);
    const weekData = getWeekData(props.date);
    return (
        <>
            <Grid container>
                <Grid item md={0.8} sm={0.8} xs={0.8}>
                    <WeekName>
                        <Typography sx={{ width: "100%", paddingTop: "2px"}} fontSize="small" fontWeight={700} align="center">Time</Typography>
                    </WeekName>
                    <WeekDate>
                        <Typography>&nbsp;</Typography>
                    </WeekDate>
                </Grid>
                { renderWeekHeader(weekData) }
            </Grid>
            <Grid container>
                <Grid item md={0.8} sm={0.8} xs={0.8}>
                    { renderHourTitles(hourData) }
                </Grid>
                { renderWeeklySchedule(props, weekData) }
            </Grid>
        </>
    );
};

export default WeekTable;
