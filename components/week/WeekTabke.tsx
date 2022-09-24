import { Grid, GridProps, styled, Typography, TypographyProps } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Children } from "react";
import HourTable, { getHours, renderHourTitles } from "./HourTable";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px;",
    borderTopLeftRadius: "3px",
    borderRight: "1px solid gray",
    borderBottom: "1px solid gray",
    height: "3em"
}));

const WeekDate = styled(Grid)<GridProps>(({ theme }) => ({ }));

const CenteredText = styled(Typography)<TypographyProps>(({ theme }) => ({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
}));

const getWeekData = (date: Date) => {
    const refDate = new Date(date);
    refDate.setDate(refDate.getDate() - refDate.getDay() - 1);

    const weekData = WeekString.map((each, index: number) => { 
        refDate.setDate(refDate.getDate() + 1);
        return new WeekData(index, new Date(refDate));
    });
    return weekData;
}

const renderWeekHeader = (weekData: WeekData[]) => {
    const weekHeader: JSX.Element[] = [];
    weekData.map((each, index) => {
        weekHeader.push(
            <Grid item md={1.6} sm={1.6} xs={1.6}>
                <WeekDate>
                    <CenteredText>
                        { (index === 0) ? (<ArrowBackIosIcon/>) : (<></>)}
                        {formatDate(each.date)}
                        { (index === 6) ? (<>&nbsp;<ArrowForwardIosIcon/></>) : (<></>)}
                    </CenteredText>
                </WeekDate>
                <WeekName>
                    <CenteredText>
                        {WeekString[each.day]}
                    </CenteredText>
                </WeekName>
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
            <Grid container sx={{ marginTop: 5 }}>
                <Grid item md={0.8} sm={0.8} xs={0.8}>
                    <WeekDate>
                        <CenteredText>Date</CenteredText>
                    </WeekDate>
                    <WeekName>
                        <CenteredText fontSize="small" fontWeight={700}>Time</CenteredText>
                    </WeekName>
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
