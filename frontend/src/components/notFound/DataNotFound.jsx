
function DataNotFound({children,Icon}) {
  return (
    <div className="min-h-80 flex items-center justify-center w-full">
        <div className="flex items-center justify-center flex-col gap-2">
            <Icon strokeWidth={.5} size={100} className="text-(--color-text)"/>
            <p className="text-(--color-text)">{children}</p>
        </div>            
    </div>
  )
}

export default DataNotFound