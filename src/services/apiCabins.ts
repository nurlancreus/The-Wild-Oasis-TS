/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not loaded");
  }

  return data;
}

export async function createUpdateCabin<T extends { image: File | string | undefined }>(
  newCabin: T,
  id?: number
) {
  let imagePath = "";

  let hasImagePath = false;
  if (typeof newCabin.image === "string") {
    hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    imagePath = newCabin.image;
  }

  let imageName = "";
  if (typeof newCabin.image !== "string") {
    imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // const imagePath = hasImagePath
  //   ? newCabin.image
  //   : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin.
  let query: any = supabase.from("cabins");

  // A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]); // data's column names must be matched with supabase table
  }

  // B) EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be ${id ? "updated" : "created"}`);
  }

  // 2. Upload image.
  // if image already there, there is no need to upload it to the server, simply return data
  if (hasImagePath) return data;

  const avatarFile = newCabin.image ?? "";
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, avatarFile);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(error);
    throw new Error(
      `Cabin image could not be uploaded and the cabin was not ${
        id ? "updated" : "created"
      }`
    );
  }

  return data;
}

// we should add new policy for users to delete columns
export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }

  return null;
}