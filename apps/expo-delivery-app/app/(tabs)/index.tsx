import { Text, Pressable, View, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, offers } from "@/constants";
import cn from "clsx";
import { CartButton } from "@/components";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="pb-28 p-5"
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <Pressable
              className={cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
              style={{ backgroundColor: item.color }}
            >
              {({ pressed }) => (
                <>
                  <View className="h-full w-1/2">
                    <Image source={item.image} className="size-full" resizeMode="contain" />
                  </View>
                  <View className={cn("offer-card__info", isEven ? "pl-10" : "pr-10")}>
                    <Text className="h1-bold leading-tight text-white">{item.title}</Text>
                    <Image
                      source={images.arrowRight}
                      className="size-10"
                      resizeMode="contain"
                      tintColor="#fff"
                    />
                  </View>
                </>
              )}
            </Pressable>
          );
        }}
        ListHeaderComponent={() => (
          <View className="flex-between my-1 w-full flex-row px-5">
            <View className="flex-start">
              <Text className="smal-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-center mt-0.5 flex-row gap-x-1">
                <Text className="parapraph-bold">Croatia</Text>
                <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
