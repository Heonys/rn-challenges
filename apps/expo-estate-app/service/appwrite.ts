import { Client, Avatars, Account, OAuthProvider, TablesDB, Query } from "react-native-appwrite";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export const config = {
  platform: "com.heonys.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  agentsTableId: "agents",
  gallerriesTableId: "galleries",
  reviewsTableId: "reviews",
  propertiesTableId: "properties",
};

export const client = new Client();

client //
  .setProject(config.projectId!)
  .setPlatform(config.platform)
  .setEndpoint(config.endpoint!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const tables = new TablesDB(client);

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

export async function getLatestProperties() {
  try {
    const result = await tables.listRows({
      databaseId: config.databaseId!,
      tableId: config.propertiesTableId,
      queries: [Query.orderDesc("$createdAt"), Query.limit(5)],
    });
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

export async function getFilteredProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const queries = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All") queries.push(Query.equal("type", filter));
    if (limit) queries.push(Query.limit(limit));
    if (query) {
      queries.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ]),
      );
    }
    const result = await tables.listRows({
      databaseId: config.databaseId!,
      tableId: config.propertiesTableId,
      queries,
    });
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await tables.getRow({
      databaseId: config.databaseId!,
      tableId: config.propertiesTableId!,
      rowId: id,
    });
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
