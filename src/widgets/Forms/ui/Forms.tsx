import React, { useState } from 'react';
import cls from './Forms.module.scss';
import { Tab, Tabs } from '@mui/material';
import { MainInfo } from './MainInfo/MainInfo';
import { EducationInfo } from './EducationInfo/EducationInfo';
import { AdditionalInfo } from './AdditionalInfo/AdditionalInfo';

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
            className={cls.tabpanel}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )
            }
        </div >
    );
}

export const Forms = () => {

    const [activeTab, setTab] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <div>
            <div className={cls.form__menu}>
                <Tabs value={activeTab} onChange={handleChangeTab}>
                    <Tab label="Основная информация" />
                    <Tab label="Образование" />
                    <Tab label="Навыки" />
                </Tabs>
            </div>
            <div
                className={cls.form}
            >
                <TabPanel value={activeTab} index={0} >
                    <MainInfo changeTab={setTab} />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <EducationInfo changeTab={setTab} />
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <AdditionalInfo />
                </TabPanel>
            </div>
        </div >
    );
};
