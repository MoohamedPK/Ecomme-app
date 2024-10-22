type TGridList<T> = {
    records: T[],
    renderItem: (record: T) => React.ReactNode;
}

type HasId = {
    id? : number;
};

const GridList = <T extends HasId> ({records, renderItem}: TGridList<T>) => {

    const categoriesList = records.length > 0 ? records.map(record => 

    <div key={record.id} className="">
        {renderItem(record)}
    </div>
    ) : "there is no category"

  return (
    <div className="flex flex-wrap justify-center gap-x-20 gap-y-10 ">{categoriesList}</div>
  )
}

export default GridList