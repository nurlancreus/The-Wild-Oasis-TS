import supabase, { supabaseUrl } from "./supabase";
import { TSignupFormSchema } from "@/features/authentication/authSchema";
import { type TUpdateUser } from "@/features/authentication/useUpdateUser";

export async function signup({
  fullName,
  email,
  password,
}: Omit<TSignupFormSchema, "passwordConfirm">) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({
  email,
  password,
}: Omit<TSignupFormSchema, "fullName" | "passwordConfirm">) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: TUpdateUser) {
  // 1. Update fullname OR password
  let updateData:
    | undefined
    | {
        password: string;
      }
    | {
        data: { fullName: string };
      };

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  if (!updateData) return;

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedUserError) throw new Error(updatedUserError.message);
  return updatedUser;
}
