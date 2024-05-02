export const generateWeekDates = (weekNumber) => {
  const today = new Date();
  const yearStart = new Date(today.getFullYear(), 0, 1); // January 1st of the current year
  const weekStart = new Date(yearStart);

  // Calculate the number of days to add to get to the start of the specified week
  const daysToAdd = (weekNumber - 1) * 7;
  weekStart.setDate(weekStart.getDate() + daysToAdd);

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);

    const formattedDate = day
      .toLocaleDateString('en-LT', {
        weekday: 'short',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '.');

    dates.push(formattedDate);
  }

  return dates;
};

export const getWeekNumber = (date) => {
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);

  return weekNo;
};
