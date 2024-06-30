import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const useApiHook = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const pageNumber = useRef(0);
  function callApi(url?: string, params?: {}) {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setData([{
        name: 'Hello'
      }])
    }, 3000);
  }
  function loadMorePage(limit = 20){
    pageNumber.current += 1
  }
  return {
    loading,
    data,
    callApi
  }
}

export default useApiHook

const styles = StyleSheet.create({})