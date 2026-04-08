import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ExamInterface from '../../components/Mcq/examInterface';

export default async function DataWrapper() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/login');
  }

  const response = await fetch(
    `${process.env.API_URL}/question/list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!data.success && data?.detail?.message === "Invalid or expired token.") {
    redirect('/login');
  }

  return <ExamInterface data={data}/>
}