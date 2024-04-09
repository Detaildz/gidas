export const generateWeekDates = (offset) => {
  const today = new Date();
  const weekStart = new Date(today);
  const mondayOffset = ((today.getDay() + 6) % 7) - 7 * offset; // Calculate the number of days to subtract to get to Monday

  weekStart.setDate(today.getDate() - mondayOffset);

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);

    const formattedDate = day
      .toLocaleDateString('en-LT', {
        weekday: 'long',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '.');

    dates.push(formattedDate);
  }

  return dates;
};
