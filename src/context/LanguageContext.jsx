import { useContext, createContext, useEffect, useState} from "react";




const LanguageContext = createContext()

export const LanguageProvider = ({children}) =>{
     const [language, setLanguage] = useState(
        localStorage.getItem('language') || 'English');
    
         useEffect(() =>{
    localStorage.setItem('language', language)
  }, [language])

  return(
    <LanguageContext.Provider value={{language, setLanguage}}>{children}</LanguageContext.Provider>
  )
}
export const useLanguage = () =>{
    return useContext(LanguageContext)
}