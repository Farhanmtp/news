import React from 'react';

function SeeMore({ text, button, onClick }) {
  return (
    <div className="text-center py-5 space-y-4">
      <h3 className="dark:text-darkblue text-lightblue text-heading font-medium">{text}</h3>
      <button
        onClick={onClick}
        className="dark:bg-darkblue dark:text-darkgray600 font-medium bg-lightblue px-5 py-1 rounded-full hover:dark:bg-white text-LightBackground hover:bg-darkblue transition-all"
      >
        {button}
      </button>
    </div>
  );
}

export default SeeMore;
