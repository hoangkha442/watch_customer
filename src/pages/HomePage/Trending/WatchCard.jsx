
export const WatchCard = ({ title, subtitle, imageSrc, altText }) => {
    
    return (
        <div className="relative overflow-hidden roboto">
        <img src={imageSrc} alt={altText} className="w-[585px] h-[300px] object-cover hover:scale-110 z-10 transition duration-500 cursor-pointer" />
        <div className="z-0 absolute top-1/3 bottom-1/2 h-full left-0 right-0 bg-opacity-75 text-white p-4 text-start w-1/2">
          <p className="text-xl font-normal">{title}</p>
          <div style={{ maxWidth: 70, height: 1, backgroundColor: 'rgb(200, 153, 121)', marginTop: "10px", marginBottom: "10px"}} />
          <h2 className="text-4xl font-bold">{subtitle}</h2>
        </div>
      </div>
    );
  };