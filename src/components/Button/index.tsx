import React from 'react';

interface Props {
    text: string,
    classNames: string,
    onClick: any
}

const Button: React.FC<Props> = ({
    text,
    classNames,
    onClick
}) => {
  return (
    <button className={classNames} onClick={onClick}>{text}</button>
  )
}

export default Button;