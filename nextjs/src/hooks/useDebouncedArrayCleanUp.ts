import { Dispatch, SetStateAction, useEffect } from "react"

/**
 *
 * @param array array to be cleaned up
 * @param cleanUpAction setter function for the array to be cleaned up
 * @param delay time in milliseconds to wait before cleaning up the array
 */

const useDebouncedArrayCleanUp = (
  array: any[],
  cleanUpAction: Dispatch<SetStateAction<any>>,
  delay: number = 500
) => {
  useEffect(() => {
    let timer: number | null = null
    if (array.length > 0) timer = window.setTimeout(() => cleanUpAction([]), delay)

    return () => {
      timer && clearTimeout(timer)
    }
  }, [array, cleanUpAction, delay])
}

export default useDebouncedArrayCleanUp
