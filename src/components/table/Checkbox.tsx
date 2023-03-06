import React from 'react'

// eslint-disable-next-line import/no-named-as-default-member, react/display-name
export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  // eslint-disable-next-line import/no-named-as-default-member
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  // eslint-disable-next-line import/no-named-as-default-member
  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  )
})
