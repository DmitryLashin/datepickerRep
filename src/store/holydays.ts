type Holyday = {
    date: Date,
    holydayTitle: string
  }

const holydays: Holyday[] = [ 
    {date: new Date(2023, 8, 19), holydayTitle: 'День повторного взятия Бастилии'}, 
    {date: new Date(2023, 10, 19), holydayTitle: 'Некруглая дата со дня рождения Петра I'}, 
    {date: new Date(2023, 9, 26), holydayTitle: 'Заурядный октябрьский четверг'} 
    ]

export {
    holydays,
    Holyday
}