import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useChatPartner = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const chatPartner = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const chatPartner = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return chatPartner[0];
  }, [session?.data?.user?.email, conversation.users]);
  return chatPartner;
};

export default useChatPartner;
