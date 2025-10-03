import { Client, TablesDB, Query, ID, Models } from "react-native-appwrite";

export const config = {
  platform: "com.heonys.deliveryapp",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userTableId: "user",
};

export const client = new Client();
