import { useEffect } from "react"
import { getTokenData } from "../../Utils";


function Dashboard() {

    useEffect(() => {
        let token = getTokenData()
        console.log(token)
    }, []);
    return (
        <div>
            Admin Dashboard
        </div>
    )
}

export default Dashboard
