"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { Conversation, User } from "@prisma/client";
import useChatPartner from "@/app/hooks/useChatPartner";
import { CldUploadButton } from "next-cloudinary";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ChatForm: React.FC<HeaderProps> = ({ conversation }) => {
  const chatPartner = useChatPartner(conversation);
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-5 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="ybfmvrdc"
      >
        <HiPhoto
          size={30}
          className="text-sky-500 hover:text-sky-600 transition cursor-pointer"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder={`Send a message to ${
            conversation.isGroup ? conversation.name : chatPartner.name
          }`}
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
