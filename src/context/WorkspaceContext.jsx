import { createContext, useContext, useState, useEffect } from "react";

const WorkspaceContext = createContext()

export const WorkspaceProvider = ({children}) => {
    const [workspace, setWorkspace] = useState(null)
    const [loading, setLoading] = useState(true)

    const currentUserId = '5mkx4CsrG5E'

    useEffect (() => {
        const fetchWorkspace = async () => {
            try{
                const response = await fetch(`http://localhost:3000/workspaces?ownerId=${currentUserId}`);

                const data = await response.json()
                if(data.length > 0) {
                    setWorkspace(data[0])
                }
            }
               catch(error){
                console.error('Failed to fetch workspace:', error)
               } finally{
                setLoading(false)
               }
            }
        fetchWorkspace()
    }, []);

    const workspaceName = workspace?.name || '';

    const setWorkspaceName = (name) =>{
        setWorkspace((prev) => ({
            ...prev, name,
        }))
    }
    const saveWorkspace = async () =>{
        if(!workspace) return;

        try{
            const response = await fetch(
                `http://localhost:3000/workspace/${workspace.id}`, 
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        name: workspace.name,
                    }),

                }
            );
            if(!response.ok){
                throw new Error('Failed to save workspace')
            }
            const updatedWorkspace = await response.json();
            setWorkspace(updatedWorkspace);
            console.log('Workspace saved successfully')
        } catch(error){
            console.error('Failed to save workspace:', error)
        }
    }

    return (
        <WorkspaceContext.Provider 
        value ={{
            workspace,
            workspaceName,
            setWorkspaceName,
            saveWorkspace,
            loading,

        }}>{children}
        </WorkspaceContext.Provider>
    )
}

export const useWorkspace = () => {
    return useContext(WorkspaceContext)
}