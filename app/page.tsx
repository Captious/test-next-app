import ClientHomePage from "@/app/client-home-page";

export default async function Page() {
    const res = await fetch('http://localhost:3000/api/users', {
        next: {revalidate: 0},
    });
    const users = await res.json();
    return <ClientHomePage users={users}/>;
}
