export const RewardPopup = ({ rewards, onSelect }: { rewards: string[]; onSelect: (reward: string) => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center p-6 z-50">
            <div className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-lg p-8 text-center max-w-md w-full shadow-2xl border-2 border-yellow-400">
                <h2 className="text-2xl text-yellow-300 font-bold mb-6">🎉 Correct! Choose a Reward</h2>
                <div className="flex flex-col gap-4">
                    {rewards.map((reward, index) => (
                        <button
                            key={index}
                            onClick={() => onSelect(reward)}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all transform hover:scale-105 shadow-lg"
                        >
                            {reward === 'faster_autofire' && '⚡ Faster Autofire'}
                            {reward === 'powerful_attack' && '💥 Powerful Attack'}
                            {reward === 'health_boost' && '❤️ Health Boost'}
                            {reward === 'area_attack_radius' && '📍 Area Attack Radius+'}
                            {reward === 'area_attack_power' && '🌟 Area Attack Power+'}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
