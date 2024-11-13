// store all the helper function

export default function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
  const dateString = date.toLocaleDateString('en-US', options);
  const [weekday, datePart] = dateString.split(', ');
  const [month, day, year] = datePart.split('/'); 
  const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return `${year}-${month}-${day} ${weekday} ${timeString}`;
};