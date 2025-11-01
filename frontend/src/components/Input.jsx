const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-[#A77262]" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 
                   bg-[#fefeff]/10 rounded-lg 
                   border border-[#ebd8d0]/30 
                   focus:border-[#d3ab9e] focus:ring-2 focus:ring-[#eac9c1]/50
                   text-[#D3AB9E] placeholder-[#D3AB9E]/60 
                   transition duration-200"
      />
    </div>
  );
};

export default Input;
