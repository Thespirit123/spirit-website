import React from "react";

const ChatButton: React.FC = React.memo(function ChatButton() {
    return (
        <a
            href="https://chat.whatsapp.com/IZ9kgz1qkJW4wpDZl36KwR"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join WhatsApp Group"
            className="z-50 bottom-6 top-un right-6 !bg-[#00C2D1] !hover:bg-[#0099a8] transition-colors rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)", position: "fixed" }}
        >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0" />
                <path
                    d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.06L2 22l5.09-1.33A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm0 18c-1.61 0-3.13-.39-4.46-1.09l-.32-.17-3.02.79.8-2.95-.2-.33A7.93 7.93 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8Zm4.29-6.1c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.13-.68-.6-1.14-1.34-1.28-1.57-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.41-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.29-.01-.45-.01-.15 0-.4.06-.61.29-.21.23-.8.78-.8 1.9 0 1.12.82 2.2.94 2.36.12.15 1.61 2.46 3.91 3.36.55.24.98.38 1.31.49.55.17 1.05.15 1.45.09.44-.07 1.36-.56 1.55-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.28Z"
                    fill="#fff"
                />
            </svg>
        </a>
    );
});

export default ChatButton;