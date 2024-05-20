const ProductShowSkeleton = () => {
  return (
    <>
      <div className="h-[25rem] skeleton" />

      <div className="my-12 main-container lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="skeleton h-6 mb-12 lg:col-span-12" />

        <div className="lg:col-span-4">
          <div className="skeleton h-80 rounded-2xl mb-6" />
          <div className="skeleton h-8 rounded-full" />
        </div>

        <div className="lg:col-span-8">
          <div className="skeleton h-6 mb-12" />

          <div className="skeleton h-12 mb-4" />
          <div className="skeleton h-12 mb-4" />
          <div className="skeleton h-12 mb-4" />
          <div className="skeleton h-12 mb-4" />
        </div>
      </div>
    </>
  );
};

export default ProductShowSkeleton;
