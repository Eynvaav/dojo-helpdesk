import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton';

async function getTicket(id) {
	const supabase = createClient();

	const { data: ticket } = await supabase
		.from('Tickets')
		.select()
		.eq('id', id)
		.single();

	if (!ticket) {
		notFound();
	}

	return ticket;
}

export default async function TicketDetails({ params }) {
	const ticket = await getTicket(params.id);

	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<main>
			<nav>
				<h2>Ticket Details</h2>
				<div className='ml-auto'>
					{user.email === ticket.user_email && <DeleteButton id={ticket.id} />}
				</div>
			</nav>
			<div className='card'>
				<h3>{ticket.title}</h3>
				<small>Created by {ticket.user_email}</small>
				<p>{ticket.body}</p>
				<div className={`pill ${ticket.priority}`}>
					{ticket.priority} priority
				</div>
			</div>
		</main>
	);
}
