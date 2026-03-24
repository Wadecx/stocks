import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const usersWithRoles = users.map((user: any) => ({
      ...user,
      role: user.id === 1 ? 'admin' : 'user',
    }));

    return NextResponse.json(usersWithRoles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
}
