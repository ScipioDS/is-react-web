export const QuizPopup = ({ question, onAnswer } :{question:any, onAnswer:any}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center p-6 z-50">
            <div className="bg-white rounded-lg p-6 text-center max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{question}</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => onAnswer(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        True
                    </button>
                    <button
                        onClick={() => onAnswer(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        False
                    </button>
                </div>
            </div>
        </div>
    );
};
