
export default function Loading() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
            <div className="text-center font-sans">
                <div className="flex flex-col gap-6 items-center justify-center">
                    <div className="w-20 h-20 border-4 border-transparent text-[#2B6CEE] animate-spin flex items-center justify-center border-t-[#2B6CEE] rounded-full">
                        <div className="w-14 h-14 border-4 border-transparent text-[#EF4444] animate-spin flex items-center justify-center border-t-[#EF4444] rounded-full"></div>
                    </div>
                    <p className="text-[#4C669A] font-bold text-lg animate-pulse tracking-wide">
                        Gathering  Data...
                    </p>
                </div>
            </div>
        </div>
    );
}
