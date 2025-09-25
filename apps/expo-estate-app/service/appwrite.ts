import { Client, Avatars, Account, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export const config = {
  platform: "com.heonys.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client //
  .setProject(config.projectId!)
  .setPlatform(config.platform)
  .setEndpoint(config.endpoint!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUrl = Linking.createURL("/");

    const response = await account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: redirectUrl,
    });
    if (!response) throw new Error("Failed to login");

    const browserResult = await WebBrowser.openAuthSessionAsync(response.toString(), redirectUrl);
    if (browserResult.type !== "success") throw new Error("Failed to login");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login");

    const sessioin = await account.createSession({ userId, secret });
    if (!sessioin) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession({ sessionId: "current" });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatar.getInitialsURL(response.name);
      return { ...response, avatar: userAvatar.toString() };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
