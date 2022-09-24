import React, { Children } from "react";
import { Box, BoxProps, Grid, GridProps, styled, Typography, TypographyProps } from "@mui/material";

class HourInDay {
    hour: number;
    slots: number[];

    constructor(hour: number, slots: number) {
        this.hour = hour;
        this.slots = Array(slots);
    }
}

const HourTitle = styled(Grid)<GridProps>(({ theme }) => ({
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    borderBottom: "1px solid gray",
    height: "2em"
}));

const SlotBox = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    height: "2em",
    borderRight: "1px solid lightgray",
}));

const CenteredText = styled(Typography)<TypographyProps>(({ theme }) => ({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
}));

const SlotText = styled(Typography)<TypographyProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    "&:hover": {
        cursor: "pointer",
        textDecoration: "underline",
        textDecorationColor: "gray",
        fontWeight: 700
    }
}));

export const getHours = (start: number, end: number, slots: number = 0) => {
    let hourData: HourInDay[] = [];
    for (let i = start; i <= end; i++) hourData.push(new HourInDay(i, slots));
    return hourData;
};

export const renderHourTitles = (hourData: HourInDay[]) => {
    return (
        <>
            {hourData.map((hour, key) => {
                return (
                    <HourTitle item key={key}>
                        <CenteredText>
                            {hour.hour}
                        </CenteredText>
                    </HourTitle>
                );
            })}
        </>
    );
};

const setSlots = (props: HourTableProps, hours: HourInDay[]) => {
    const slotSize = 60 / props.slotsPerHour;
    hours.map((hour) => {
        for (let i = 0; i < hour.slots.length; i++) 
            hour.slots[i] = i * slotSize;
    })
}

const renderSlots = (data: HourInDay) => {
    let slots: JSX.Element[] = [];
    const formatter = Intl.NumberFormat("en", { minimumIntegerDigits: 2 })
    data.slots.map((each, key) => {
        slots.push(
            <SlotText>:{formatter.format(each)}</SlotText>
        )
    });
    return (
        <SlotBox> {Children.toArray(slots)} </SlotBox>
    );
}

const renderHourNslot = (hourData: HourInDay[]) => {
    let hourNslots: JSX.Element[] = [];
    hourData.map((data: HourInDay) => {
        hourNslots.push(
            renderSlots(data)
        );
    });
    return (
        <> { Children.toArray(hourNslots) } </>
    );
}

interface HourTableProps {
    start: number;
    end: number;
    slotsPerHour: number;
    date: Date;
}

const HourTable = (props: HourTableProps) => {
    const hourData = getHours(props.start, props.end, props.slotsPerHour);
    setSlots(props, hourData);
    return (
        <>
            {
                renderHourNslot(hourData)
            }
        </>
    );
};

export default HourTable;
