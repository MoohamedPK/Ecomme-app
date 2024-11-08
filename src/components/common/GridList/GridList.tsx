import LottiHandler from "../../../feedback/LottiHandler/LottiHandler";

type TGridList<T> = {
    records: T[],
    renderItem: (record: T) => React.ReactNode,
    message: string,
}

type HasId = {
    id? : number;
};

const GridList = <T extends HasId> ({records, renderItem, message}: TGridList<T>) => {

    const categoriesList = records.length > 0 ? records.map(record => 

    <div key={record.id} className="">
        {renderItem(record)}
    </div>
    ) : <LottiHandler type="loadingProds" message={message}/>

  return (
    <div className="flex flex-wrap flex-1 justify-center mx-auto gap-x-20 gap-y-10 ">{categoriesList}</div>
  )
}

export default GridList