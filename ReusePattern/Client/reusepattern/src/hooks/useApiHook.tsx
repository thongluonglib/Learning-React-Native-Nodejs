import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AxiosInstance from '../axios/axios';
interface IParams {
  pageNumber?: number,
  limit?: number,
}
interface IOptions {
  loadmore?: boolean
}
// for pagenumber let enable USE_PAGE_NUMBER = true
const USE_PAGE_NUMBER = false
const useApiHook = (url: string, params?: IParams) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const pageNumber = useRef(0);
  const limit = useRef(20);
  useEffect(() => {
    // Handler cache data or do something here
  }, [data])
  async function callApi(extraData?: IParams, options?: IOptions) {
    setLoading(true)
    if (extraData?.limit) {
      limit.current = extraData?.limit
    }
    else {
      limit.current = params?.limit || 20
    }
    if (options?.loadmore) {
      if (USE_PAGE_NUMBER) {
        pageNumber.current += 1
      }
      else {
        pageNumber.current += limit.current
      }
    }
    else {
      pageNumber.current = 0
    }
    const response = await AxiosInstance.post(url, {
      ...params,
      ...extraData,
      pageNumber: pageNumber.current,
      limit: limit.current,
    })
    setLoading(false)
    if (response.data?.length > 0) {
      if (options?.loadmore) {
        setData([...data, ...response.data])
      }
      else {
        setData(response.data)
      }
    }
    else {
      // TODO 
    }

  }
  async function loadMorePage(extraData?: IParams) {
    await callApi({
      ...extraData
    }, {
      loadmore: true
    })

  }
  return {
    loading,
    data,
    callApi,
    loadMorePage
  }
}

export default useApiHook

const styles = StyleSheet.create({})