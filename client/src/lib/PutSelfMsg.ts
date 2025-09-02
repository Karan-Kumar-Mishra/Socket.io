
export default function PutSelfMsg(msg: string,color:string) {
    let window = document.querySelector('.message_window');
    let messge = document.createElement("div");
    messge.textContent = msg;
    messge.className = "ml-120 w-80 flex flex-wrap justify-between flex-end items-center border-1 border-"+(color ? color : "white")+"-400 m-2 p-2 overflow-hidden rounded-2xl";
    window?.appendChild(messge);
}