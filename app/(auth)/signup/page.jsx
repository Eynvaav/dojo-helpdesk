'use client';

import { createClient } from '@/utils/supabase/client';

import AuthForm from '../AuthForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
	const router = useRouter();
	const [error, setError] = useState('');
	const handleSubmit = async (e, email, password) => {
		e.preventDefault();
		const supabase = createClient();
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/api/auth/confirm`,
			},
		});

		if (error) {
			setError(error.message);
		}
		if (!error) {
			router.push('/verify');
		}
	};

	return (
		<main>
			<h2 className='text-center'>Sign up</h2>
			<AuthForm handleSubmit={handleSubmit} />
			{error && <div className='error'>{error}</div>}
		</main>
	);
}
