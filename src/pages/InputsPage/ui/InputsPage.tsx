import { Box, Container, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { EInputs, MInputs, AntInput } from "widgets/Inputs";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{
                    p: 3,
                    width: '100%',

                }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export const InputsPage = () => {
    const [tabValue, setTabValue] = useState<number>(0);

    const tabHandle = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%'
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={tabHandle}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                }}
            >
                <Tab label="Material UI" {...a11yProps(0)} />
                <Tab label="Easy UI" {...a11yProps(1)} />
                <Tab label="Ant design" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                <MInputs />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <EInputs />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <AntInput />
            </TabPanel>

        </Box>
    );
};
