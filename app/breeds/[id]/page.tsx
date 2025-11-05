import { DogsType } from '@/app/types/types';
import DogPage from './DogPage';


export async function generateStaticParams() {

  const res = await fetch('https://api.thedogapi.com/v1/breeds');
  const data: DogsType[] = await res.json();

  // Возвращаем массив объектов с id для каждой страницы
  return data.map(breed => ({
    id: breed.id.toString()
  }));
}

const DogPages = ({ params }: { params: { id: string } }) => {
  console.log('params:', params); 
  return (
    <DogPage id={params.id}/>
  )
}

export default DogPages