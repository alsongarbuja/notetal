import React from 'react'

const Badge = ({
    label,
    shape='square',
    variant='solid',
    color='green',
}: {
  label: string;
  shape?: 'rounded' | 'square';
  variant?: 'solid' | 'outline';
  color?: 'blue' | 'green' | 'purple' | 'red';
}) => {

  const colorScheme = color === 'green' ? {
    bg: 'bg-green-200/30',
    text: 'text-white',
    border: 'border-green-600/50',
    solid: 'bg-green-500',
    solidText: 'text-white',
  } 
    : color === 'red' ? {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      solid: 'bg-red-500',
      solidText: 'text-white',
    } 
    : color === 'blue' ? {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
      solid: 'bg-blue-500',
      solidText: 'text-white',
    } 
    : {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-300',
      solid: 'bg-purple-500',
      solidText: 'text-white',
    }

  return (
    <div
      className={`
        px-2 font-thin text-xs
        ${shape === 'rounded' ? 'rounded-full' : 'rounded-sm'}
        ${variant === 'solid' ? `${colorScheme.solid} ${colorScheme.solidText}` : `border-2 ${colorScheme.text} ${colorScheme.bg} ${colorScheme.border}`}
      `}
    >
      {label}
    </div>
  )
}

export default Badge