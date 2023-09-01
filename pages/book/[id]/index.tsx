import React, { Fragment } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { wrapper } from "../../../Core/Redux/store";
import { apiConfig } from "../../../Core/Redux/constants";
import BookInfo from "../../../Core/Components/BookInfo";
import BookDetails from "../../../Core/Components/BookDetails";

const BookDetailPage: NextPage = () => {
  return (
    <Fragment>
      <BookInfo />
      <BookDetails />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query, params }) => {
    // Fetching BookDetail

    try {
      const res = await fetch(`${apiConfig.baseUrl}/book/${params?.id}`, {
        cache: "force-cache",
      });
      const data = await res.json();
      console.log(res);
      if (res.status != 200) {
        return {
          notFound: true,
        };
      } else {
        if (data) {
          // Dispatch Data To ServerSide Redux
          store.dispatch({
            type: "bookDetail",
            payload: JSON.stringify(data),
          });
        } else {
          return {
            notFound: true,
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
    return {
      props: {},
    };
  });

export default BookDetailPage;
