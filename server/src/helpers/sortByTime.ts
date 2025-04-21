import * as dayjs from 'dayjs';

type WithTime = {
  time: string;
} & Record<string, any>;

export default function sortByTime(arr: WithTime[]): WithTime[] {
  // const referenceTime = dayjs().format('YYYY-MM-DD HH:mm');

  const sortedData = [...arr].sort((a, b) => {
    const [aHours, aMinutes] = a.time.split(':').map(Number);
    const [bHours, bMinutes] = b.time.split(':').map(Number);

    if (aHours !== bHours) {
      return aHours - bHours;
    }
    return aMinutes - bMinutes;
  });

  return sortedData;
}
