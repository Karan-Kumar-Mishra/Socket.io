
export default function PutSelfMsg(msg: string) {
    let window = document.querySelector('.message_window');
    let messge = document.createElement("div");
    messge.textContent = msg;
    messge.className = "w-80 flex flex-wrap justify-between flex-end  items-center border-1 border-white m-2 p-2 overflow-hidden rounded-2xl";
    window?.appendChild(messge);
}