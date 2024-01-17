import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import FriendsList from "./components/FriendsList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <FriendsList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
