
export const WatchCard = ({ title, subtitle, imageSrc, altText,titleKOW, subtitleKOF, customeStyle, styleLine }) => {
    
    return (
        <div className="relative overflow-hidden roboto rounded">
        <img src={imageSrc} alt={altText} className={`object-cover hover:scale-110 z-10 transition duration-500 cursor-pointer rounded-sm ${customeStyle}`} />
        <div className="z-0 absolute top-1/3 bottom-1/2 h-full left-0 right-0 bg-opacity-75 text-white p-4 text-start w-1/2">
          <p className="text-3xl font-bold">{titleKOW}</p>
          <p className="text-xl font-normal">{title}</p>
          <div className={styleLine}/>
          <p className="text-lg font-normal">{subtitleKOF}</p>
          <h2 className="text-4xl font-bold">{subtitle}</h2>
        </div>
      </div>
    );
  };

  // 