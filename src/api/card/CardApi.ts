import { setCardData } from "../../slices/card/cardSlice";
import { CardResponse } from "../../utils/types/CardOverviewType";
import { api } from "../api";

const cardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCard: builder.query<CardResponse, void | undefined>({
      query: () => {
        return "card/get-card";
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCardData(data.data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetCardQuery } = cardApi;
