export default function scroll_to_bottom() {
    let window= document.querySelector('.message_window');
    window?.scrollTo({ top: window.scrollHeight, behavior: "smooth" });
}