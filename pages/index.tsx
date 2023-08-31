import type { GetServerSideProps, NextPage } from "next";
import { Fragment } from "react";
import { wrapper } from "../Core/Redux/store";
import { apiConfig } from "../Core/Redux/constants";
import BookList from "../Core/Components/BookList";
import Filters from "../Core/Components/Filters";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Filters />
      <BookList />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    // Fetching BookList for the first Time

    const res = await fetch(
      apiConfig.baseUrl +
        "everything?" +
        new URLSearchParams({
          filters: `{"list":[{"type":3,"value":164},{"type":21,"value":0},{"type":50,"value":0}]}`,
          offset: "0-0-0-16",
          order: "1",
        }),
         { cache: 'force-cache' }
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
  });

export default Home;
