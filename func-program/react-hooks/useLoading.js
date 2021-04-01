// 简易Loading
import React, { useEffect, useState } from 'react'

const useloadingDirt = (isLoading, data) => {
  const [displayNotice, setDisplayNotice] = useState('');
  useEffect(() => {
    if (isLoading) { displayNotice = 'loading' }
    return () => {
      displayNotice = ''
    }
  })
  return displayNotice
}

function FeedbackText ({ isLoading }) {
  const displayNotice = useloadingDirt(isLoading)
  return (
    < textarea rows="10" disabled={isLoading} > { displayNotice}</textarea >
  )
}

function FeedbackButton ({ isLoading }) {
  const displayNotice = useloadingDirt(isLoading)
  //省略与本节无关的click事件
  return (
    <>
      <button disabled={isLoading} > 点击提交</button>
      <label>displayNotice</label>
    </>
  )

}

function FeedbackPagePartA ({ isLoading }) {
  return (
    <>
      <FeedbackText isLoading={isLoading} />
      <FeedbackButton isLoading={isLoading} />
    </>
  )
}