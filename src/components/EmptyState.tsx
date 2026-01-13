import LottieAnimation from './LottieAnimation'

interface EmptyStateProps {
  title: string
  description: string
  lottieType?: 'loading' | 'success'
}

export default function EmptyState({
  title,
  description,
  lottieType = 'loading',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <LottieAnimation type={lottieType} className="w-48 h-48" />
      <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
        {description}
      </p>
    </div>
  )
}

