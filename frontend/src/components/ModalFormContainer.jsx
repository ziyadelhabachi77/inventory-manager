

function ModaFormContainer({children}) {
  return (
    <div className='min-h-screen items-center overflow-y-auto custom-scroll fixed z-999 backdrop-blur-md bg-gray-900/60 flex pt-30 justify-center inset-0'>
        {children}
    </div>
  )
}

export default ModaFormContainer