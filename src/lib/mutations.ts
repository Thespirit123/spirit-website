// import { apiClient } from "@/lib/axios";
// import { UtilityProductResponse, UtilityType } from "@/types";
// import { useQuery } from "@tanstack/react-query";

// const fetchUtilityProducts = async (
//   type: UtilityType
// ): Promise<UtilityProductResponse> => {
//   try {
//     const { data } = await apiClient.post<UtilityProductResponse>(
//       "/get-products",
//       {
//         product_slug: type,
//       }
//     );
//     return data;
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to fetch products"
//     );
//   }
// };

// export const useUtilityProducts = (type: UtilityType) => {
//   return useQuery({
//     queryKey: ["utilityProducts", type],
//     queryFn: () => fetchUtilityProducts(type),
//     staleTime: 5 * 60 * 1000,
//     retry: 2,
//     select: (data) => data.products,
//   });
// };
