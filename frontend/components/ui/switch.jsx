import React from 'react';

const ThinkingSwitch = ({ isThinking, setIsThinking }) => {

  const handleToggle = () => {
    setIsThinking(!isThinking);
  };

  return (
    <div className="text-white rounded-lg max-w-sm mx-auto shadow-xl">
      <div className="flex justify-between items-center mb-2">
        
        <div
          className={`relative w-11 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
            isThinking ? 'bg-indigo-500' : 'bg-gray-700'
          }`}
          onClick={handleToggle}
        >
          {/* The Switch Handle */}
          <div
            className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              isThinking ? 'translate-x-full' : 'translate-x-1'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingSwitch;
