import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardLayout({ children }) {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();

	if (!data.user) {
		redirect('/login');
	}

	return (
		<>
			<Navbar user={data.user} />
			{children}
		</>
	);
}
