import * as dayjs from 'dayjs';

type WithTime = {
  time: string;
} & Record<string, any>;

export default function sortByTime(arr: WithTime[]): WithTime[] {
  const referenceTime = dayjs().format('YYYY-MM-DD HH:mm');

  const sortedData = [...arr].sort((a, b) => {
    const timeA = dayjs(a.time, 'YYYY-MM-DD HH:mm');
    const timeB = dayjs(b.time, 'YYYY-MM-DD HH:mm');
    const refTime = dayjs(referenceTime, 'YYYY-MM-DD HH:mm');

    // Сортируем по разнице с referenceTime
    return Math.abs(timeB.diff(refTime)) - Math.abs(timeA.diff(refTime));
  });

  return sortedData;
}
