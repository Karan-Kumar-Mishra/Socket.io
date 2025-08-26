export default function Message(msg: string) {
    return (
        <div className='w-80 flex flex-wrap justify-between  items-center border-1 border-white m-2 p-2 overflow-hidden rounded-2xl' key={msg}>
            <p>
                {msg}
            </p>
            <p className='h-4 w-4 m-[0.1rem] bg-red-500  rounded-full'></p>
        </div>
    )
}
