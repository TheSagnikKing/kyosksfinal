import React from 'react'
import style from "./Loader.module.css"

const Loader = () => {
    return (
        <div className={style.loader}>
            <div className={style.loading_text}>
                Loading<span className={style.dot}>.</span><span className={style.dot}>.</span><span className={style.dot}>.</span>
            </div>
            <div className={style.loading_bar_background}>
                <div className={style.loading_bar}>
                    <div className={style.white_bars_container}>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                        <div className={style.white_bar}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader