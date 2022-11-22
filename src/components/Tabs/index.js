import { Link } from "react-router-dom";

export default function Tabs({ list = [], active, setActive, style }) {
    return <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700" style={{ borderBottom: "0.5px solid #848484", ...style }}>
        <ul class="flex flex-wrap -mb-px">
            {
                list.map((item) => {
                    const handleClick = () => setActive(item);

                    return active.id == item.id ? <li class="mr-2" onClick={handleClick}>
                        <Link to={`?tab=${item.id}`} class="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page" style={{ color: "var(--primary-color)", borderBottomColor: "var(--primary-color)" }}>{item.title}</Link>
                    </li> : <li class="mr-2" onClick={handleClick}>
                        <Link to={`?tab=${item.id}`} class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" style={{ color: "#848484" }}>{item.title}</Link>
                    </li>
                })
            }
        </ul>
    </div>
}