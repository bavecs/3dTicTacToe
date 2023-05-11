import { Inter } from 'next/font/google'


export default function Home() {
  return (

    <div className="w-full m-auto my-6 max-w-sm p-4 flex flex-col gap-3 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">Tic Tac Toe</h5>

      <div className='flex flex-col gap-4 md:flex-row'>

      </div>
      <p className='text-sm text-gray-600'>Join to existing room with room ID</p>

      <div className="relative">

        <input type="room_id" id="room_id" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Room ID" required />
        <button className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>
      </div>


      <hr />

      <p className='text-sm text-gray-600'> OR create a new roow</p>
      <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">New room</button>

    </div>

  )
}
