import classNames from 'classnames'

interface SkeletonProps {
  times: number
  className: string
}
function Skeleton({ times, className }: SkeletonProps) {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5',
    className,
  )
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200',
  )
  const boxes = Array(times)
    .fill(0)
    .map((_, index) => {
      const width = index % 2 === 0 ? 100 + '%' : 100 - index * 5 + '%'
      return (
        <div key={index} className={outerClassNames} style={{ width: width, height: '20px' }}>
          <div className={innerClassNames}></div>
        </div>
      )
    })
  return <div>{boxes}</div>
}
export default Skeleton
