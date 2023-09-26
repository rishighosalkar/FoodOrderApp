 import { useState } from "react";
import classes from './Collapse.module.css';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

 const Collapse = ({ heading, children}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const onCollapseHandler = (e) =>
    {
        e.preventDefault();
        setIsCollapsed(!isCollapsed)
    }
    return (
        <>
            <button
                className={classes.collapseButton}
                onClick={onCollapseHandler}
            >
               {heading} {isCollapsed ? <AiOutlinePlus/> : <AiOutlineMinus />}
            </button>
            <div
                // className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
                className = {isCollapsed ? classes.collapseContentCollapsed : classes.collapseContentExpanded}
                aria-expanded={isCollapsed}
            >
                {children}
            </div>
        </>
    )
 }

 export default Collapse;