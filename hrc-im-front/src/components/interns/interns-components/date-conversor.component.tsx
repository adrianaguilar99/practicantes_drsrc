import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const TimeAgo = ({ date }: { date: string }) => {
  const timeAgo = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: es, 
  });

  return <p>{timeAgo}</p>;
};