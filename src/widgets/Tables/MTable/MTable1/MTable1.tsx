import { Typography } from '@mui/material';
import cls from './MTable1.module.scss'
import MUIDataTable from "mui-datatables";

const columns = [
    {
        name: "name",
        label: "Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "company",
        label: "Company",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "city",
        label: "City",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "state",
        label: "State",
        options: {
            filter: true,
            sort: false,
        }
    },
];

const data = [
    {
        name: "Иван Петров",
        company: "ООО Рога и Копыта",
        city: "Москва",
        state: "Московская область",
    },
    {
        name: "Анна Иванова",
        company: "ЗАО Прогресс",
        city: "Санкт-Петербург",
        state: "Ленинградская область",
    },
    {
        name: "Сергей Сидоров",
        company: "ИП ТехноГрупп",
        city: "Екатеринбург",
        state: "Свердловская область",
    },
    {
        name: "Ольга Козлова",
        company: "АО Новые Технологии",
        city: "Казань",
        state: "Республика Татарстан",
    },
    {
        name: "Михаил Васильев",
        company: "ОАО Прогрессив",
        city: "Нижний Новгород",
        state: "Нижегородская область",
    },
    {
        name: "Елена Смирнова",
        company: "ИП Вектор",
        city: "Воронеж",
        state: "Воронежская область",
    },
    {
        name: "Алексей Кузнецов",
        company: "ЗАО Новые Идеи",
        city: "Самара",
        state: "Самарская область",
    },
    {
        name: "Татьяна Ильина",
        company: "АО Инновации",
        city: "Ростов-на-Дону",
        state: "Ростовская область",
    },
    {
        name: "Николай Ковалев",
        company: "ИП МегаСервис",
        city: "Краснодар",
        state: "Краснодарский край",
    },
    {
        name: "Мария Павлова",
        company: "Группа СтройМастер",
        city: "Саратов",
        state: "Саратовская область",
    },
    {
        name: "Дмитрий Соколов",
        company: "ООО ТрансЛогистика",
        city: "Красноярск",
        state: "Красноярский край",
    },
    {
        name: "Оксана Иванова",
        company: "ЗАО ТехПродукты",
        city: "Владивосток",
        state: "Приморский край",
    },
    {
        name: "Андрей Козлов",
        company: "ИП ЛидерСтрой",
        city: "Сочи",
        state: "Краснодарский край",
    },
    {
        name: "Екатерина Лебедева",
        company: "ООО МедТехника",
        city: "Рязань",
        state: "Рязанская область",
    },
    {
        name: "Павел Новиков",
        company: "Группа ПрофМаркет",
        city: "Ульяновск",
        state: "Ульяновская область",
    },
    {
        name: "Алина Смирнова",
        company: "ИП ТекстильПро",
        city: "Тольятти",
        state: "Самарская область",
    },
];

const options = {
    filterType: 'checkbox',
};

export const MTable1 = () => {
    return (
        <div className={cls.MTable}>
            <Typography variant='h6' component={'h3'} sx={{ mb: '20px' }}>
                Таблица из доп. библиотеки MUI
            </Typography>
            <MUIDataTable
                title={"Первая таблица"}
                data={data}
                columns={columns}
                //@ts-ignore
                options={options}
            />
        </div>
    );
};
