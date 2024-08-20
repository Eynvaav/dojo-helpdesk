import Link from 'next/link';

export default function Notfound() {
	return (
		<main className='text-center'>
			<h2 className='text-3xl'>We Hit a Brick Wall.</h2>
			<p>
				Go back to all <Link href='/tickets'>tickets</Link>.
			</p>
		</main>
	);
}
