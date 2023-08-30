import { apiConfig } from "./constants";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
let { baseUrl } = apiConfig;
baseUrl = baseUrl + "/";

export interface Options {
  dispatch: Dispatch;
}

export interface NotifTexts {
  success: string;
  error: string;
}

const Axios = axios.create({
  validateStatus: null,
  baseURL: baseUrl,
});
class DataManager {
  get = async (
    url: string,
    params: {},
    opt: Options,
    data: {},
    reload: string | boolean
  ) =>
    await this.check(
      url,
      opt,
      async () =>
        await Axios.get(url, {
          params,
          ...opt,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }),
      data || params,
      reload
    );

  patch = async (
    url: string,
    params: object,
    opt: Options,
    data: object,
    reload: string | boolean,
    notifTexts: NotifTexts | undefined
  ) =>
    await this.check(
      url,
      opt,
      async () =>
        await Axios.patch(url, params, {
          ...opt,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }),
      data || params,
      reload,
      notifTexts
    );
  post = async (
    url: string,
    params: object,
    opt: Options,
    data: object,
    reload: string | boolean,
    notifTexts: NotifTexts | undefined
  ) =>
    await this.check(
      url,
      opt,
      async () =>
        await Axios.post(url, params, {
          ...opt,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }),
      data || params,
      reload,
      notifTexts
    );
  put = async (
    url: string,
    params: object,
    opt: Options,
    data: object,
    reload: string | boolean,
    notifTexts: NotifTexts | undefined
  ) =>
    await this.check(
      url,
      opt,
      async () =>
        await Axios.put(url, params, {
          ...opt,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }),
      data || params,
      reload,
      notifTexts
    );
  delete = async (
    url: string,
    params: object,
    opt: Options,
    data: object,
    reload: string | boolean,
    notifTexts: NotifTexts | undefined
  ) => {
    await this.check(
      url,
      opt,
      async () =>
        await Axios.delete(url, {
          ...opt,
          data: params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }),
      data || params,
      reload,
      notifTexts
    );
  };

  check = async (
    url: string,
    { dispatch }: { dispatch: Dispatch },
    fetch: Function,
    params: object,
    reload: string | boolean,
    notifTexts: NotifTexts = {
      success: "عملیات با موفقیت انجام شد",
      error: "خطایی رخ داده است",
    }
  ) => {
    dispatch = dispatch || (() => {});
    dispatch({ type: "LOADING_START" });

    try {
      let response = await fetch();

      if (response.data) {
        dispatch({ type: url, payload: response.data, params });
        dispatch({ type: "LOADING_END" });
        if (notifTexts?.success) {
          toast.success(notifTexts.success);
        }
        console.log("STATUS 200 RES:", response);
        if (typeof reload == "string") {
          window.location.href = reload;
        }
        if (typeof reload == "boolean" && reload == true) {
          window.location.reload();
        }
      }
    } catch (error: any) {
      dispatch({ type: "LOADING_END" });

      if (error?.response?.status == 401) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.reload();
      }

      if (error?.response?.data?.message) {
        toast.error(error?.response.data?.message);
        return null;
      }

      console.log(error?.response?.data);
      dispatch({
        type: url.split("/")[0] + "/" + "error",
        data: error?.response?.data,
        params,
      });
    }
  };
}
const _dataManager = new DataManager();

export default _dataManager;