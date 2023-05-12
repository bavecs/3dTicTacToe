
export default function OfficeLayout({ children }: { children: React.ReactNode }) {
  return (

        <div className="w-full m-auto my-6 max-w-sm p-4 flex flex-col gap-3 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

          {children}
        </div>

  )
}
