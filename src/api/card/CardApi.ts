import { setCardDetails } from "../../slices/card/cardSlice";
import { CardApiResponse } from "../../utils/types/CardOverviewType";
import { api } from "../api";

export const cardService = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchCardDetails: builder.query<CardApiResponse, void | undefined>({
      query: () => "card/get-card",
      providesTags: ["Transaction"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCardDetails(data.data));
        } catch (error) {
          console.error("Fetching card details failed", error);
        }
      },
    }),
    updateTotalAmount: builder.mutation({
      query: (cardDetails) => ({
        url: "card/create-card",
        method: "POST",
        body: cardDetails,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCardDetails(data.data));
        } catch (error) {
          console.error("Updating total amount failed", error);
        }
      },
    }),
  }),
});

export const { useFetchCardDetailsQuery, useUpdateTotalAmountMutation } =
  cardService;
