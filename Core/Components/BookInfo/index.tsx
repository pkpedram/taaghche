import React from "react";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import { ProductListItem } from "../../Redux/Reducers/reducerTypes";
import BreadCrumb from "../BreadCrumb";
import Image from "next/image";
import Link from "next/link";
import BookTypesAndPrices from "./BookTypesAndPrices";

type BookInfoProps = {
  productInfo: ProductListItem;
  isMobile: boolean
};

const BookInfo = ({ productInfo, isMobile }: BookInfoProps) => {
  let overAllData = [
    {
      title: "نویسنده",
      properties: [
        ...productInfo.authors.map((item) => ({
          title: `${item.firstName} ${item.lastName}`,
          link: (item.firstName + " " + item.lastName).split(" ").join("-"),
        })),
      ],
    },
    {
      title: "انتشارات",
      properties: [
        {
          title: productInfo.publisher,
          link: productInfo.publisherSlug,
        },
      ],
    },
    {
      title: "دسته بندی",
      properties: productInfo.categories.map((item) => ({
        title: item.title,
        link: item.slug,
      })),
    },
  ];

  return (
    <div className="w-full">
      <BreadCrumb
        categories={productInfo.categories}
        info={{
          name: productInfo.title,
          link: `https://taaghche.com/${productInfo.id}`,
        }}
      />

      <div className="flex w-full my-3 p-4 bg-white shadow-lg 2md:flex-col 2md:items-center rounded-2xl">
        <div className="w-1/4 sm:w-full 2md:mb-6 drop-shadow-lg">
          <Image
            src={productInfo.coverUri}
            alt={productInfo.title}
            width={640}
            height={75}
            className="rounded-xl rounded-r-sm shadow-lg"
          />
        </div>
        <div className="flex-1 w-full flex justify-between mr-6 2md:mr-0 2md:flex-col 2md:items-center">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3 w-full">
              <h1 className="text-2xl font-bold mb-8">
                {" "}
                کتاب {productInfo.title}
              </h1>
              {overAllData.map((data, idx) => (
                <div className="flex items-center text-sm text-gray-500 sm:flex-col sm:items-center sm:mb-3">
                  <p className="ml-8 sm:ml-0 sm:w-auto w-20">{data.title}:</p>

                  <div className="flex flex-wrap">
                  {data.properties.map((property, index) => (
                    <div>
                    <Link href={`https://taaghche.com/${property.link}`}>
                      {property.title}
                      {index !== data.properties.length - 1 && "/"}
                    </Link>
                    </div>
                  ))}
                    </div>
                </div>
              ))}

              <div className="flex items-center text-sm text-gray-500 sm:flex-col sm:mb-3">
                <p className="ml-8 sm:ml-0 sm:w-auto w-20">امتیاز:</p>
                <div className="flex gap-2">
                  <p className="p-1 px-2 text-xs rounded-full bg-main-blue/50">
                    {Number(productInfo.rating.toFixed(2)).toLocaleString(
                      "fa-ir"
                    )}
                  </p>
                  <p>
                    {" "}
                    از{" "}
                    {productInfo.rates
                      .map((item) => item.count)
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString("fa-ir")}{" "}
                    رای
                  </p>
                </div>
              </div>
            </div>
          </div>
          <BookTypesAndPrices
          bookId={productInfo.id}
          physical={{beforeOffPrice: productInfo.physicalBeforeOffPrice, has: productInfo.hasPhysicalEdition, price: productInfo.PhysicalPrice}} otherTypes={productInfo.types} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  productInfo: state.productState.productInfo,
  isMobile: state.publicState.isMobile
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo);
