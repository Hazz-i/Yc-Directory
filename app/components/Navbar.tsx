import { auth, signIn, signOut } from '@/auth';
import Link from 'next/dist/client/link';

const Navbar = async () => {
	const session = await auth();

	return (
		<header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
			<nav className='flex justify-between items-center'>
				<Link href='/'>
					<img src='./logo.png' alt='logo' width={144} height={30} />
				</Link>

				<div className='flex items-center gap-5 text-black'>
					{session && session?.user ? (
						<>
							<Link href='/startup/create'>
								<span>Create Startup</span>
							</Link>

							<form
								action={async () => {
									'use server';

									await signOut({ redirectTo: '/' });
								}}
								className='text-red-500'
							>
								<button type='submit'>Sign Out</button>
							</form>

							<Link href={`/user/${session?.id}`}>
								<span>{session?.user?.name}</span>
							</Link>
						</>
					) : (
						<>
							<form
								action={async () => {
									'use server';

									await signIn('github');
								}}
							>
								<button type='submit'>Login</button>
							</form>
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
