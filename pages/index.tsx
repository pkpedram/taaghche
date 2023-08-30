import type { GetStaticProps, NextPage } from "next";

import { Fragment } from "react";
import { wrapper } from "../Core/Redux/store";
import axios from "axios";
import { apiConfig } from "../Core/Redux/constants";
import { FilteringData } from "../Core/Redux/Reducers/Filters";
import BookList from "../Core/Components/BookList";

const Home: NextPage = () => {
  return (
    <Fragment>
      <BookList />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<{}> = wrapper.getStaticProps(
  (store) =>
    async ({ preview }) => {
      // Fetching BookList for the first Time

      const res = await fetch(
        apiConfig.baseUrl +
          "everything?" +
          new URLSearchParams({
            filters: `{"list":[{"type":3,"value":164},{"type":21,"value":0},{"type":50,"value":0}]}`,
            offset: "0-0-0-16",
            order: "1",
          })
      );
      const data = await res.json();

      // Dispatch Data To ServerSide Redux

      store.dispatch({
        type: "everything",
        payload: JSON.stringify(data),
      });

      store.dispatch({
        type: "SET_FILTERING_DATA",
        payload: JSON.stringify({
          hasMore: data.hasMore,
          nextOffset: data.nextOffset,
          orderingList: JSON.stringify(data.bookList.spinnerItems),
        }),
      });

      return {
        props: {},
      };
    }
);

export default Home;
