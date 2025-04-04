import dayjs from 'dayjs';

/**
 * Возвращает цвет в зависимости от близости дедлайна
 * @param deadlineDate - строка или объект dayjs
 * @returns string - имя цвета из темы MUI (например, 'error.main')
 */
export function getDeadlineColor(deadlineDate: string | dayjs.Dayjs): string {
  const deadline = dayjs(deadlineDate);
  const today = dayjs().startOf('day'); // убираем время
  const diff = deadline.diff(today, 'day');

  if (diff <= 0) return 'error.main'; // просрочено
  if (diff <= 2) return 'warning.main'; // скоро
  if (diff <= 7) return 'info.main'; // на горизонте
  return 'text.primary'; // всё ок
}
