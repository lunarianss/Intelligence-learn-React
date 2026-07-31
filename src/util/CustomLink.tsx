import { Link, LinkProps, useParams } from 'react-router-dom'

export const CustomLink = ({ children, to, ...props }: LinkProps) => {
  const pathName = to.toString()
  const resourceId = useParams().resourceId!
  let match = false

  if (resourceId) {
    const startPosition = pathName.length - resourceId.length
    match = pathName.includes(resourceId, startPosition)
  }

  return (
    <div>
      <Link
        style={{
          textDecoration: match ? 'underline' : 'none',
          backgroundColor: match ? 'rgb(231, 239, 252)' : '',
          color: 'black',
          height: '100%',
          display: 'inline-block',
          width: '100%'
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  )
}
