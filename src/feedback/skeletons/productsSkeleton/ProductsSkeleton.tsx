import ContentLoader from "react-content-loader";

function ProductsSkeleton() {
    const renderSkeletons = Array(5).fill(0).map((_, index) => (

        // we create an array with 5 ele to render the contentLaoder 5 times (the number of categories);
        <div key={index}>
            <ContentLoader
                speed={2}
                width={250}
                height={150}
                viewBox="0 0 250 150"
                backgroundColor="#b0b0b0"
                foregroundColor="#d1d1d1"
                >
                <circle cx="104" cy="150" r="250" />
                <rect x="61" y="179" rx="3" ry="3" width="85" height="6" />
            </ContentLoader>
        </div>
    ))
  return (
    <div className="flex flex-wrap justify-center gap-x-20 gap-y-10 ">
        {renderSkeletons}
    </div>
  )
}

export default ProductsSkeleton