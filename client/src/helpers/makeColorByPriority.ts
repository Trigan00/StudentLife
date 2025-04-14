export const makeColor = (index: number | null) => {
  let color = '';
  switch (index) {
    case 1:
      color = 'green';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;

    default:
      color = 'grey';
      break;
  }
  return color;
};
