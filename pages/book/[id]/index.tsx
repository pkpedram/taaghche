import React from 'react'
import type { GetServerSideProps, NextPage } from "next";
import { wrapper } from '../../../Core/Redux/store';
import { apiConfig } from '../../../Core/Redux/constants';

const BookDetailPage : NextPage = () => {
  return (
    <div>BookDetailPage</div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query, params }) => {
    // Fetching BookDetail

    const res = await fetch(
      `${apiConfig.baseUrl}/book/${params?.id}`,
         { cache: 'force-cache' }
    );
    const data = await res.json();

    // Dispatch Data To ServerSide Redux


    store.dispatch({
      type: "bookDetail",
      payload: JSON.stringify(data),
    });

    return {
      props: {},
    };
  });


export default BookDetailPage